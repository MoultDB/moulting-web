import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaxonItem = ({ src, taxonName, path }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Naviga verso il percorso dinamico
        console.log(`Clicked on taxon: ${taxonName}`);
        navigate(`/species/${path}`);
    };

    return (
        <div className="photo-item" onClick={handleClick}>
            <div className="ph-img">
                <img src={src} alt={taxonName} />
            </div>
            <div className="title-in">
                <h6>{taxonName}</h6>
            </div>
        </div>
    );
};

export default TaxonItem;
