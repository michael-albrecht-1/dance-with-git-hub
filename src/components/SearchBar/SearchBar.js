import React from 'react';
import { Input } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

import './SearchBar.scss';

const SearchBar = ({
  handleSubmit,
  isLoading,
  search,
  setSearch,
}) => {
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="searchBar">
      <Input
        className="searchBar__input"
        icon="search"
        iconPosition="left"
        loading={isLoading}
        placeholder="Search..."
        value={search}
        onChange={setSearch}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

SearchBar.defaultProps = {
  isLoading: false,
  search: '',
  setSearch: () => '',
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  search: PropTypes.string,
  setSearch: PropTypes.func,
};

export default SearchBar;
