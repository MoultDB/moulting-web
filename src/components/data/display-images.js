import React, {useState} from 'react';
import './display-images.css';
import {CaretRightFill, StarFill} from 'react-bootstrap-icons';
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <div className="paginated-item">
                        <a href="#">
                            <img src={item.url} alt={item.name} />
                            <div className="hvr-inner">Open <CaretRightFill /></div>
                            <div className="ph-item-infor">
                                <h6>{item.name}</h6>
                                {/*<p className="rate"><StarFill color={"#f5b50a"} size={16}/><span>45</span> likes</p>*/}
                            </div>
                        </a>
                    </div>
                ))}
        </>
    );
}

function PaginatedItems(props) {

    let {itemsPerPage, items} = props;
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems}/>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Previous"
                renderOnZeroPageCount={null}
                className={"custom-pagination"}
                pageLinkClassName={"pageLink"}
                activeLinkClassName={"activeLink"}
                previousLinkClassName={"previous"}
                nextLinkClassName={"next"}
                disabledLinkClassName={"disabledLink"}
            />
        </>
    );
}

export default function DisplayImages(props) {
    return <div className="row ipad-width">
        <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="topbar-filter">
                <p>Found <span>{props.currentUserData ? props.currentUserData.length : 0} pictures</span> in total</p>
            </div>
            {props.currentUserData ?
                <div className="flex-wrap-photolist">
                    <PaginatedItems itemsPerPage={10} items={props.currentUserData}/>
                </div>
                :
                <div>No data</div>
            }
        </div>
    </div>;
}
