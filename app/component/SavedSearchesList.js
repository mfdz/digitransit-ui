import PropTypes from 'prop-types';
import React from 'react';
import SavedSearchesRow from './SavedSearchesRow';

function SavedSearchesHeader() {
  return (
    <tr>
      <th>From</th>
      <th>To</th>
      <th>Date</th>
      <th>Time</th>
      <th>Maxtime</th>
      <th>Passenger number</th>
    </tr>
  );
}

function SavedSearchesList({ list }) {
  return (
    <table>
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
}

SavedSearchesList.propTypes = {
  list: PropTypes.array.isRequired,
};

SavedSearchesList.contextTypes = {
  config: PropTypes.object,
};

export default SavedSearchesList;
