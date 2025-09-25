import React from 'react';
import "./observation-grid.css";
import ObservationItem from './observation-item';
import Loader from '../common/loader';

const ObservationGrid = ({ images, loading }) => {
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
                <div className="flex-wrap-observation-list">
                    {images.map((image, index) => (
                        <ObservationItem key={index} image={image} />
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

export default ObservationGrid;
