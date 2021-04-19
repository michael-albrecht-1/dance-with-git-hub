import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react'

import './RepoResults.scss';
import Star from '../Star';

const RepoResults = ({ repo }) => (
  <Card>
    <Image src={repo.owner.avatar_url}  wrapped ui={false} />
    <Card.Content>
      <Card.Header>{repo.name}</Card.Header>
      <Card.Meta>
        <span className='date'>by {repo.owner.login}</span>
      </Card.Meta>
      <Card.Description>
        {repo.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Star repo={repo} />
    </Card.Content>
  </Card>
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
