import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from 'src/context/AuthContext';
import './RepoResults.scss';
import firestoreService from '../../firestoreService';

const RepoResults = ({ repo }) => {
  const FS = firestoreService();
  const [isStar, setIsStar] = useState(false);
  const authValue = useContext(AuthContext);
  const user = authValue.userState;
  const handleStarClick = () => {
    // #check if user is auth
    // #check if user exist in Firestore
    // # -> if note create him
    // # is isStar === false-> add repo in FS favorites
    // # is isStar === true -> remove it
    setIsStar(!isStar);
    FS.addFavorite(user, repo);
  };

  // console.log(repo);

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
