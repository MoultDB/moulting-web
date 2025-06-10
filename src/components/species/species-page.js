import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpeciesHero from './species-hero';
import TopBarFilter from './top-bar-filter';
import SpeciesGrid from './species-grid';
import Sidebar from '../common/sidebar';
import Pagination from './pagination';
import './species-page.css';
import imageService from "../../services/image.service";
import taxonService from "../../services/taxon.service";

const SpeciesPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [speciesName, setSpeciesName] = useState("");
    const [speciesPerPage, setSpeciesPerPage] = useState(20);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterApplied, setFilterApplied] = useState(false);
    const [taxonLoaded, setTaxonLoaded] = useState(false);


    // Extract years for the year filter dropdowns
    const allYears = images
        .map(img => new Date(img.observed_on).getFullYear())
        .filter(y => !isNaN(y));
    const minYear = allYears.length > 0 ? Math.min(...allYears) : null;
    const maxYear = allYears.length > 0 ? Math.max(...allYears) : null;
    const { taxonId } = useParams();

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const results = await imageService.fetchProjectImagesForTaxon(params.taxonId);
                setImages(results);
                setFilteredImages([]);
            } catch (error) {
                console.error('Error fetching images:', error);
                setError('Failed to load images. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [params.taxonId]);


    useEffect(() => {
        const fetchTaxon = async () => {
            try {
                const taxon = await taxonService.getTaxonById(taxonId);

                if (!taxon || !taxon.id || !taxon.name || typeof taxon.name !== "string" || taxon.name.toLowerCase() === 'unknown') {
                    navigate("/species/not-found", { replace: true });
                    return;
                }

                setSpeciesName(taxon.name);
            } catch (err) {
                console.error("Failed to fetch taxon name", err);
                navigate("/species/not-found", { replace: true });
                return;
            } finally {
                setTaxonLoaded(true);
            }
        };

        fetchTaxon();
    }, [taxonId, navigate]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const stage = params.get('stage');
        const sex = params.get('sex');
        const yearFrom = params.get('yearFrom');
        const yearTo = params.get('yearTo');
        const lifeStage = params.get('lifeStage');

        if (stage || sex || yearFrom || yearTo || lifeStage) {
            handleSearch({ stage, sex, yearFrom, yearTo, lifeStage });
        }
    }, [images]);

    const handleSearch = (filters, updateUrl = false) => {
        const { stage, sex, yearFrom, yearTo, lifeStage } = filters;

        if (updateUrl) {
            const searchParams = new URLSearchParams();
            if (stage) searchParams.set("stage", stage);
            if (sex) searchParams.set("sex", sex);
            if (yearFrom) searchParams.set("yearFrom", yearFrom);
            if (yearTo) searchParams.set("yearTo", yearTo);
            if (lifeStage) searchParams.set("lifeStage", lifeStage);
            navigate(`/species/${params.taxonId}?${searchParams.toString()}`);
        }

        setFilterApplied(true);
        const filtered = images.filter(img => {
            const categories = img.categories || {};
            const stageValue = categories["Moulting Stage"]?.toLowerCase?.() || '';
            const sexValue = categories["Sex (if identifiable)"]?.toLowerCase?.() || '';
            const lifeStageValue =
                categories["Life Stage"]?.toLowerCase?.() ||
                categories["Developmental Stage (Arthropods)"]?.toLowerCase?.() || '';

            const date = img.observed_on;
            let pass = true;

            if (stage && !stageValue.includes(stage.toLowerCase())) pass = false;
            if (sex && !sexValue.includes(sex.toLowerCase())) pass = false;
            if (lifeStage && !lifeStageValue.includes(lifeStage.toLowerCase())) pass = false;

            if (yearFrom && date) {
                const y = new Date(date).getFullYear();
                if (y < parseInt(yearFrom)) pass = false;
            }

            if (yearTo && date) {
                const y = new Date(date).getFullYear();
                if (y > parseInt(yearTo)) pass = false;
            }

            return pass;
        });

        setFilteredImages(filtered);
        setCurrentPage(1);
    };


    const indexOfLastSpecies = currentPage * speciesPerPage;
    const indexOfFirstSpecies = indexOfLastSpecies - speciesPerPage;
    const activeList = filterApplied ? filteredImages : images;
    const currentImages = activeList.slice(indexOfFirstSpecies, indexOfLastSpecies);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSpeciesPerPageChange = (speciesPerPage) => {
        setSpeciesPerPage(speciesPerPage);
        setCurrentPage(1);
    };

    if (!taxonLoaded) {
        return null; 
    }

    const handleSortChange = (order) => {
        const listToSort = filteredImages.length > 0 ? [...filteredImages] : [...images];
        const sorted = listToSort.sort((a, b) => new Date(a.observed_on) - new Date(b.observed_on));
        if (order === 'desc') sorted.reverse();

        if (filteredImages.length > 0) {
            setFilteredImages(sorted);
        } else {
            setImages(sorted);
        }

        setCurrentPage(1);
    };

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="page-single">
                    <SpeciesHero speciesName={speciesName} />
                    <div className="container">
                        <div className="row ipad-width">
                            <div className="col-md-8 col-sm-12 col-xs-12">
                                <TopBarFilter
                                    totalSpecies={activeList.length}
                                    handleSortChange={handleSortChange}
                                />
                                {error && <p className="error">{error}</p>}
                                <SpeciesGrid
                                    images={currentImages}
                                    loading={loading}
                                />
                                <Pagination
                                    speciesPerPage={speciesPerPage}
                                    totalSpecies={activeList.length}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                    handleSpeciesPerPageChange={handleSpeciesPerPageChange}
                                />
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <Sidebar
                                    onSearch={(filters) => handleSearch(filters, true)}
                                    minYear={minYear}
                                    maxYear={maxYear}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeciesPage;
