import React from 'react';
import PropTypes from 'prop-types';

import './RepoResults.scss';

const RepoResults = ({ repo }) => (
  <div className="repo">
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
