import React from 'react';
import PropTypes from 'prop-types';

const SavedSearchDetail = ({ toList, id }) => {
  return (
    <div>
      {id}
      <button onClick={toList}>Cancel</button>
    </div>
  );
};

SavedSearchDetail.propTypes = {
  toList: PropTypes.func,
  id: PropTypes.number,
};

export default SavedSearchDetail;
