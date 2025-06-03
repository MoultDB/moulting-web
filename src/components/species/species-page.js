import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpeciesHero from './species-hero';
import TopBarFilter from './top-bar-filter';
import SpeciesGrid from './species-grid';
import Sidebar from '../common/sidebar';
import Pagination from './pagination';
import './species-page.css';
import imageService from "../../services/image.service";

const SpeciesPage = () => {
    const params = useParams();
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [speciesPerPage, setSpeciesPerPage] = useState(20);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterApplied, setFilterApplied] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const results = await imageService.fetchProjectImagesForTaxon(params.taxonId);
                setImages(results);
                setFilteredImages([]);
            } catch (error) {
                setError('Failed to load images. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [params.taxonId]);

    const allYears = images
      .map(img => new Date(img.observed_on).getFullYear())
      .filter(y => !isNaN(y));
    const minYear = allYears.length > 0 ? Math.min(...allYears) : null;
    const maxYear = allYears.length > 0 ? Math.max(...allYears) : null;

    const handleSearch = (filters) => {
        const { stage, sex, yearFrom, yearTo } = filters;

    const filtered = images.filter(img => {
        const categories = img.categories || {};
        const stageValue = categories["Moulting Stage"]?.toLowerCase?.() || '';
        const sexValue = categories["Sex (if identifiable)"]?.toLowerCase?.() || '';
        const date = img.observed_on;
        let pass = true;

        if (stage && !stageValue.includes(stage.toLowerCase())) pass = false;
        if (sex && !sexValue.includes(sex.toLowerCase())) pass = false;

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
    const activeList = filteredImages.length > 0 ? filteredImages : images;
    const currentImages = activeList.slice(indexOfFirstSpecies, indexOfLastSpecies);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSpeciesPerPageChange = (speciesPerPage) => {
        setSpeciesPerPage(speciesPerPage);
        setCurrentPage(1);
    };


    const handleSortChange = (order) => {
    const listToSort = filteredImages.length > 0 ? [...filteredImages] : [...images];

    const sorted = listToSort.sort((a, b) => {
        const dateA = new Date(a.observed_on);
        const dateB = new Date(b.observed_on);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

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
                    <SpeciesHero />
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
                                <Sidebar onSearch={handleSearch} minYear={minYear} maxYear={maxYear} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeciesPage;
