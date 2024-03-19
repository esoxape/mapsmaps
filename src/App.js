import React from 'react';
import './App.css';
import MapComponent from './MapComponent.tsx';
import MapComponentGoogle from './MapComponentGoogle.tsx';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="App">
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{flex: 1}}>
          <MapComponent />
        </div>
        <div style={{flex: 1}}>
          <MapComponentGoogle />
        </div>
      </div>
    </div>
  );
}

export default App;
