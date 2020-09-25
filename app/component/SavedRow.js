import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

const SavedRow = ({ from, to, date, time, maxtime, passengerNumber }) => {
  return (
    <tr className="saved-search-row">
      <td className="saved-search-data">{from}</td>
      <td className="saved-search-data">{to}</td>
      <td className="saved-search-data text-center">
        {moment.unix(date).format('DD.MM.YYYY')}
      </td>
      <td className="saved-search-data text-center">
        {moment.unix(time).format('hh:mm')}
      </td>
      {maxtime !== 0 && (
        <td className="saved-search-data text-center">{maxtime} Min</td>
      )}
      <td className="saved-search-data text-center">{passengerNumber}</td>
    </tr>
  );
};

SavedRow.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  maxtime: PropTypes.number,
  passengerNumber: PropTypes.number.isRequired,
};

SavedRow.defaultProps = {
  maxtime: 0,
};

SavedRow.contextTypes = {
  config: PropTypes.object,
};

export default SavedRow;
