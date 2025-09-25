import React from 'react';
import {Link} from "react-router-dom";

import "./observation-item.css"

const ObservationItem = ({ image }) => {

    return (
        <div className="observation-item observation-item-2">
            <Link to={{
                pathname: "/observations/" + image.inatId,
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

export default ObservationItem;
