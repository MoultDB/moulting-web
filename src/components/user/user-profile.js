import React, {useState} from 'react';
import {Link} from "react-router-dom";
import AuthService from "../../services/auth.service";
import './user-profile.css';
import {CaretRightFill, ChevronRight, StarFill} from 'react-bootstrap-icons';
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
import NotLogIn from "./not-log-in";

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

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: null
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser })
    }

    render() {
        const { currentUser } = this.state;

        return <main>
            <div className="species">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>User Profile</h1>
                        </div>
                    </div>
                </div>
            </div>
            {(this.state.currentUser) ?
                <div className="page-single bg-custom-dark">
                    <div className="container ">
                        <p><strong>E-mail:</strong>{" "}{currentUser.email} </p>
                        <p><strong>Name:</strong>{" "}{currentUser.name} </p>
                        <p><strong>ORCID iD:</strong>{" "}{currentUser.orcidId} </p>
                        <p><strong>Token:</strong>{" "}{currentUser.token}</p>

                        <div className="row ipad-width">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="topbar-filter">
                                    <p>Found <span>{items.length} pictures</span> in total</p>
                                </div>
                                <div className="flex-wrap-photolist">
                                    <PaginatedItems itemsPerPage={10}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <NotLogIn />
            }
        </main>;
    }
}

