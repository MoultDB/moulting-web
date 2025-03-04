import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageService from '../../services/image.service';
import SpeciesHero from './species-hero';
import TopBarFilter from './top-bar-filter';
import SpeciesGrid from './species-grid';
import Sidebar from '../common/sidebar';
import Pagination from './pagination';
import './species-page.css';

const SpeciesPage = () => {
    let params = useParams();
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [speciesPerPage, setSpeciesPerPage] = useState(20); // Default: 20 species per page
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true); 
            try {
                const results = await ImageService.fetchImagesForGroup(params.taxonId);
                setImages(results);
            } catch (error) {
                console.error('Error fetching images:', error);
                setError('Failed to load images. Please try again later.');
            } finally {
                setLoading(false); 
            }
        };
    
        fetchImages();
    }, [params.taxonId]);

    const indexOfLastSpecies = currentPage * speciesPerPage;
    const indexOfFirstSpecies = indexOfLastSpecies - speciesPerPage;
    const currentImages = images.slice(indexOfFirstSpecies, indexOfLastSpecies);

    // Update current page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    const handleSpeciesPerPageChange = (speciesPerPage) => {
        setSpeciesPerPage(speciesPerPage);
        setCurrentPage(1); 
    };
    
    return (
        <div className="page-single">
            <SpeciesHero />
            <div className="container">
                <div className="row ipad-width">
                    <div className="col-md-8 col-sm-12 col-xs-12">
                        <TopBarFilter totalSpecies={images.length} />
                        {error && <p className="error">{error}</p>}
                        <SpeciesGrid 
                            images={currentImages} 
                            loading={loading}
                        />
                        <Pagination
                            speciesPerPage={speciesPerPage}
                            totalSpecies={images.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            handleSpeciesPerPageChange={handleSpeciesPerPageChange}
                        />
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        {/*<Sidebar /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeciesPage;
