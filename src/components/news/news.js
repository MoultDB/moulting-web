import React from 'react';
import './news.css';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import AdBlockDetect from '../ad-block-detect/detect';

const News = () => {
    return (
        <section className="moultdb-news">
            <AdBlockDetect />
            <div className="twitter-embed ">
                <TwitterTimelineEmbed sourceType="profile" screenName="moultdb"
                                      noHeader placeholder="Loading..."
                                      options={{tweetLimit: "5", lang: "en", dnt: "true", cards: "hidden"}}
                />
            </div>
        </section>
    );
};

export default News;
