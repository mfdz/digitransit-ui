import PropTypes from 'prop-types';
import React from 'react';
import SavedSearchesList from './SavedSearchesList';

const SavedSearchesPanel = () => {
  // The data list should be fetched from the server.
  const list = [
    {
      index: 1,
      from: 'Stuttgart',
      to: 'Neckar',
      date: 1601019508,
      time: 1601019508,
      maxtime: 20,
      passengerNumber: 2,
    },
    {
      index: 2,
      from: 'Herrenberg',
      to: 'Tübingen',
      date: 1601030308,
      time: 1601030308,
      maxtime: 48,
      passengerNumber: 4,
    },
  ];

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
