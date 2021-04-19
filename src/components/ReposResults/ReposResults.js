import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card } from 'semantic-ui-react';

import RepoResults from '../RepoResults/RepoResults';
import './ReposResults.scss';

const ReposResults = ({ repos, displayMoreResultsButton, handleMoreResultsClick }) => {
  const reposList = repos.map((r) => <RepoResults key={r.id} repo={r} />);

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
      {(displayMoreResultsButton) && (
        <div className="button">
          <Button
            className="button"
            onClick={handleMoreResultsClick}
          >Plus de résultats
          </Button>
        </div>
      )}
    </Card.Group>
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
