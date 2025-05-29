import React from 'react';
import "./loader.css"; 

const Loader = () => {
    return (
        <div className="loader-wrapper"> 
            <div className="loader-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
            <p className="loading-text">Loading...</p> 
        </div>
    );
};

export default Loader;
