import React from 'react';
import "./top-bar-filter.css"

const TopBarFilter = ({ totalSpecies, handleSortChange }) => {
    return (
        <div className="topbar-filter">
            <p>Found <span>{totalSpecies} observations</span> in total</p> 
            <label>Sort by:</label>
            <select onChange={(e) => handleSortChange(e.target.value)}>
                <option value="desc">Release date Descending</option>
                /*<option value="asc">Release date Ascending</option>*/
            </select>
            <a href="#" className="list"><i className="ion-ios-list-outline "></i></a>
            <a href="#" className="grid"><i className="ion-grid active"></i></a>
        </div>
    );
};

export default TopBarFilter;
