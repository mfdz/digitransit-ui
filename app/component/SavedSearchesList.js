import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SavedRow from './SavedRow';

const SavedSearchesHeader = () => {
  const header = ['date', 'time', 'route-from-here', 'route-here'];

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
          <SavedRow
            key={row.index}
            from={row.from}
            to={row.to}
            date={row.date}
            time={row.time}
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
