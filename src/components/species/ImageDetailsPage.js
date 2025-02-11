import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ImageDetailsPage.css';

const ImageDetailsPage = () => {
    const location = useLocation();
    const { image } = location.state || {};

    const [currentIndex, setCurrentIndex] = useState(0);

    if (!image) {
        return <p className="text-center text-red-500 font-semibold">Error: No image data available.</p>;
    }

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? image.allImageUrls.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === image.allImageUrls.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="page-container">
            <h1 className="card-title">{image.taxonName}</h1>

            <p className="contributor">
                Contributed by: <span className="font-semibold">{image.login}</span> 
                {image.uri && (
                    <>
                        &nbsp;- iNaturalist observation:&nbsp;
                        <a href={image.uri} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                             {image.inatId}
                        </a>
                    </>
                )}
            </p>
            
            {/* Main container */}
            <div className="image-card">
                <div className="top-section">
                    {/* Image section */}
                    <div className="image-section">
                        <div className="relative w-full">
                            <img 
                                src={image.allImageUrls[currentIndex]} 
                                alt={`Photo of ${image.taxonName}, image ${currentIndex + 1}`} 
                                className="image-display"
                            />
                            <button onClick={prevImage} className="navigation-btn prev-btn">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextImage} className="navigation-btn next-btn">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                        <div className="thumbnail-gallery">
                            {image.allImageUrls.map((url, index) => (
                                <img 
                                    key={index} 
                                    src={url} 
                                    alt={`${image.taxonName} thumbnail ${index + 1}`} 
                                    className={`thumbnail ${currentIndex === index ? 'active' : ''}`} 
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Maps top right */}
                    <div className="map-section">
                        <iframe
                            id="mapsource"
                            className="mapsource"
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${image.longitude - 0.1},${image.latitude - 0.1},${image.longitude + 0.1},${image.latitude + 0.1}&layer=mapnik&marker=${image.latitude},${image.longitude}&zoom=7`}
                            width="100%"
                            height="350"
                            style={{ border: "1px solid black", borderRadius: "8px" }}
                            scrollwheel="false"
                        ></iframe>
                    </div>
                </div>

                <div className="bottom-section">
                    {/* Description section under the carusel */}
                    <div className="description-section">
                        <h2 className="info-title">Description</h2>
                        <p>{image.description}</p>
                    </div>

                    {/* Details section */}
                    <div className="info-section">
                        <h2 className="info-title">Details</h2>
                        <ul className="info-list">
                            {image.categories && Object.entries(image.categories).map(([key, value]) => (
                                <li key={key}>
                                    <span className="font-medium">{key}:</span> <span>{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageDetailsPage;
