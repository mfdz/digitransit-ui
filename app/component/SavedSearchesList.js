import PropTypes from 'prop-types';
import React from 'react';
import SavedSearchesRow from './SavedSearchesRow';

function SavedSearchesHeader() {
  return (
    <div>
      <span>From</span>
      <span>To</span>
      <span>Date</span>
      <span>Time</span>
      <span>Maxtime</span>
      <span>Passenger number</span>
    </div>
  );
}

function SavedSearchesList() {
  return (
    <>
      <SavedSearchesHeader />
      <SavedSearchesRow
        from="HABI"
        to="EZIS"
        date={13124235234}
        time={123423}
        maxtime={234523}
        passengerNumber={2}
      />
    </>
  );
}

SavedSearchesList.contextTypes = {
  config: PropTypes.object,
};

export default SavedSearchesList;
