import React from 'react'

export default function Notfound() {
    return <div className="slider">
        <div className="container">
            <div className="row">
                <div className="description">
                    <h1> 404 - Page not found </h1>
                    <div className="col-sm-10 col-sm-offset-1">
                        <p>Sorry, but the page you were trying to view does not exist.</p>
                        <p>It looks like this was the result of either:</p>
                        <ul>
                            <li>a mistyped address</li>
                            <li>an out-of-date link</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

