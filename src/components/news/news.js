import React from 'react';
import './news.css';
import MarkdownPage from "../document/markdown";

const News = () => {
    return (
        <section className="moultdb-news">
            <MarkdownPage pagePath={"/news/summary"}/>
        </section>
    );
};

export default News;
