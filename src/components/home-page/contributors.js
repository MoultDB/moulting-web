import React, { useEffect, useState } from 'react';
import ImageService from '../../services/image.service';
import './contributors.css';

const Contributors = () => {
    const [contributors, setContributors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadContributors = async () => {
            try {
                const data = await ImageService.fetchTopContributors();
                setContributors(data);
            } catch (error) {
                console.error('Error fetching contributors:', error);
                setError('Failed to load contributors. Please try again later.');
            }
        };

        loadContributors();
    }, []);

    return (
        <div className="contributors">
            <h4 className="sb-title">TOP CONTRIBUTORS</h4>
            {error && <p className="error">{error}</p>}
            {contributors.map((contributor, index) => (
                <div key={index} className="contr-item">
                    <a href="#">
                        <img src={contributor.iconUrl} alt={contributor.login} width="70" height="70" />
                    </a>
                    <div className="contr-author">
                        <h6><a href="#">{contributor.login}</a></h6>
                        <span>{contributor.observationCount} observations</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Contributors;
