import React from "react";
import {Link} from "react-router-dom";
import './header.css';
import Logo from "../../assets/images/moultdb-logo.png";
import AuthService from "../../services/auth.service";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = { currentUser: undefined };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({ currentUser: user });
        }
    }

    logOut() {
        AuthService.logout();
        this.setState({ currentUser: undefined });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <header>
                <div className={"container"}>
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container-fluid">
                            <Link to="/" className="navbar-brand">
                                <img src={Logo} className="d-inline-block align-top" alt="MoultDB logo" width="300"
                                     height="150"/>
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#moultingNav" aria-controls="moultingNav" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="moultingNavNav">
                                <ul className="navbar-nav navbar-end">
                                    <li className="nav-item">
                                        <a href={"https://www.inaturalist.org/projects/moulting-arthropoda"}
                                           className={"nav-link"} rel={"noopener noreferrer"} target={"_blank"}>Explore</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link role={"button"} className={"nav-link dropdown-toggle"}
                                              data-bs-toggle={"dropdown"} aria-expanded={"false"}>Contribute</Link>
                                        <ul className="dropdown-menu">
                                            <li><Link to={"/contribute/photo-upload"} className={"dropdown-item"}>Photo upload</Link></li>
                                            <li><a href="http://131.175.120.138:61111/GeMI/" className={"dropdown-item"}
                                                   rel={"noopener noreferrer"} target={"_blank"}>
                                                Machine Learning for citizen science</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link role={"button"} className={"nav-link dropdown-toggle"}
                                              data-bs-toggle={"dropdown"} aria-expanded={"false"}>About us</Link>
                                        <ul className="dropdown-menu">
                                            <li><Link to={"/about"} className={"dropdown-item"}>The MoultDB</Link></li>
                                            <li><Link to={"/news"} className={"dropdown-item"}>MoultDB news</Link></li>
                                            {/*<li><Link to={"/about/publications"} className={"dropdown-item"}>MoultDB publication</Link></li>*/}
                                            {/*<li><Link to={"/about/blog"} className={"dropdown-item"}>MoultDB blog</Link></li>*/}
                                            <li><Link to={"/about/privacy-notice"} className={"dropdown-item"}>MoultDB privacy notice</Link></li>
                                            <li><a href="https://github.com/MoultDB/" className={"dropdown-item"}
                                                   rel={"noopener noreferrer"} target={"_blank"}>Source code</a></li>
                                        </ul>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </nav>
                    {/*<div className="top-search">*/}
                    {/*    <select>*/}
                    {/*        <option value="saab">ALL</option>*/}
                    {/*        <option value="united">SPECIES</option>*/}
                    {/*        <option value="saab">GENUS</option>*/}
                    {/*    </select>*/}
                    {/*    <input type="text"*/}
                    {/*           placeholder="Search for an hashtag, a genus or a species that you are looking for"/>*/}
                    {/*</div>*/}

                </div>
            </header>
        );
    }
}