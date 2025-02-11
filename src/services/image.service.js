import axios from 'axios';

const API_URL = 'https://api.inaturalist.org/v1/observations';

class ImageService {

    async fetchImagesForGroup(group) {
        const TAXON_IDS = {
            chelicerata: '245097',
            myriapoda: '144128',
            crustacea: '85493',
            hexapoda: '372739'
        };

        const params = {
            project_id: 'moulting-arthropods',
            taxon_id: TAXON_IDS[group.toLowerCase()],
            per_page: 200,
            order: 'desc',
            order_by: 'created_at',
            license: 'cc0,cc-by,cc-by-nc',
            photo_license: 'cc0,cc-by,cc-by-nc'
        };

        try {
            const response = await axios.get(API_URL, { params });

            return response.data.results.map(result => {
                // Extract coordinates from the location string
                const locationString = result.location || '';
                const [latitude, longitude] = locationString.split(',').map(coord => parseFloat(coord));

                // Extract fixed categories (name_ci) and their values (value_ci)
                const categories = {};
                if (result.ofvs) {
                    result.ofvs.forEach(field => {
                        if (field.name_ci && field.value_ci) {
                            categories[field.name_ci] = field.value_ci;
                        }
                    });
                }

                return {
                    taxonName: result.taxon?.name || 'Unknown Taxon',
                    firstImageUrl: result.photos.length > 0 ? result.photos[0].url.replace('square', 'large') : null,
                    allImageUrls: result.photos.map(photo => photo.url.replace('square', 'large')),
                    login: result.user?.login || 'Unknown User',
                    latitude: !isNaN(latitude) ? latitude : null,
                    longitude: !isNaN(longitude) ? longitude : null,
                    description: result.description || 'No description available',
                    categories, // Object containing fixed categories with their respective values
                    uri: result.uri || null
                };
            });

        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    }

    async fetchTopContributors() {
        const params = {
            project_id: 'moulting-arthropods',
            per_page: 200,
            order: 'desc',
            order_by: 'created_at',
        };

        try {
            const response = await axios.get(API_URL, { params });
            const results = response.data.results;

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

export default new ImageService();
