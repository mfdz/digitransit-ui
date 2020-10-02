import React from 'react';
import data from '../../static/assets/MOCK_DATA.json';
import { SavedSearchesHeader } from './SavedSearchesList';
import SavedRow from './SavedRow';

const SavedSearchesPage = () => {
  const header = [
    'route-from-here',
    'route-here',
    'date',
    'time',
    'edit',
    'delete',
  ];

  return (
    <table>
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
  );
};

export default SavedSearchesPage;
