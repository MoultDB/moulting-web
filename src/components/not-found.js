import React from "react";
import ChangePageTitle from "../common/change-page-title";
import "./not-found.css"; 

export default function NotFound() {
  return (
    <main className="notfound-container">
      <ChangePageTitle pageTitle="Not found" />
      <div className="notfound-content">
        <img src={require("../assets/images/uploads/404/404.png")} alt="404 Not Found" className="notfound-image" />
        <p>Sorry, but the page you were trying to view does not exist.</p>
        <p>It looks like this was the result of either:</p>
        <ul>
          <li>a mistyped address</li>
          <li>an out-of-date link</li>
        </ul>
      </div>
    </main>
  );
}
