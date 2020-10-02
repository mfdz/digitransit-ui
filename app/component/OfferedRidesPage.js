import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import data from '../../static/assets/MOCK_DATA_rides.json';
import { OfferedRidesHeader } from './OfferedRidesList';
import SavedRow from './SavedRow';

const OfferedRidesPage = () => {
  const header = [
    'date',
    'time',
    'route-from-here',
    'route-here',
    'passenger-number',
    'edit',
    'delete',
  ];

  return (
    <div className="saved-page fullscreen">
      <table className="saved-search-table">
        <thead>
          <OfferedRidesHeader header={header} />
        </thead>
        <tbody>
          {data.map(row => (
            <SavedRow
              key={row.id}
              from={row.from}
              to={row.to}
              date={row.date}
              time={row.time}
              passengerNumber={row.passengerNumber}
              editable
            />
          ))}
        </tbody>
      </table>
      <Link to="/" onlyActiveOnIndex>
        <div className="call-to-action-button">
          <FormattedMessage
            id="back-to-front-page"
            defaultMessage="Back to front page"
          />
        </div>
      </Link>
    </div>
  );
};

export default OfferedRidesPage;
