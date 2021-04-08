import React from 'react';
import { PropTypes } from 'prop-types';

import { Button } from 'semantic-ui-react';
import RepoResults from '../RepoResults/RepoResults';
import './ReposResults.scss';

const ReposResults = ({ repos, displayMoreResultsButton, handleMoreResultsClick }) => {
  const reposList = repos.map((r) => <RepoResults key={r.id} repo={r} />);

  return (
    <div className="repos">
      {reposList}
      {(displayMoreResultsButton) && (
        <Button
          className="button"
          onClick={handleMoreResultsClick}
        >Plus de résultats
        </Button>
      )}
    </div>
  );
};

ReposResults.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  handleMoreResultsClick: PropTypes.func.isRequired,
  displayMoreResultsButton: PropTypes.bool.isRequired,
};

export default ReposResults;
