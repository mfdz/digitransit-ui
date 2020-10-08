import React, { useState, useEffect } from 'react';
import SavedSearchesList from './SavedSearchesList';
import SavedSearchDetail from './SavedSearchDetail';
import LoginButton from './LoginButton';
import Loading from './Loading';

let currentSearch;

const SavedSearchesPanel = () => {
  const [renderComponent, setRenderComponent] = useState('list');
  const [data, setData] = useState([]);
  const [formState, setFormState] = useState('pending');
  const userLoggedIn = true;

  useEffect(
    () => {
      // TODO: change server URL
      fetch('http://37c2e584ba0a.ngrok.io/itineraries', {
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
    },
    [renderComponent],
  );

  const toDetail = search => {
    currentSearch = search;
    setRenderComponent('details');
  };

  const toList = () => {
    if (renderComponent !== 'list') {
      setRenderComponent('list');
    }
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
        <SavedSearchesList list={data} toDetail={toDetail} />
      ) : (
        <SavedSearchDetail toList={toList} currentSearch={currentSearch} />
      )}
    </div>
  );
};

export default SavedSearchesPanel;
