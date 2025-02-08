import React from 'react';
import "./SpeciesGrid.css";
import SpeciesItem from './SpeciesItem';

const SpeciesGrid = ({ images, onImageClick }) => {
    return (
        <div className="flex-wrap-specieslist">
            {images.map((image, index) => (
                <SpeciesItem 
                    key={index} 
                    image={image} 
                    onClick={() => onImageClick(image)}
                />
            ))}
        </div>
    );
};

export default SpeciesGrid;