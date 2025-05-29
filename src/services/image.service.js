import axios from 'axios';

const API_URL = 'https://api.inaturalist.org/v1/observations';
const PROJECT_ACC = "moulting-arthropods";
const PROJECT_ID = 200497;
export const PROJECT_URL = "https://www.inaturalist.org/projects/" + PROJECT_ACC;
const VALID_LICENSES = ['cc0', 'cc-by', 'cc-by-nc'];
const BLOCKED_IMAGE_URL = 'https://static.inaturalist.org';

async function fetchAllResults(params) {
    let allResults = [];
    let page = 1;
    let totalResults = 0;

    do {
        // Update query parameters with current page number
        params.page = page;

        try {
            const response = await axios.get(API_URL, { params });

            // Check that the results are present in the answer
            if (response?.data?.results) {
                allResults.push(...response.data.results);
            }

            totalResults = response.data.total_results;
            page++;
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    } while ((page - 1) * params.per_page < totalResults); // Continue until all results have been retrieved

    return allResults;
}

class ImageService {
    
    async fetchProjectImagesForTaxon(taxonId) {
        const params = {
            project_id: PROJECT_ACC,
            taxon_id: taxonId,
            per_page: 200,
            order: 'desc',
            order_by: 'created_at',
            license: 'cc0,cc-by,cc-by-nc',
            photo_license: 'cc0,cc-by,cc-by-nc'
        };
        return await this.fetchImagesFromInaturalist(params);
    }

    async fetchImagesForObservation(obsId) {
        const params = {
            id: obsId
        };
        return await this.fetchImagesFromInaturalist(params);
    }

    async fetchImagesFromInaturalist(params) {
        // FIXME do loop to get all images if results.length > total_results

        try {
            const results = await fetchAllResults(params);

            return results?.map(result => {
                const validPhotos = result.photos.filter(photo => 
                    VALID_LICENSES.includes(photo.license_code) &&
                    !photo.url.startsWith(BLOCKED_IMAGE_URL)
                );
                
                if (validPhotos.length === 0) return null;

                const locationString = result.location || '';
                const [latitude, longitude] = locationString.split(',').map(coord => parseFloat(coord));

                const categories = {};
                if (result.ofvs) {
                    result.ofvs.forEach(field => {
                        if (field.name_ci && field.value_ci) {
                            categories[field.name_ci] = field.value_ci;
                        }
                    });
                }

                return {
                    inatId: result.id,
                    taxonId: result.taxon?.id || 0,
                    taxonName: result.taxon?.name || 'Unknown Taxon',
                    firstImageUrl: validPhotos.length > 0 ? validPhotos[0].url.replace('square', 'small') : null,
                    allImageUrls: validPhotos.map(photo => photo.url.replace('square', 'medium')),
                    allThumbImageUrls: validPhotos.map(photo => photo.url.replace('square', 'thumb')),
                    login: result.user?.login || 'Unknown User',
                    latitude: !isNaN(latitude) ? latitude : null,
                    longitude: !isNaN(longitude) ? longitude : null,
                    description: result.description || 'No description available',
                    categories, 
                    uri: result.uri || null,
                    inProject: result.project_ids?.includes(PROJECT_ID)
                };
            }).filter(observation => observation !== null);
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    }

    async fetchTopContributors() {
        const params = {
            project_id: PROJECT_ACC,
            per_page: 200,
            order: 'desc',
            order_by: 'created_at',
            license: 'cc0,cc-by,cc-by-nc',
            photo_license: 'cc0,cc-by,cc-by-nc'
        };

        try {
            const results = await fetchAllResults(params);

            const contributorMap = {};

            results.forEach(observation => {
                const user = observation.user;
                if (!contributorMap[user.login]) {
                    contributorMap[user.login] = {
                        iconUrl: user.icon_url || 'https://placehold.co/70',
                        observationCount: 1
                    };
                } else {
                    contributorMap[user.login].observationCount += 1;
                }
            });

            return Object.entries(contributorMap)
                .map(([login, data]) => ({ login, ...data }))
                .sort((a, b) => b.observationCount - a.observationCount)
                .slice(0, 5);
        } catch (error) {
            console.error('Error fetching top contributors:', error);
            throw error;
        }
    }
}

const imageService = new ImageService();
export default imageService;
