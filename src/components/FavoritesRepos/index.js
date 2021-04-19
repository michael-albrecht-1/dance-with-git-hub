import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import firestoreService from '../../firestoreService';

import RepoResults from '../RepoResults/RepoResults';
import './favorites.scss';

const FavoritesRepos = () => {
  const FS = firestoreService();
  const authValue = useContext(AuthContext);
  const user = authValue.userState;

  const [repos, setRepos] = useState({});

  // is favorite repo ?
  useEffect(() => {
    FS.getFavoritesRepos(user, setRepos);
  }, [repos, user]);

  console.table(repos);
  // const reposList = repos.map((r) => <RepoResults key={r.id} repo={r} />);

  return (
    <div className="favorites">
      daz
    </div>
  );
};

export default FavoritesRepos;
