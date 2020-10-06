import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';

const SavedRow = ({ from, to, date, time, passengerNumber, toDetail, id }) => {
  return (
    <tr
      className="saved-search-row text-center cursor-pointer"
      onClick={() => toDetail(id)}
    >
      <td className="saved-search-data">{date}</td>
      <td className="saved-search-data">{time}</td>
      <td className="saved-search-data">{from}</td>
      <td className="saved-search-data">{to}</td>
      {passengerNumber !== 0 && (
        <td className="saved-search-data">{passengerNumber}</td>
      )}
      <td>
        <Icon img="icon-icon_delete" />
      </td>
    </tr>
  );
};

SavedRow.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  passengerNumber: PropTypes.number,
  toDetail: PropTypes.func,
  id: PropTypes.number,
};

SavedRow.defaultProps = {
  passengerNumber: 0,
};

SavedRow.contextTypes = {
  config: PropTypes.object,
};

export default SavedRow;
