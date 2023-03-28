import React from "react";
import Obfuscate from 'react-obfuscate';
import { ChevronRight, ArrowUp } from 'react-bootstrap-icons';
import {Link} from "react-router-dom";
import './footer.css';

export default function Footer() {
    return (
        <footer className="ht-footer">
            <div className="container">
                <div className="flex-parent-ft">
                    <div className="flex-child-ft item2">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/about/moulting">MoultDB</Link></li>
                            <li>
                                <Obfuscate email={process.env.REACT_APP_CONTACT_EMAIL}
                                           headers={{subject: '[moulting] '}}>
                                    Contact us
                                </Obfuscate>
                            </li>
                            <li><Link to="/about/forums#">Forums</Link></li>
                            <li><Link to="/about/blog">Blog</Link></li>
                            <li><Link to="/help">Help Center</Link></li>
                        </ul>
                    </div>
                    <div className="flex-child-ft item3">
                        <h4>Legal</h4>
                        <ul>
                            <li><Link to="/about/terms-of-use">Terms of Use</Link></li>
                            <li><Link to="/about/privacy-notice">Privacy Policy</Link></li>
                            <li><Link to="/about/security">Security</Link></li>
                        </ul>
                    </div>
                    <div className="flex-child-ft item4">
                        <h4>Account</h4>
                        <ul>
                            <li><Link to="/user/my-account">My Account</Link></li>
                            <li><Link to="/user/watchlist">Watchlist</Link></li>
                            <li><Link to="/user/collections">Collections</Link></li>
                            <li><Link to="/user/guide">User Guide</Link></li>
                        </ul>
                    </div>
                    <div className="flex-child-ft item5">
                        <h4>Newsletter</h4>
                        <p>Subscribe to our newsletter system now <br /> to get latest news from us.</p>
                        <form action="#">
                            <input type="text" placeholder="Enter your email..." />
                        </form>
                        <Link to="/user/registration" className="btn">Subscribe now <ChevronRight /></Link>
                    </div>
                </div>
            </div>
            <div className="ft-copyright">
                <div className="backtotop">
                    <p><Link to="/" id="back-to-top">Back to top <ArrowUp /></Link></p>
                </div>
            </div>

        </footer>
    );
}