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
                            <li><Link to="/about/moulting">About MoultDB</Link></li>
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/help">Help</Link></li>
                        </ul>
                    </div>
                    <div className="flex-child-ft item3">
                        <h4>Legal</h4>
                        <ul>
                            <li><Link to="/about/privacy-notice">Privacy Policy</Link></li>
                            <li>
                                <Obfuscate email={process.env.REACT_APP_CONTACT_EMAIL}
                                           headers={{subject: '[moulting] '}}>
                                    Contact us
                                </Obfuscate>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-child-ft item4">
                        <h4>Account</h4>
                        <ul>
                            <li><Link to="/user/profile">My Account</Link></li>
                        </ul>
                    </div>
                    {/*<div className="flex-child-ft item5">*/}
                    {/*    <h4>Newsletter</h4>*/}
                    {/*    <p>Subscribe to our newsletter system now <br /> to get latest news from us.</p>*/}
                    {/*    <form action="#">*/}
                    {/*        <input type="text" placeholder="Enter your email..." />*/}
                    {/*    </form>*/}
                    {/*    <Link to="/user/registration" className="btn">Subscribe now <ChevronRight /></Link>*/}
                    {/*</div>*/}
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