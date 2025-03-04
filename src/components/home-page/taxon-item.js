import React from 'react';
import {Link} from "react-router-dom";

const TaxonItem = ({ src, taxonName, path, description }) => {

    return (
        <Link to={"/species/" + path} className="photo-item" >
            <div className="ph-img">
                <img src={src} alt={taxonName} />
            </div>
            <div className="title-in">
                <h6>{taxonName}</h6>
                <p className="author-description">{description}</p>
            </div>
        </Link>
    );
};

export default TaxonItem;
