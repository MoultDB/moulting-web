import React from 'react'
import News from "./news/news";

export default function ComingSoon() {
    return <main>
        <div className="container">
            <div className="row">
                <div className={"col-sm-10 offset-sm-1 text-center"}>
                    <h1> Coming soon! </h1>
                    <p>Sorry, but the page you were trying to view does not exist.</p>
                    <p>Our website is under construction, follow us for update now!</p>

                    <p><strong>You can follow our latest news on twitter!</strong></p>
                    <div className={"col-sm-6 offset-sm-3 "}>
                        <News  />
                    </div>
                </div>
            </div>
        </div>
    </main>;
}