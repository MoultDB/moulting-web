import React from 'react';
import "./SpeciesGrid.css";
import SpeciesItem from './SpeciesItem';
import Loader from '../common/Loader';

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
