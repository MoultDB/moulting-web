import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './observation-page.css';
import imageService, { PROJECT_URL } from "../../services/image.service";
import Loader from "../common/loader";
import { getContributorUrl } from "../home-page/contributors";

const ObservationPage = () => {
    let params = useParams();
    const [image, setImage] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const results = await imageService.fetchImagesForObservation(params.observationId);
                if (results.length > 0) {
                    setImage(results[0]);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
                setError('Failed to load images. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [params.taxonId, params.observationId]);

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
            {error && <p className="error">{error}</p>}
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h1>{image.taxonName}</h1>
                    <p className="contributor">
                        Contributed by: <a href={getContributorUrl(image.login)}>{image.login}</a>
                    </p>
            
                    <div className="image-card">
                        <div className="top-section">
                            {/* Image section */}
                            <div className="image-section">
                                <div className="relative w-full">
                                    <img
                                        src={image.allImageUrls[currentIndex]}
                                        alt={`${image.taxonName}, view ${currentIndex + 1}`}
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
                                    {image.allThumbImageUrls.map((url, index) => (
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
                                    title={`Map showing location of observation ${image.inatId} (${image.taxonName})`}
                                ></iframe>
                            </div>
                        </div>
            
                        <div className="bottom-section">
                            {/* Description section */}
                            <div className="description-section subsection">
                                <h2 className="info-title">Description</h2>
                                <p>{image.description}</p>
                            </div>
            
                            {/* Details section */}
                            <div className="list-section subsection">
                                <h2 className="info-title">Details</h2>
                                <ul className="info-list">
                                    <li>
                                        <span className="font-medium">In <a href={PROJECT_URL} rel="noopener noreferrer"
                                               target="_blank">Moulting arthropods</a> project:</span>
                                        {image.inProject ? "yes" : "no"}
                                    </li>
                                    {image.categories && Object.entries(image.categories).map(([key, value]) => (
                                        <li key={key}><span className="font-medium">{key}:</span> {value}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Link section */}
                            <div className="list-section subsection">
                                <h2 className="info-title">Links</h2>
                                <ul className="info-list">
                                    <li>Species observations: <Link to={"/species/" + image.taxonId}>{image.taxonId}</Link></li>
                                    <li>MoultDB data: <a href={"https://moultdb.org/species/inaturalist/" + image.taxonId} target="_blank" rel="noopener noreferrer">
                                        {image.taxonId}
                                    </a></li>
                                    {image.uri && (
                                        <li>
                                        <span className="font-medium">iNaturalist observation:</span>
                                            <a href={image.uri} target="_blank" rel="noopener noreferrer">
                                                {image.inatId}
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
            
                </>
            )}
        </div>
    );
};

export default ObservationPage;
