import PropTypes from 'prop-types';
import React from 'react';
import SavedSearchesList from './SavedSearchesList';

const SavedSearchesPanel = () => {
  let list = [];
  fetch('/rides/list_saved_searches.php', {
    method: 'GET',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify(),
    // eslint-disable-next-line func-names
  }).then(response => {
    if (!response.status === 200) {
      return response.json();
    }
    // TODO check: console.log(response);
    list = response;
    return (
      <div className="frontpage-panel fullscreen">
        <SavedSearchesList list={list} />
      </div>
    );
  });
};

SavedSearchesPanel.contextTypes = {
  config: PropTypes.object,
};

export default SavedSearchesPanel;
