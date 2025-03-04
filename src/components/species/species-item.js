import React from 'react';
import {Link} from "react-router-dom";

import "./species-item.css"

const SpeciesItem = ({ image }) => {

    return (
        <div className="species-item-style-2 species-item-style-1">
            <Link to={{
                pathname: "/observation/" + image.inatId,
                state: { image: image }
            }}>
                <img src={image.firstImageUrl} alt={image.taxonName} />
                <div className="mv-item-infor">
                    <h6>{image.taxonName}</h6>
                    <p>{image.login}</p>
                </div>
            </Link>
        </div>
    );
};

export default SpeciesItem;
