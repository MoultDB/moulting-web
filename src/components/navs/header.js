import React, { useState } from "react";
import { Link } from "react-router-dom";
import './header.css';
import Logo from "../../assets/images/moultdb-logo.png";
import SocialLinks from "../common/social-links";
import taxonService from "../../services/taxon.service";
import axios from "axios";

export default function Header() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            try {
                const results = await taxonService.searchTaxaByName(value);
                setSuggestions(results);
            } catch (err) {
                console.error("Autocomplete error", err);
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
        } catch (err) {
            console.error("Fallback iNaturalist lookup failed:", err);
            return null;
        }
    };

    const redirectToSpecies = (inatId) => {
        if (inatId) {
            window.location.href = `/species/${inatId}`;
        } else {
            alert("No matching iNaturalist taxon ID found.");
        }
    };

    const handleSelectSuggestion = async (suggestion) => {
        const inatId = suggestion.dbXrefs?.find(
            (xref) => xref.dataSource?.shortName === "inaturalist"
        )?.accession;

        if (inatId) {
            redirectToSpecies(inatId);
        } else {
            const fallbackId = await fetchInatIdFromName(suggestion.scientificName);
            redirectToSpecies(fallbackId);
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && query.length > 1) {
            try {
                const results = await taxonService.searchTaxaByName(query);
                const first = results[0];

                let inatId = first?.dbXrefs?.find(
                    (xref) => xref.dataSource?.shortName === "inaturalist"
                )?.accession;

                if (!inatId) {
                    inatId = await fetchInatIdFromName(first?.scientificName);
                }

                redirectToSpecies(inatId);
            } catch (err) {
                console.error("Search error on Enter", err);
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
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#moultingNav" aria-controls="moultingNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="moultingNav">
                            <ul className="navbar-nav navbar-end">
                                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                                <li className="nav-item">
                                    <a href="https://moultdb.org" className="nav-link" target="_blank" rel="noopener noreferrer">
                                        MoultDB
                                    </a>
                                </li>
                                <li className="nav-item"><Link to="/tutorial" className="nav-link dropdown-item">Tutorial</Link></li>
                                <li className="nav-item dropdown">
                                    <Link role="button" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        About us
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><a href="https://moultdb.org/about" className="dropdown-item">The MoultDB project</a></li>
                                        <li><Link to="/about/privacy-notice" className="dropdown-item">moulting.org privacy notice</Link></li>
                                        <li><a href="https://github.com/MoultDB/" className="dropdown-item" target="_blank" rel="noopener noreferrer">Source code</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Search bar with autocomplete */}
                <div className="top-search" style={{ position: "relative" }}>
                    <select>
                        <option value="all">ALL</option>
                        {/* <option value="fossils">FOSSILS</option>*/}
                    </select>
                    <input
                        type="text"
                        placeholder="Search for a clade, a genus or a species that you are looking for"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    {suggestions.length > 0 && (
                        <ul className="autocomplete-list">
                            
                            {suggestions.slice(0, 20).map((s) => (
                                <li key={s.scientificName} onClick={() => handleSelectSuggestion(s)}>
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
