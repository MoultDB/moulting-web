import React from 'react';
import "./species-grid.css";
import SpeciesItem from './species-item';
import Loader from '../common/loader';

const SpeciesGrid = ({ images, loading }) => {
    return (
        <div className="flex-wrap-specieslist">
            {loading ? (
                <Loader /> 
            ) : (
                images.length > 0 ? (
                    images.map((image, index) => (
                        <SpeciesItem 
                            key={index} 
                            image={image} 
                        />
                    ))
                ) : (
                    <p className="no-results">No images found.</p>
                )
            )}
        </div>
    );
};

export default SpeciesGrid;
