import React, { useState, useEffect } from 'react';
import SavedSearchesList from './SavedSearchesList';
import SavedSearchDetail from './SavedSearchDetail';

let currentId;

const SavedSearchesPanel = () => {
  const [renderComponent, setRenderComponent] = useState('list');
  const [data, setData] = useState([]);

  useEffect(() => {
    // TODO: change server URL
    fetch(
      'https://static.204.143.47.78.clients.your-server.de/test/about.php',
      {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
    )
      .then(response => response.json())
      .then(d => (d ? setData(d) : setData([])))
      // eslint-disable-next-line no-console
      .catch(e => console.log(e));
  }, []);

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
        <SavedSearchesList list={data} toDetail={toDetail} />
      ) : (
        <SavedSearchDetail toList={toList} id={currentId} />
      )}
    </div>
  );
};

export default SavedSearchesPanel;
