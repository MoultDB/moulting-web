import React from 'react';
import "./top-bar-filter.css";

const TopBarFilter = ({ totalObservations, handleSortChange }) => {
    return (
        <div className="topbar-filter">
            <p>Found <span>{totalObservations}</span> observations</p>
            {handleSortChange && (
                <>
                    <label>Sort by:</label>
                    <select onChange={(e) => handleSortChange(e.target.value)}>
                        <option value="desc">Release date: Newest first</option>
                        <option value="asc">Release date: Oldest first</option>
                    </select>
                </>
            )}
            <a href="#" className="list">
                <i className="ion-ios-list-outline"></i>
            </a>
            <a href="#" className="grid">
                <i className="ion-grid active"></i>
            </a>
        </div>
    );
};

export default TopBarFilter;
