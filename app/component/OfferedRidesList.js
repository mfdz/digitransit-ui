import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SavedRow from './SavedRow';

const OfferedRidesHeader = () => {
  const header = [
    'date',
    'time',
    'route-from-here',
    'route-here',
    'passenger-number',
  ];

  return (
    <tr>
      {header.map(item => {
        return (
          <th key={item} className="saved-search-header">
            <FormattedMessage id={item} defaultMessage="" />
          </th>
        );
      })}
    </tr>
  );
};

const OfferedRidesList = ({ list }) => {
  return (
    <table className="saved-search-table">
      <thead>
        <OfferedRidesHeader />
      </thead>
      <tbody>
        {list.map(row => (
          <SavedRow
            key={row.index}
            from={row.from}
            to={row.to}
            date={row.date}
            time={row.time}
            passengerNumber={row.passengerNumber}
          />
        ))}
      </tbody>
    </table>
  );
};

OfferedRidesList.propTypes = {
  list: PropTypes.array.isRequired,
};

OfferedRidesList.contextTypes = {
  config: PropTypes.object,
};

export default OfferedRidesList;
