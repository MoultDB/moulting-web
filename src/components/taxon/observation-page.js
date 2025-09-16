import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './observation-page.css';
import imageService, { INAT_PROJECT_URL } from "../../services/image.service";
import Loader from "../common/loader";
import { getContributorUrl } from "../home-page/contributors";



const ObservationPage = () => {
    const params = useParams();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [moultDBValid, setMoultDBValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const results = await imageService.fetchImagesForObservation(params.observationId);
                if (results.length > 0) {
                    setImage(results[0]);
                } else {
                    navigate("/observations/not-found", { replace: true });
                }
            } catch (error) {
                console.error('Error fetching images:', error);
                navigate("/observations/not-found", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [params.observationId, navigate]);


    useEffect(() => {
        const validateMoultDB = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/taxa?datasource=inaturalist&accession=${image.taxonId}`);
                const json = await res.json();
                json.data ? setMoultDBValid(true) : setMoultDBValid(false);
            } catch (e) {
                console.warn("Failed to validate MoultDB link", e);
            }
        };

        if (image && image.taxonId) {
            validateMoultDB();
        }
    }, [image]);

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

                        <div className="bottom-section new-layout">
                            <div className="left-column">
                                <div className="description-section subsection">
                                    <h2 className="info-title">Description</h2>
                                    <p>{image.description || "No description provided."}</p>
                                </div>
                            </div>

                            <div className="right-column">
                                <div className="combined-box subsection">
                                    <div className="details-subbox">
                                        <h2 className="info-title">Details</h2>
                                        <ul className="info-list">
                                            <li>
                                                <span className="font-medium">
                                                    In <a href={INAT_PROJECT_URL} target="_blank" rel="noopener noreferrer">
                                                        Moulting arthropods
                                                    </a> project:
                                                </span>{" "}
                                                {image.inProject ? "Yes" : "No"}
                                            </li>

                                            {image.categories && (
                                                <>
                                                   {["Moulting Stage", "Life Stage", "Sex (if identifiable)", "Captive/cultivated", "Fossil"].map((key) => {

                                                        const value = image.categories[key];
                                                        if (!value) return null;

                                                        const labelMap = {
                                                          "Moulting Stage": "Moulting Stage",
                                                          "Life Stage": "Life Stage",
                                                          "Sex (if identifiable)": "Sex",
                                                          "Captive/cultivated": "Captivity",
                                                          "Fossil": "Fossil"
                                                        };

                                                        return (
                                                            <li key={key}>
                                                                <span className="font-medium">{labelMap[key]}:</span> {value}
                                                            </li>
                                                        );
                                                    })}
                                                </>
                                            )}
                                        </ul>
                                    </div>

                                    <hr className="section-divider" />

                                    <div className="links-subbox">
                                        <h2 className="info-title">Links</h2>
                                        <ul className="info-list">
                                            <li>
                                                <Link to={"/taxon/" + image.taxonId}>Taxon observations</Link>
                                            </li>
                                            {moultDBValid && (
                                              <li>
                                                  <a
                                                      href={process.env.REACT_APP_MOULTDB_URL + "/taxon/inaturalist/" + image.taxonId}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                  >
                                                      MoultDB data
                                                  </a>
                                              </li>
                                            )}
                                            {image.uri && (
                                                <li>
                                                    <a href={image.uri} target="_blank" rel="noopener noreferrer">
                                                        iNaturalist observation
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ObservationPage;
