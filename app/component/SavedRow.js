import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';

const SavedRow = ({ from, to, date, time, seats, toDetail, id }) => {
  return (
    <tr
      className="saved-search-row text-center cursor-pointer"
      onClick={() => toDetail({ id, from, to, date, time, seats })}
    >
      <td className="saved-search-data">{date}</td>
      <td className="saved-search-data">{time}</td>
      <td className="saved-search-data">{from}</td>
      <td className="saved-search-data">{to}</td>
      {seats !== undefined && <td className="saved-search-data">{seats}</td>}
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
  seats: PropTypes.number,
  toDetail: PropTypes.func,
  id: PropTypes.number,
};

SavedRow.defaultProps = {
  seats: undefined,
};

SavedRow.contextTypes = {
  config: PropTypes.object,
};

export default SavedRow;
