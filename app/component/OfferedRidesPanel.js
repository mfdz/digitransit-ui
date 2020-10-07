import React, { useState, useEffect } from 'react';
import OfferedRidesList from './OfferedRidesList';
import OfferedRidesDetail from './OfferedRidesDetail';
import LoginButton from './LoginButton';
import Loading from './Loading';

let currentRide;

function OfferedRidesPanel() {
  const [renderComponent, setRenderComponent] = useState('list');
  const [data, setData] = useState([]);
  const [formState, setFormState] = useState('pending');
  const userLoggedIn = true;

  useEffect(() => {
    // TODO: change server URL
    fetch('http://a70bf5914cdc.ngrok.io/rides', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(response => {
        if (response.ok) {
          setFormState('success');
        }
        return response.json();
      })
      .then(d => (d ? setData(d) : setData([])))
      // eslint-disable-next-line no-console
      .catch(e => console.log(e));
  }, []);

  const toDetail = ride => {
    currentRide = ride;
    setRenderComponent('details');
  };

  const toList = () => {
    setRenderComponent('list');
  };

  const renderLogin = () => {
    return (
      <div className="sidePanelText">
        Please log in to see your saved searches.
        <LoginButton className="sidePanel-btn login-icon" isMobile />
      </div>
    );
  };

  if (!userLoggedIn) {
    return renderLogin();
  }

  if (formState === 'pending') {
    return (
      <div className="frontpage-panel fullscreen">
        <Loading />;
      </div>
    );
  }

  if (data.length < 0) {
    return (
      <div className="frontpage-panel fullscreen">
        You donot have any saved searches yet.
      </div>
    );
  }

  return (
    <div className="frontpage-panel fullscreen">
      {renderComponent === 'list' ? (
        <OfferedRidesList list={data} toDetail={toDetail} />
      ) : (
        <OfferedRidesDetail toList={toList} currentRide={currentRide} />
      )}
    </div>
  );
}

export default OfferedRidesPanel;
