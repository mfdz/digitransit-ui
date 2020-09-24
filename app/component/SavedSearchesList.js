import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SavedSearchesRow from './SavedSearchesRow';

const SavedSearchesHeader = () => {
  const header = [
    'route-from-here',
    'route-here',
    'date',
    'time',
    'itinerary-time.title',
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

const SavedSearchesList = ({ list }) => {
  return (
    <table className="saved-search-table">
      <thead>
        <SavedSearchesHeader />
      </thead>
      <tbody>
        {list.map(row => (
          <SavedSearchesRow
            key={row.index}
            from={row.from}
            to={row.to}
            date={row.date}
            time={row.time}
            maxtime={row.maxtime}
            passengerNumber={row.passengerNumber}
          />
        ))}
      </tbody>
    </table>
  );
};

SavedSearchesList.propTypes = {
  list: PropTypes.array.isRequired,
};

SavedSearchesList.contextTypes = {
  config: PropTypes.object,
};

export default SavedSearchesList;
