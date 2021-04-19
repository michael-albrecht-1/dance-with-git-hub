import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import firestoreService from '../../firestoreService';

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

  return (
    <div className="favorites">
      {reposList}
    </div>
  );
};

export default FavoritesRepos;
