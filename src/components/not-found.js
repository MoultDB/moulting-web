import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './not-found.css';
import notFoundImg from '../assets/images/uploads/not-found/not-found.png';


const SpeciesNotFound = () => {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search).get("query");

    return (
        <div className="not-found-wrapper">
            <div className="not-found-content">
                <img
                    src={notFoundImg}
                    alt="Species not found"
                    className="not-found-image"
                />
                {queryParam && (
                    <p>No results found for <strong>"{queryParam}"</strong>.</p>
                )}
                <p>Try a different name or return to the homepage.</p>
                <Link to="/" className="not-found-home-link">← Back to Home</Link>
            </div>
        </div>
    );
};

export default SpeciesNotFound;
