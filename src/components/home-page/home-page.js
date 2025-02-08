import React from 'react';
import './home-page.css';
import Hero from "./hero";
import VideoViewer from "./video-viewer";
import Carousel from './carusel';
import Sidebar from '../common/sidebar';
import Contributors from './contributors';

export default function HomePage() {
    return (
        <main>
            <Hero />

            <div className="movie-items">
                <div className="container">
                    <div className="row ipad-width">
                        <div className="col-md-8">
                            <Carousel />
                        </div>
                        <div className="col-md-4">
                            {/* <Sidebar /> */}
                            <Contributors />
                        </div>
                    </div>
                </div>
            </div>

            <VideoViewer />
        </main>
    );
}
