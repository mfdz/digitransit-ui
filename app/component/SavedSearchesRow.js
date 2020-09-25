import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

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
      <td className="saved-search-data">
        {moment.unix(date).format('DD.MM.YYYY')}
      </td>
      <td className="saved-search-data">{moment.unix(time).format('hh:mm')}</td>
      <td className="saved-search-data text-center">{maxtime} Min</td>
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
