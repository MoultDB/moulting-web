import React, { useState, useEffect } from 'react';
import './contributors.css';

const Contributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    // Fetch top contributors from the backend
    fetch('/top-contributors')
      .then((response) => response.json())
      .then((data) => setContributors(data))
      .catch((error) => console.error('Error fetching contributors:', error));
  }, []);

  return (
    <div className="contributors">
      <h4 className="sb-title">TOP CONTRIBUTORS</h4>
      {contributors.map((contributor, index) => (
        <div key={index} className="contr-item">
          <a href="#">
            <img src={contributor.iconUrl || 'https://via.placeholder.com/70'} alt={contributor.login} width="70" height="70" />
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
