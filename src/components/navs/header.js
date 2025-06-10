// header.js
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import './header.css';
import Logo from "../../assets/images/moultdb-logo.png";
import SocialLinks from "../common/social-links";
import taxonService from "../../services/taxon.service";
import axios from "axios";

export default function Header() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        setActiveIndex(-1);
        if (value.length > 1) {
            try {
                const results = await taxonService.searchTaxaByName(value);
                setSuggestions(results);
            } catch {
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const fetchInatIdFromName = async (name) => {
        try {
            const response = await axios.get("https://api.inaturalist.org/v1/taxa", {
                params: { q: name }
            });
            return response.data.results[0]?.id || null;
        } catch {
            return null;
        }
    };

    const redirectToSpecies = (id) => {
        if (id) window.location.href = `/species/${id}`;
        else alert("No matching iNaturalist taxon ID found.");
    };

    const handleSelectSuggestion = async (s) => {
        const inatId = s.dbXrefs?.find(x => x.dataSource?.shortName === "inaturalist")?.accession;
        redirectToSpecies(inatId || await fetchInatIdFromName(s.scientificName));
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex(i => Math.min(i + 1, Math.min(suggestions.length, 20) - 1));
        } else if (e.key === 'ArrowUp') {
            setActiveIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && activeIndex < suggestions.length) {
                handleSelectSuggestion(suggestions[activeIndex]);
            } else if (query.length > 1) {
                const results = await taxonService.searchTaxaByName(query);
                const first = results[0];
                let inatId = first?.dbXrefs?.find(x => x.dataSource?.shortName === "inaturalist")?.accession;
                redirectToSpecies(inatId || await fetchInatIdFromName(first?.scientificName));
            }
        }
    };

    return (
        <header>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">
                            <img src={Logo} alt="MoultDB logo" width="300" height="200" />
                        </Link>
                        <button className="navbar-toggler" type="button" onClick={() => setIsMenuOpen(true)}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="moultingNav">
                            {isMenuOpen && (<button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>&times;</button>)}
                            <ul className="navbar-nav navbar-end">
                                <li className="nav-item"><Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                                <li className="nav-item"><a href="https://moultdb.org" className="nav-link" target="_blank" rel="noreferrer noopener">MoultDB</a></li>
                                <li className="nav-item"><Link to="/tutorial" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tutorial</Link></li>
                                <li className="nav-item dropdown">
                                    <span className="nav-link dropdown-toggle">About us</span>
                                    <ul className="dropdown-menu">
                                        <li><a href="https://moultdb.org/about" className="dropdown-item">The MoultDB project</a></li>
                                        <li><Link to="/about/privacy-notice" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Privacy notice</Link></li>
                                        <li><a href="https://github.com/MoultDB/" className="dropdown-item" target="_blank" rel="noreferrer noopener">Source code</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>


                    </div>
                </nav>

                <div className="top-search" style={{ position: "relative" }} ref={wrapperRef}>
                    <select><option value="all">ALL</option></select>
                    <input
                        type="text"
                        placeholder="Search for a clade, a genus or a species that you are looking for"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    {suggestions.length > 0 && (

                        <ul className="autocomplete-list" role="listbox">
                          {suggestions.slice(0, 20).map((s, index) => (
                            <li
                              key={s.scientificName}
                              onClick={() => handleSelectSuggestion(s)}
                              className={index === activeIndex ? "active-suggestion" : ""}
                              role="option"
                              aria-selected={index === activeIndex}
                              ref={el => {
                                if (index === activeIndex && el) {
                                  el.scrollIntoView({ block: 'nearest' });
                                }
                              }}
                            >
                              {s.scientificName}
                            </li>
                          ))}
                        </ul>

                    )}
                </div>

                <div className="social-link">
                    <p>Follow us:</p>
                    <SocialLinks />
                </div>
            </div>
        </header>
    );
}
