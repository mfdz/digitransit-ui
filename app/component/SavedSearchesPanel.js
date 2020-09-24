import PropTypes from 'prop-types';
import React from 'react';
import SavedSearchesList from './SavedSearchesList';

const SavedSearchesPanel = () => {
  // The data list should be fetched from the server.
  const list = [
    {
      index: 1,
      from: 'asdfdf',
      to: 'njfdsa',
      date: 2341234,
      time: 234532,
      maxtime: 23423,
      passengerNumber: 2,
    },
    {
      index: 2,
      from: 'dfgzd',
      to: 'njiuouijfdsa',
      date: 76456,
      time: 56456,
      maxtime: 325,
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
