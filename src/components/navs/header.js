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
                                     height="200"/>
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#moultingNav" aria-controls="moultingNav" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="moultingNavNav">
                                <ul className="navbar-nav navbar-end">
                                    
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>

                                <li className="nav-item">
                                    <a href="https://moultdb.org" className="nav-link" target="_blank" rel="noopener noreferrer">
                                        MoultDB
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <Link to="/tutorial" className="nav-link dropdown-item">
                                        Tutorial
                                    </Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link role="button" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        About us
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to="https://moultdb.org/about" className="dropdown-item">The MoultDB project</Link></li>
                                        <li><Link to="/about/privacy-notice" className="dropdown-item">moulting.org privacy notice</Link></li>
                                        <li><a href="https://github.com/MoultDB/" className="dropdown-item" target="_blank" rel="noopener noreferrer">
                                            Source code
                                        </a></li>
                                    </ul>
                                </li>

                                </ul>

                            </div>
                        </div>
                    </nav>
                      {/* <div className="top-search">
                        <select>
                            <option value="saab">ALL</option>
                            <option value="united">FOSSILS</option>
                        </select>
                        <input type="text"
                               placeholder="Search for a keyword, a genus or a species that you are looking for"/>
                        </div> */}

                </div>
            </header>
        );
    }
}