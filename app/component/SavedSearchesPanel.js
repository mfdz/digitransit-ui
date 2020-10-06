import PropTypes from 'prop-types';
import React from 'react';
import SavedSearchesList from './SavedSearchesList';
import list from '../../static/assets/MOCK_DATA';

const SavedSearchesPanel = () => {
  // The data list should be fetched from the server. search_list.php
  return (
    <div className="frontpage-panel fullscreen">
      <SavedSearchesList list={list} />
    </div>
  );
};

SavedSearchesPanel.contextTypes = {
  config: PropTypes.object,
};

export default SavedSearchesPanel;
