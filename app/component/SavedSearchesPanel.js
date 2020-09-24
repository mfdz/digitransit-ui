import PropTypes from 'prop-types';
import React from 'react';
import SavedSearchesList from './SavedSearchesList';

function SavedSearchesPanel() {
  return (
    <div className="frontpage-panel fullscreen">
      <SavedSearchesList />
    </div>
  );
}

SavedSearchesPanel.contextTypes = {
  config: PropTypes.object,
};

export default SavedSearchesPanel;
