import React, {useState} from "react";
import { Link } from "react-router-dom";
import './header.css';
import { mainMenuItems } from './main-menu-items.js';
import Logo from "../../assets/images/moultdb-logo.png";
import { CaretDownFill, CaretRightFill } from 'react-bootstrap-icons';

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
    const liClassName = "menu-items " ;
    return (
        <li className={liClassName} key={depthLevel}>
            {items.submenu ? (
                <>
                    <Link type="button" aria-haspopup="menu"
                       aria-expanded={dropdown ? "true" : "false"}
                       onClick={() => setDropdown((prev) => !prev)}
                       className={depthLevel === 0 ? "lv1" : ""}>
                        {items.title}{" "}
                        {depthLevel > 0 ? <CaretRightFill /> : <CaretDownFill />}
                    </Link>
                    {/*<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"*/}
                    {/*   aria-expanded="false">Dropdown <span className="caret"></span></a>*/}

                    <Dropdown mainUrl={items.url} submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} />
                </>
            ) : (
                <Link to={items.url} className={"lv" + (depthLevel + 1)}>{items.title}</Link>
            )}
        </li>
    );
};
const Dropdown = ({ submenus, dropdown, depthLevel }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "dropdown-menu";

    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
            {submenus.map((submenu, index) => (
                <MenuItems items={submenu} depthLevel={depthLevel} />
            ))}
        </ul>
    );
};

export default function Header() {
    return (
        <header>
            <div className={"container"}>
                <nav id="moulting-header" className="navbar navbar-default navbar-custom">
                    <div className="navbar-header logo">
                        <div className="navbar-toggle" data-toggle="collapse" data-target="#moulting-navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <div id="nav-icon1">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <Link to="/">
                            <img src={Logo} className="d-inline-block align-top" alt="MoultDB logo" width="300" height="150"/>
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse flex-parent" id="moulting-navbar-collapse">
                        <ul className="nav navbar-nav flex-child-menu menu-left">
                            {mainMenuItems.map((menu, index) => {
                                const depthLevel = 0;
                                return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
                            })}
                        </ul>
                        <ul className="nav navbar-nav flex-child-menu menu-right">
                            <li className="loginLink"><Link to="/login">Log in</Link></li>
                            <li className="btn signupLink"><Link to="/registration">Sign up</Link></li>
                        </ul>
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