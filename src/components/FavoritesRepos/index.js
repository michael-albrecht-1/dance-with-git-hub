import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import firestoreService from '../../firestoreService';
import { Card } from 'semantic-ui-react';

import RepoResults from '../RepoResults/RepoResults';
import './favorites.scss';

const FavoritesRepos = () => {
  const FS = firestoreService();
  const authValue = useContext(AuthContext);
  const user = authValue.userState;

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      FS.getFavoritesRepos(user, setRepos);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const reposList = repos.map((repo) => <RepoResults key={repo.node_id} repo={repo} />);

  const intViewportWidth = window.innerWidth;
  let raw = 1;
  if (intViewportWidth >= 700) {
    raw = 2;
  }
  if (intViewportWidth >= 1000) {
    raw = 3;
  }

  return (
    <Card.Group itemsPerRow={raw}>
      {reposList}
    </Card.Group>
  );
};

export default FavoritesRepos;
