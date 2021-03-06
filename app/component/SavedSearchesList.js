import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SavedRow from './SavedRow';

export const SavedSearchesHeader = ({ header }) => {
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

SavedSearchesHeader.propTypes = {
  header: PropTypes.array.isRequired,
};

const SavedSearchesList = ({ list, toDetail }) => {
  const header = ['date', 'time', 'route-from-here', 'route-here'];

  return (
    <table className="saved-search-table">
      <thead>
        <SavedSearchesHeader header={header} />
      </thead>
      <tbody>
        {list.map(row => (
          <SavedRow
            key={row.id}
            id={row.id}
            from={row.from}
            to={row.to}
            date={row.date}
            time={row.time}
            toDetail={toDetail}
          />
        ))}
      </tbody>
    </table>
  );
};

SavedSearchesList.propTypes = {
  list: PropTypes.array.isRequired,
  toDetail: PropTypes.func,
};

SavedSearchesList.contextTypes = {
  config: PropTypes.object,
};

export default SavedSearchesList;
