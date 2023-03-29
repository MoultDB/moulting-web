import React from "react";
import { Link } from "react-router-dom";
import './header.css';
import Logo from "../../assets/images/moultdb-logo.png";

export default function Header() {
    return (
        <header>
            <div className={"container"}>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">
                            <img src={Logo} className="d-inline-block align-top" alt="MoultDB logo" width="300" height="150"/>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#moultingNav" aria-controls="moultingNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="moultingNavNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={"/"} className={"nav-link"} aria-current={"page"} >Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/explore"} className={"nav-link"} >Explore</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link to={"/contribute"}  role={"button"} className={"nav-link dropdown-toggle"}
                                          data-bs-toggle={"dropdown"} aria-expanded={"false"} >Contribute</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to={"/contribute/photo-upload"} className={"dropdown-item"} >Photo upload</Link></li>
                                        <li><Link to={"/contribute/video-upload"} className={"dropdown-item"} >Video upload</Link></li>
                                        <li><Link to={"/contribute/find-species"} className={"dropdown-item"} >Who's that species?</Link></li>
                                        <li><a href="http://131.175.120.138:61111/GeMI/" className={"dropdown-item"}
                                               rel={"noopener noreferrer"} target={"_blank"}>Machine Learning for citizen science</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link to={"/about"}  role={"button"} className={"nav-link dropdown-toggle"}
                                          data-bs-toggle={"dropdown"} aria-expanded={"false"} >About us</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to={"/about/moulting"} className={"dropdown-item"} >The MoultDB</Link></li>
                                        <li><Link to={"/about/publications"} className={"dropdown-item"} >MoultDB publication</Link></li>
                                        <li><Link to={"/about/blog"} className={"dropdown-item"} >MoultDB blog</Link></li>
                                        <li><Link to={"/about/privacy-notice"} className={"dropdown-item"} >MoultDB privacy notice</Link></li>
                                        <li><a href="https://github.com/MoultDB/" className={"dropdown-item"}
                                               rel={"noopener noreferrer"} target={"_blank"}>Source code</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link to={"/community"}  role={"button"} className={"nav-link dropdown-toggle"}
                                          data-bs-toggle={"dropdown"} aria-expanded={"false"} >Community</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to={"/community/user-grid"} className={"dropdown-item"} >User favorite grid</Link></li>
                                        <li><Link to={"/community/user-list"} className={"dropdown-item"} >User favorite list</Link></li>
                                        <li><Link to={"/community/user-profile"} className={"dropdown-item"} >User profile</Link></li>
                                        <li><Link to={"/community/user-rate"} className={"dropdown-item"} >User rate</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/help"} className={"nav-link"} aria-current={"page"} >Help</Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav navbar-end">
                                <li className="nav-item">
                                    <Link to={"/login"} className={"nav-link"} >Log in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/registration"} className={"nav-link signupLink"} >Sign up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="top-search">
                    <select>
                        <option value="saab">ALL</option>
                        <option value="united">SPECIES</option>
                        <option value="saab">GENUS</option>
                    </select>
                    <input type="text" placeholder="Search for an hashtag, a genus or a species that you are looking for" />
                </div>

            </div>
        </header>
    );
}