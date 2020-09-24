import PropTypes from 'prop-types';
import React from 'react';

function SavedSearchesRow({ from, to, date, time, maxtime, passengerNumber }) {
  return (
    <div>
      <span>{from}</span>
      <span>{to}</span>
      <span>{date}</span>
      <span>{time}</span>
      <span>{maxtime}</span>
      <span>{passengerNumber}</span>
    </div>
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
