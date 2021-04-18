import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from 'src/context/AuthContext';
import firestoreService from '../../firestoreService';

import './star.scss';

const Star = ({ repo }) => {
  const FS = firestoreService();
  const authValue = useContext(AuthContext);
  const user = authValue.userState;

  const [isStar, setIsStar] = useState(false);
  const handleStarClick = () => {
    setIsStar(!isStar);
    FS.addFavorite(user, repo);
  };
  // by default display empty star
  let star = (
    <i
      className="far fa-star star__icon"
      onClick={handleStarClick}
    />
  );
  if (user) {
    if (isStar) {
      // if user connected and the repo is in favorites : display active star
      star = (
        <i
          className="fas fa-star star__icon"
          onClick={handleStarClick}
        />
      );
    }
  }
  return (
    <div className="star">
      {star}
    </div>
  );
};

Star.propTypes = {
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

export default Star;
