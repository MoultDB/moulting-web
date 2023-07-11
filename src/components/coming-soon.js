import React from 'react'
import {Link} from "react-router-dom";
import SocialLinks from "./common/social-links";

export default function ComingSoon() {
    return <main>
        <div className="container">
            <div className="row">
                <div className={"col-sm-10 offset-sm-1 text-center"}>
                    <h1> Coming soon! </h1>
                    <p>Sorry, but the page you were trying to view does not exist.</p>
                    <p>Our website is under construction, follow us for update now!</p>
                    <p><strong>You can follow our latest news on our <Link to="/news">news page</Link> or on various social media:
                        <div className={"social-link mt-2"}><SocialLinks /></div></strong></p>
                </div>
            </div>
        </div>
    </main>;
}