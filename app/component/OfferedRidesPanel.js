import PropTypes from 'prop-types';
import React from 'react';
import OfferedRidesList from './OfferedRidesList';

function OfferedRidesPanel() {
  // The data list should be fetched from the server. ride_offer.php
  const list = [
    {
      index: 1,
      from: 'Stuttgart',
      to: 'Neckar',
      date: 1601019508,
      time: 1601019508,
      passengerNumber: 2,
    },
    {
      index: 2,
      from: 'Herrenberg',
      to: 'Tübingen',
      date: 1601030308,
      time: 1601030308,
      passengerNumber: 4,
    },
  ];

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
