const searchTaxaByName = async (text) => {
    try {
        // Production version with env variable:
        const url = process.env.REACT_APP_API_URL + `/search/inat_search?q=${encodeURIComponent(text)}`;

        // Local or temporary direct version:
        // const url = `https://moultdb.org/moultdb-api/search/inat_search?q=${encodeURIComponent(text)}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const json = await response.json();
        const results = json.data || [];

        const normalizedText = text.toLowerCase();

        const scored = results.map(obj => {
            const name = obj.scientificName.toLowerCase();
            const startsWith = name.startsWith(normalizedText) ? 0 : 1;
            const index = name.indexOf(normalizedText);
            const positionScore = index === -1 ? 100 : index;
            const lengthDiff = Math.abs(name.length - normalizedText.length);
            const score = startsWith * 100 + positionScore + lengthDiff;
            return { ...obj, score };
        });

        return scored.sort((a, b) => a.score - b.score).slice(0, 20);
    } catch (error) {
        console.error("Autocomplete fetch error:", error);
        throw error;
    }
};

const taxonService = {
    searchTaxaByName,
};

export default taxonService;
