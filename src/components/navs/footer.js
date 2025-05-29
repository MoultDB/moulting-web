import React from "react";
import Obfuscate from 'react-obfuscate';
import { Link } from "react-router-dom";
import { Facebook, TwitterX, Instagram, Mastodon, Github } from 'react-bootstrap-icons';
import './footer.css';

export default function Footer() {
    return (
        <footer className="ht-footer">
            <div className="footer-socials">
                <a href="https://www.facebook.com/groups/402623715250579" className="social-links" rel="noopener noreferrer" target="_blank"><Facebook/></a>
                <a href="https://twitter.com/moultdb" className="social-links" rel="noopener noreferrer" target="_blank"><TwitterX/></a>
                <a href="https://www.instagram.com/moultdb/" className="social-links" rel="noopener noreferrer" target="_blank"><Instagram/></a>
                <a href="https://ecoevo.social/@moultdb" className="social-links" rel="noopener noreferrer" target="_blank"><Mastodon/></a>
                <a href="https://github.com/MoultDB" className="social-links" rel="noopener noreferrer" target="_blank"><Github/></a>
            </div>
            
            <div className="footer-nav">
                <Link to="/">Home</Link>
                <Link to="https://moultdb.org/about">About</Link>
                <Link to="https://github.com/MoultDB">Source</Link>
                <Obfuscate email={process.env.REACT_APP_CONTACT_EMAIL}
                           headers={{subject: '[moulting.org] Contact'}}>Contact</Obfuscate>
            </div>

            <div className="footer-legal">
                <p>&copy; 2025 moulting.org - All image rights are reserved by their respective owners.</p>
                <p>
                    Images are sourced from <a href="https://www.inaturalist.org/" target="_blank" rel="noopener noreferrer">
                    iNaturalist</a> and are licensed under <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer">
                    CC BY-NC 4.0</a> or more permissive.
                </p>
            </div>
        </footer>
    );
}
