import React from 'react';
import "./HeroSection.css"

const HeroSection = () => {
    return (
        <div className="hero common-hero">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="hero-ct">
                            <h1>Species listing</h1>
                            <ul className="breadcumb">
                                <li className="active"><a href="#">Home</a></li>
                                <li> <span className="ion-ios-arrow-right"></span> Species listing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
