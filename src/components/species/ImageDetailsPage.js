import React from 'react';
import { useLocation } from 'react-router-dom';

const ImageDetailsPage = () => {
    const location = useLocation();
    const { image } = location.state;

    return (
        <div className="page-single">
            <div className="container">
                <h1>{image.taxonName}</h1>
                <div className="image-gallery">
                    {image.allImageUrls.map((url, index) => (
                        <img key={index} src={url} alt={`${image.taxonName} image ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageDetailsPage;
