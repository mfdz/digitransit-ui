import PropTypes from 'prop-types';
import React from 'react';

function SavedSearchesRow({ from, to, date, time, maxtime, passengerNumber }) {
  return (
    <tr>
      <td>{from}</td>
      <td>{to}</td>
      <td>{date}</td>
      <td>{time}</td>
      <td>{maxtime}</td>
      <td>{passengerNumber}</td>
    </tr>
  );
}

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
