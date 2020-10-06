import PropTypes from 'prop-types';
import React from 'react';
import OfferedRidesList from './OfferedRidesList';
import list from '../../static/assets/MOCK_DATA_rides';

function OfferedRidesPanel() {
  // The data list should be fetched from the server. offer_list.php
  return (
    <div className="frontpage-panel fullscreen">
      <OfferedRidesList list={list} />
    </div>
  );
}

OfferedRidesPanel.contextTypes = {
  config: PropTypes.object,
};

export default OfferedRidesPanel;
