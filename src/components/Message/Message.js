import React from 'react';
import PropTypes from 'prop-types';

import './Message.scss';

const Message = ({ status, resultsCount }) => {
  let formatedMessage = '';

  if (status.code === 200) {
    formatedMessage = <p className={status.class}>La recherche a donné {resultsCount} résultats</p>;
  }

  if (status.code > 300) {
    formatedMessage = <p className={status.class}>{status.label}</p>;
  }

  return (
    formatedMessage && (
    <div className="messages">
      {formatedMessage}
    </div>
    )
  );
};

Message.propTypes = {
  status: PropTypes.shape({
    label: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    code: PropTypes.number.isRequired,
  }).isRequired,
  resultsCount: PropTypes.number.isRequired,
};

export default Message;
