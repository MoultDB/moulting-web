import React from 'react';
import "./pagination.css";

const Pagination = ({ observationsPerPage, totalObservations, paginate, currentPage, handleObservationsPerPageChange }) => {
    
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalObservations / observationsPerPage);

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
            <label>Observations per page:</label>
            <select value={observationsPerPage} onChange={(e) => handleObservationsPerPageChange(parseInt(e.target.value))}>
                <option value="20">20 observations</option>
                <option value="40">40 observations</option>
                <option value="60">60 observations</option>
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
