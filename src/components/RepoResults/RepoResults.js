import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './RepoResults.scss';

const RepoResults = ({ repo }) => {
  const [isStar, setIsStar] = useState(false);
  const handleStarClick = () => setIsStar(!isStar);
  return (
    <div className="repo">
      {
        isStar ? (
          <i
            className="fas fa-star repo__icon"
            onClick={handleStarClick}
          />
        )
          : (
            <i
              className="far fa-star repo__icon"
              onClick={handleStarClick}
            />
          )
      }
      <a href={repo.html_url}>
        <div className="repo__img">
          <img src={repo.owner.avatar_url} alt="auteur" />
        </div>
        <h1 className="repo__title">{repo.name}</h1>
        <p className="repo__author">{repo.owner.login}</p>
        <p className="repo__description">{repo.description}</p>
      </a>
    </div>
  );
};

RepoResults.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
    html_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default RepoResults;
