import React, { useState } from 'react';
import './user-grid.css';
import {CaretRightFill, StarFill, ChevronRight} from 'react-bootstrap-icons';
import ReactPaginate from 'react-paginate';
import moultinginsect1 from "../../assets/images/uploads/photo_carusel/moulting_insect/photo_1.jpg";
import moultinginsect2 from "../../assets/images/uploads/photo_carusel/moulting_insect/photo_2.jpg";
import moultinginsect3 from "../../assets/images/uploads/photo_carusel/moulting_insect/photo_3.jpg";
import moultinginsect4 from "../../assets/images/uploads/photo_carusel/moulting_insect/photo_4.jpg";
import moultinginsect5 from "../../assets/images/uploads/photo_carusel/moulting_insect/photo_5.jpg";
import tarantula1 from "../../assets/images/uploads/photo_carusel/tarantula_moulting/photo_1.jpg";
import tarantula2 from "../../assets/images/uploads/photo_carusel/tarantula_moulting/photo_2.jpg";
import tarantula3 from "../../assets/images/uploads/photo_carusel/tarantula_moulting/photo_3.jpg";
import tarantula4 from "../../assets/images/uploads/photo_carusel/tarantula_moulting/photo_4.jpg";

const items = [
    {src: moultinginsect1, title: "moulting insect 1"},
    {src: moultinginsect2, title: "moulting insect 2"},
    {src: moultinginsect3, title: "moulting insect 3"},
    {src: moultinginsect4, title: "moulting insect 4"},
    {src: moultinginsect5, title: "moulting insect 5"},
    {src: tarantula1, title: "tarantula 1"},
    {src: tarantula2, title: "tarantula 2"},
    {src: tarantula3, title: "tarantula 3"},
    {src: tarantula4, title: "tarantula 4"},
    {src: moultinginsect3, title: "moulting insect 3"},
    {src: moultinginsect4, title: "moulting insect 4"},
    {src: moultinginsect5, title: "moulting insect 5"},
    {src: tarantula1, title: "tarantula 1"}];

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <div className="paginated-item">
                        <a href="#">
                            <img src={item.src} alt={item.title} />
                            <div className="hvr-inner">Open <CaretRightFill /></div>
                            <div className="ph-item-infor">
                                <h6>{item.title}</h6>
                                <p className="rate"><StarFill color={"#f5b50a"} size={16}/><span>45</span> likes</p>
                            </div>
                        </a>
                    </div>
                ))}
        </>
    );
}

function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
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

export default function Usergrid() {
    return <main>
        <div className="species">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                            <h1>User Profile - grid</h1>
                            <ul className="breadcumb">
                                <li><a href="#">Home</a></li>
                                <span><ChevronRight color={"#abb7c4"} /></span>
                                <li>pictures listing</li>
                            </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="page-single bg-custom-dark">
            <div className="container ">
                <div className="row ipad-width">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="topbar-filter">
                            <p>Found <span>{items.length} pictures</span> in total</p>
                            {/*<label>Pictures per page:</label>*/}
                            {/*<select>*/}
                            {/*    <option value="range">20 Pictures</option>*/}
                            {/*    <option value="saab">10 Pictures</option>*/}
                            {/*</select>*/}
                            {/*<label>Sort by:</label>*/}
                            {/*<select>*/}
                            {/*    <option value="popularity">Popularity Descending</option>*/}
                            {/*    <option value="popularity">Popularity Ascending</option>*/}
                            {/*    <option value="rating">Most Commented</option>*/}
                            {/*    <option value="rating">Last Commented</option>*/}
                            {/*    <option value="date">Release date Descending</option>*/}
                            {/*    <option value="date">Release date Ascending</option>*/}
                            {/*</select>*/}
                        </div>
                        <div className="flex-wrap-photolist">
                            <PaginatedItems itemsPerPage={10} />
                        </div>
                    </div>
                    {/*<div className="col-md-4 col-sm-12 col-xs-12">*/}
                    {/*    <div className="sidebar">*/}
                    {/*        <div className="user-search-form">*/}
                    {/*            <h4 className="sb-title">Search for species</h4>*/}
                    {/*            <form className="form-user-search" action="#">*/}
                    {/*                <div className="row">*/}
                    {/*                    <div className="col-md-12 form-it">*/}
                    {/*                        <label>Species name</label>*/}
                    {/*                        <input type="text" placeholder="Enter keywords" />*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-md-12 form-it">*/}
                    {/*                        <label>Hashtag</label>*/}
                    {/*                        <div className="group-ip">*/}
                    {/*                            <select*/}
                    {/*                                name="skills" multiple="" className="ui fluid dropdown">*/}
                    {/*                                <option value="">Enter to filter genus</option>*/}
                    {/*                                <option value="Action1">Spider</option>*/}
                    {/*                                <option value="Action2">Warm</option>*/}
                    {/*                                <option value="Action3">Moulting</option>*/}
                    {/*                                <option value="Action4">Ecdysis</option>*/}
                    {/*                                <option value="Action5">Acquatic</option>*/}
                    {/*                            </select>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-md-12 form-it">*/}
                    {/*                        <label>Rating Range</label>*/}
                    {/*                        <select>*/}
                    {/*                            <option value="range">-- Select the rating range below --</option>*/}
                    {/*                            <option value="saab">-- Select the rating range below --</option>*/}
                    {/*                        </select>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-md-12 form-it">*/}
                    {/*                        <label>Release Year</label>*/}
                    {/*                        <div className="row">*/}
                    {/*                            <div className="col-md-6">*/}
                    {/*                                <select>*/}
                    {/*                                    <option value="range">From</option>*/}
                    {/*                                    <option value="number">10</option>*/}
                    {/*                                </select>*/}
                    {/*                            </div>*/}
                    {/*                            <div className="col-md-6">*/}
                    {/*                                <select>*/}
                    {/*                                    <option value="range">To</option>*/}
                    {/*                                    <option value="number">20</option>*/}
                    {/*                                </select>*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-md-12 ">*/}
                    {/*                        <input className="submit" type="submit" value="submit" />*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </form>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    </main>

;
}

