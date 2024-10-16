import React from "react";
import Obfuscate from 'react-obfuscate';
import { Link } from "react-router-dom";
import { Facebook, TwitterX, Instagram, Mastodon, Github } from 'react-bootstrap-icons'; // Import icons
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
                <Link to="/about/moulting">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/team">Team</Link>
                <Link to="/contact">Contact</Link>
            </div>

            <div className="footer-legal">
                <p>©2024 moulting.org | All image rights are reserved by their respective owners</p>
            </div>
        </footer>
    );
}
