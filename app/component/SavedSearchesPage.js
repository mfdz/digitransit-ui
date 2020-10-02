import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import data from '../../static/assets/MOCK_DATA.json';
import { SavedSearchesHeader } from './SavedSearchesList';
import SavedRow from './SavedRow';

const SavedSearchesPage = () => {
  const header = [
    'date',
    'time',
    'route-from-here',
    'route-here',
    'edit',
    'delete',
  ];

  return (
    <div className="saved-page fullscreen">
      <table className="saved-search-table">
        <thead>
          <SavedSearchesHeader header={header} />
        </thead>
        <tbody>
          {data.map(row => (
            <SavedRow
              key={row.id}
              from={row.from}
              to={row.to}
              date={row.date}
              time={row.time}
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

export default SavedSearchesPage;
