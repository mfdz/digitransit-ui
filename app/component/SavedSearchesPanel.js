import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SavedSearchesList from './SavedSearchesList';
import SavedSearchDetail from './SavedSearchDetail';
import list from '../../static/assets/MOCK_DATA';

let currentId;

const SavedSearchesPanel = () => {
  const [renderComponent, setRenderComponent] = useState('list');

  const toDetail = id => {
    currentId = id;
    setRenderComponent('details');
  };

  const toList = () => {
    setRenderComponent('list');
  };

  return (
    <div className="frontpage-panel fullscreen">
      {renderComponent === 'list' ? (
        <SavedSearchesList list={list} toDetail={toDetail} />
      ) : (
        <SavedSearchDetail toList={toList} id={currentId} />
      )}
    </div>
  );
};

SavedSearchesPanel.contextTypes = {
  config: PropTypes.object,
};

export default SavedSearchesPanel;
