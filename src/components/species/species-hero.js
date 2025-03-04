import React from 'react';
import "./species-hero.css"

const SpeciesHero = () => {
    return (
        <div className="species-hero">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                            <h1>Species listing</h1>
                            <ul className="breadcumb">
                                <li className="active"><a href="/">Home</a></li>
                                <li> <span className="ion-ios-arrow-right"></span> Species listing</li>
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default SpeciesHero;
