import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SavedRow from './SavedRow';

export const OfferedRidesHeader = ({ header }) => {
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

OfferedRidesHeader.propTypes = {
  header: PropTypes.array.isRequired,
};

const OfferedRidesList = ({ list, toDetail }) => {
  const header = [
    'date',
    'time',
    'route-from-here',
    'route-here',
    'passenger-number',
  ];

  return (
    <table className="saved-search-table">
      <thead>
        <OfferedRidesHeader header={header} />
      </thead>
      <tbody>
        {list.map(row => (
          <SavedRow
            key={row.id}
            from={row.from}
            to={row.to}
            date={row.date}
            time={row.time}
            seats={row.seats}
            toDetail={toDetail}
          />
        ))}
      </tbody>
    </table>
  );
};

OfferedRidesList.propTypes = {
  list: PropTypes.array.isRequired,
  toDetail: PropTypes.func,
};

OfferedRidesList.contextTypes = {
  config: PropTypes.object,
};

export default OfferedRidesList;
