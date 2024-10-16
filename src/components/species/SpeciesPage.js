import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeroSection from './HeroSection';
import TopBarFilter from './TopBarFilter';
import SpeciesGrid from './SpeciesGrid';
import Sidebar from '../common/sidebar';
import Pagination from './Pagination';
import './SpeciesPage.css';

const TAXON_ANCESTRY_IDS = {
    chelicerata: '245097',
    myriapoda: '144128',
    crustacea: '85493',
    hexapoda: '372739'
};

const SpeciesPage = () => {
    const { taxonName } = useParams();
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [speciesPerPage, setSpeciesPerPage] = useState(20); // Default is 20 species per page

    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('/fetch-images', {
                    params: { group: taxonName }
                });

                if (response.data) {
                    setImages(response.data);
                } else {
                    console.error('No images found for the selected taxon.');
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [taxonName]);

    // Calculate pagination indices
    const indexOfLastSpecies = currentPage * speciesPerPage;
    const indexOfFirstSpecies = indexOfLastSpecies - speciesPerPage;
    const currentImages = images.slice(indexOfFirstSpecies, indexOfLastSpecies);

    // Update current page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle the change in species per page
    const handleSpeciesPerPageChange = (SpeciesPerPage) => {
        setSpeciesPerPage(SpeciesPerPage);
        setCurrentPage(1); // Reset to page 1 after changing species per page
    };

    const handleImageClick = (image) => {
        navigate(`/species/${taxonName}/details`, { state: { image } });
    };

    return (
        <div className="page-single">
            <HeroSection />
            <div className="container">
                <div className="row ipad-width">
                    <div className="col-md-8 col-sm-12 col-xs-12">
                        <TopBarFilter totalSpecies={images.length} />
                        <SpeciesGrid images={currentImages} onImageClick={handleImageClick} />
                        <Pagination
                            speciesPerPage={speciesPerPage}
                            totalSpecies={images.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            handleSpeciesPerPageChange={handleSpeciesPerPageChange}  // Pass the handler here
                        />
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12">
                         {/* <Sidebar /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeciesPage;
