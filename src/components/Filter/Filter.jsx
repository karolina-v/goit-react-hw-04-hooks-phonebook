import React from 'react';
import PropTypes from 'prop-types';

function Filter ({ value, onChange }) {
  return (
        <div>
            <h3>Find contacts by name</h3>
            <input
            type="text"
            name="filter"
            value={value}
            onChange={onChange}
            />
        </div>
    );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Filter;