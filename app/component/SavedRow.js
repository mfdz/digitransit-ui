import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';

const renderButtons = () => {
  return (
    <>
      <td>
        <Icon img="icon-icon_edit" />
      </td>
      <td>
        <Icon img="icon-icon_delete" />
      </td>
    </>
  );
};

const SavedRow = ({ from, to, date, time, passengerNumber, editable }) => {
  return (
    <tr className="saved-search-row text-center">
      <td className="saved-search-data">{date}</td>
      <td className="saved-search-data">{time}</td>
      <td className="saved-search-data">{from}</td>
      <td className="saved-search-data">{to}</td>
      {passengerNumber !== 0 && (
        <td className="saved-search-data">{passengerNumber}</td>
      )}
      {editable && renderButtons()}
    </tr>
  );
};

SavedRow.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  passengerNumber: PropTypes.number,
  editable: PropTypes.bool,
};

SavedRow.defaultProps = {
  passengerNumber: 0,
  editable: false,
};

SavedRow.contextTypes = {
  config: PropTypes.object,
};

export default SavedRow;
