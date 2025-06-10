import React from "react";
import ChangePageTitle from "../common/change-page-title";
import "./404.css";
import notFoundImg from "../assets/images/uploads/404/404.png";

export default function NotFound() {
  return (
    <main className="notfound-container">
      <ChangePageTitle pageTitle="Not found" />
      <div className="notfound-content">
        <img
          src={notFoundImg}
          alt="404 Not Found"
          className="notfound-image"
        />
        <p className="notfound-text">The page you were trying to reach does not exist.</p>
        <p className="notfound-text">This could be due to:</p>
        <ul className="notfound-list">
          <li>a mistyped address</li>
          <li>an out-of-date link</li>
        </ul>
      </div>
    </main>
  );
}
