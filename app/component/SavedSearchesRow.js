import PropTypes from 'prop-types';
import React from 'react';

const SavedSearchesRow = ({
  from,
  to,
  date,
  time,
  maxtime,
  passengerNumber,
}) => {
  return (
    <tr className="saved-search-row">
      <td className="saved-search-data">{from}</td>
      <td className="saved-search-data">{to}</td>
      <td className="saved-search-data">{date}</td>
      <td className="saved-search-data">{time}</td>
      <td className="saved-search-data text-center">{maxtime}</td>
      <td className="saved-search-data text-center">{passengerNumber}</td>
    </tr>
  );
};

SavedSearchesRow.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  maxtime: PropTypes.number.isRequired,
  passengerNumber: PropTypes.number.isRequired,
};

SavedSearchesRow.contextTypes = {
  config: PropTypes.object,
};

export default SavedSearchesRow;
