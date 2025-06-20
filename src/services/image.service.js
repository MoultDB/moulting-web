import axios from 'axios';

const PROJECT_ACC = "moulting-arthropods";
const PROJECT_ID = 200497;
export const INAT_PROJECT_URL = "https://www.inaturalist.org/projects/" + PROJECT_ACC;
const VALID_LICENSES = ['cc0', 'cc-by', 'cc-by-nc'];
const BLOCKED_IMAGE_URL = 'https://static.inaturalist.org';

const lifeStageMap = {
  2: "Adult",
  3: "Teneral",
  4: "Pupa",
  5: "Nymph",
  6: "Larva",
  7: "Egg",
  8: "Juvenile",
  16: "Subimago"
};

async function fetchAllResults(params) {
  let allResults = [];
  let page = 1;
  let totalResults = 0;

  do {
    params.page = page;
    try {
      const response = await axios.get(`${process.env.REACT_APP_INAT_API_URL}/observations`, { params });
      if (response?.data?.results) {
        allResults.push(...response.data.results);
      }
      totalResults = response.data.total_results;
      page++;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  } while ((page - 1) * params.per_page < totalResults);

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
    const params = { id: obsId };
    return await this.fetchImagesFromInaturalist(params);
  }

  async fetchImagesFromInaturalist(params) {
    try {
      const results = await fetchAllResults(params);

      return results.map(result => {
        const validPhotos = result.photos.filter(photo =>
          VALID_LICENSES.includes(photo.license_code) &&
          !photo.url.startsWith(BLOCKED_IMAGE_URL)
        );
        if (validPhotos.length === 0) return null;

        const [latitude, longitude] = (result.location || '').split(',').map(parseFloat);
        const categories = {};

        if (result.ofvs) {
          result.ofvs.forEach(f => {
            if (f.name_ci && f.value_ci) {
              categories[f.name_ci] = f.value_ci;
            }
          });
        }

        const annotation = result.annotations?.find(a => a.controlled_attribute_id === 1);
        if (annotation && lifeStageMap[annotation.controlled_value_id]) {
          categories["Life Stage"] = lifeStageMap[annotation.controlled_value_id];
        }

        if (!categories["Life Stage"]) {
          const custom = result.ofvs?.find(f =>
            f.name_ci === "developmental stage (arthropods)" && f.value_ci
          );
          if (custom) categories["Life Stage"] = custom.value_ci;
        }

        return {
          inatId: result.id,
          taxonId: result.taxon?.id || 0,
          taxonName: result.taxon?.name || 'Unknown Taxon',
          firstImageUrl: validPhotos[0].url.replace('square', 'small'),
          allImageUrls: validPhotos.map(p => p.url.replace('square', 'medium')),
          allThumbImageUrls: validPhotos.map(p => p.url.replace('square', 'thumb')),
          login: result.user?.login || 'Unknown User',
          latitude: !isNaN(latitude) ? latitude : null,
          longitude: !isNaN(longitude) ? longitude : null,
          description: result.description || 'No description available',
          categories,
          uri: result.uri || null,
          inProject: result.project_ids?.includes(PROJECT_ID),
          observed_on: result.observed_on || null
        };
      }).filter(Boolean);
    } catch (error) {
      console.error('Error processing results:', error);
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
