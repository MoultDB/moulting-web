import React from 'react';
import "./SpeciesItem.css"

const SpeciesItem = ({ image, onClick }) => {
    return (
        <div className="species-item-style-2 species-item-style-1" onClick={onClick}>
            <img src={image.firstImageUrl} alt={image.taxonName} />
            <div className="mv-item-infor">
                <h6>{image.taxonName}</h6>
                <p>{image.login}</p> 
            </div>
        </div>
    );
};

export default SpeciesItem;
