import React from 'react';
import "./pagination.css"

const Pagination = ({ speciesPerPage, totalSpecies, paginate, currentPage, handleSpeciesPerPageChange }) => {
    const pageNumbers = [];

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalSpecies / speciesPerPage);

    // Create page numbers for each page
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="topbar-filter">
            <label>Species per page:</label>
            <select value={speciesPerPage} onChange={(e) => handleSpeciesPerPageChange(parseInt(e.target.value))}>
                <option value="20">20 Species</option>
                <option value="40">40 Species</option>
                <option value="60">60 Species</option>
            </select>

            <div className="pagination2">
                <span>Page {currentPage} of {totalPages}:</span>
                {pageNumbers.map(number => (
                    <a
                        key={number}
                        onClick={() => paginate(number)}
                        href="#"
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
