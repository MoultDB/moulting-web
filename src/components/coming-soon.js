import React from 'react'
import News from "./news/news";

export default function ComingSoon() {
    return <div className="slider">
        <div className="container">
            <div className="row">
                <div className="description">
                    <h1> Coming soon! </h1>
                    <div className="col-sm-10 col-sm-offset-1">
                        <p>Sorry, but the page you were trying to view does not exist.</p>
                        <p>Our website is under construction, follow us for update now!</p>
                        <News />
                    </div>
                </div>
            </div>
        </div>
    </div>;
}