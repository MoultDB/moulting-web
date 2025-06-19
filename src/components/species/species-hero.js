import React from 'react';
import "./species-hero.css"

const SpeciesHero = ({ speciesName }) => {
    return (
        <div className="species-hero">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>{speciesName || "Species"}</h1>
                        <ul className="breadcumb">
                            <li className="active"><a href="/">Home</a></li>
                            <li> <span className="ion-ios-arrow-right"></span> {speciesName || "Species"}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default SpeciesHero;
