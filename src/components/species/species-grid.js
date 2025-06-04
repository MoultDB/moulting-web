import React from 'react';
import "./species-grid.css";
import SpeciesItem from './species-item';
import Loader from '../common/loader';

const SpeciesGrid = ({ images, loading }) => {
    if (loading) {
        return (
            <div className="loader-wrapper">
                <Loader />
            </div>
        );
    }

    return (
        <>
            {images.length > 0 ? (
                <div className="flex-wrap-specieslist">
                    {images.map((image, index) => (
                        <SpeciesItem key={index} image={image} />
                    ))}
                </div>
            ) : (
                <div className="no-results-wrapper">
                    <p className="no-results-message">
                        No observations match the selected filters.
                    </p>
                </div>
            )}
        </>
    );

};



export default SpeciesGrid;
