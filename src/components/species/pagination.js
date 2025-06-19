import React from 'react';
import "./pagination.css";

const Pagination = ({ speciesPerPage, totalSpecies, paginate, currentPage, handleSpeciesPerPageChange }) => {
    
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalSpecies / speciesPerPage);

    // Generates the paginated sequence with ellipses
    const getPageRange = (totalPages, currentPage, delta = 2) => {
        const range = [];
        const rangeWithDots = [];
        let lastPage;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (lastPage) {
                if (i - lastPage === 2) {
                    rangeWithDots.push(lastPage + 1);
                } else if (i - lastPage > 2) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            lastPage = i;
        }

        return rangeWithDots;
    };

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
                {getPageRange(totalPages, currentPage).map((item, index) => (
                    typeof item === "number" ? (
                        <a
                            key={index}
                            onClick={() => paginate(item)}
                            href="#"
                            className={item === currentPage ? 'active' : ''}
                        >
                            {item}
                        </a>
                    ) : (
                        <span key={index} className="pagination-ellipsis">...</span>
                    )
                ))}
            </div>
        </div>
    );
};

export default Pagination;
