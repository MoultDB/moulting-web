import React from 'react';
import "./taxon-hero.css"

const TaxonHero = ({ taxonName }) => {
    return (
        <div className="taxon-hero">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>{taxonName || "Taxon"}</h1>
                        <ul className="breadcumb">
                            <li className="active"><a href="/">Home</a></li>
                            <li> <span className="ion-ios-arrow-right"></span> {taxonName || "Taxon"}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxonHero;
