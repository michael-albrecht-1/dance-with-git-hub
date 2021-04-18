import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from 'src/context/AuthContext';
import firestoreService from '../../firestoreService';

import './star.scss';

const Star = ({ repo }) => {
  const FS = firestoreService();
  const authValue = useContext(AuthContext);
  const user = authValue.userState;

  const [isStar, setIsStar] = useState(false);

  // is favorite repo ?
  useEffect(() => {
    if (user) {
      FS.isStar(user, repo, setIsStar);
    }
  }, []);

  // handle add star
  const handleAddStarClick = () => {
    if (user) {
      FS.addFavorite(user, repo);
      setIsStar(true);
    }
    else {
      console.log('you should login');
      window.location.replace('/login');
    }
  };

  // handle remove star
  const handleRemoveStar = () => {
    console.log('remove star');
    // # todo
  };
  // by default display empty star
  let star = (
    <i
      className="far fa-star star__icon"
      onClick={handleAddStarClick}
    />
  );
  if (user) {
    if (isStar) {
      // if user connected and the repo is in favorites : display active star
      star = (
        <i
          className="fas fa-star star__icon"
          onClick={handleRemoveStar}
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
