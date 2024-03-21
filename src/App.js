import React, { useState } from 'react';
import './App.css';
import MapComponent from './MapComponent.tsx';
import MapComponentGoogle from './MapComponentGoogle.tsx';
import { Ticket } from './Ticket.tsx'; // Ensure this path is correct

function App() {
  const initialCenter = { lat: 57.0, lng: 14.5 };
  const [mapCenter, setMapCenter] = useState({ lat: 57.0, lng: 14.5 });
  const [zoomLevel, setZoomLevel] = useState(8);
  const [tickets, setTickets] = useState(Ticket.generateRandomTickets(1000));
  const [visibleTypes, setVisibleTypes] = useState({ varmt: true, kallt: true, diskmaskin: true });
  const [showGoogleMap, setShowGoogleMap] = useState(true);

  const randomZoom = () => {
    const randomTicketIndex = Math.floor(Math.random() * tickets.length);
    const randomTicket = tickets[randomTicketIndex];
    setMapCenter({ lat: randomTicket.lat, lng: randomTicket.long });
    setZoomLevel(18);
  };

  const generateNewMarkers = (count) => {
    setTickets(Ticket.generateRandomTickets(count));
  };

  const toggleVisibility = (type) => {
    setVisibleTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };
  const toggleGoogleMap = () => {
    setShowGoogleMap(prev => !prev);
    // Reset map center to the initialCenter when hiding the Google Map
    if (showGoogleMap) {
      setMapCenter(initialCenter);
      setZoomLevel(8); // Optionally reset zoom level to default
    }
  };
  const visibleTickets = tickets.filter(ticket => visibleTypes[ticket.type]);

  const buttonStyles = { position: 'absolute', zIndex: 1000, right: '10px' };
  // Calculate top positions for buttons dynamically to avoid overlap
  const initialTop = 10; // Starting top position in pixels
  const buttonHeight = 40; // Approximate height of each button in pixels, adjust as needed
  const spacing = 10; // Space between buttons in pixels
  
  // Generate offsets for each button dynamically
  const buttonOffsets = Array.from({length: 4 + Object.keys(visibleTypes).length + 1}, (_, index) => `${initialTop + index * (buttonHeight + spacing)}px`);

  return (
    <div className="App">
      <button onClick={randomZoom} style={{ ...buttonStyles, top: buttonOffsets[0] }}>
        Random Zoom
      </button>
      <button onClick={() => generateNewMarkers(1000)} style={{ ...buttonStyles, top: buttonOffsets[1] }}>
        Generate 1,000 Tickets
      </button>
      <button onClick={() => generateNewMarkers(10000)} style={{ ...buttonStyles, top: buttonOffsets[2] }}>
        Generate 10,000 Tickets
      </button>
      <button onClick={() => generateNewMarkers(100000)} style={{ ...buttonStyles, top: buttonOffsets[3] }}>
        Generate 100,000 Tickets
      </button>
      {Object.keys(visibleTypes).map((type, index) => (
        <button
          key={type}
          onClick={() => toggleVisibility(type)}
          style={{ ...buttonStyles, top: buttonOffsets[4 + index], backgroundColor: visibleTypes[type] ? 'green' : 'red' }}
        >
          Toggle {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
      <button
        onClick={() => toggleGoogleMap(prev => !prev)}
        style={{ ...buttonStyles, top: buttonOffsets[buttonOffsets.length - 1], backgroundColor: showGoogleMap ? 'green' : 'red' }}
      >
        {showGoogleMap ? 'Hide Google Map' : 'Show Google Map'}
      </button>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: showGoogleMap ? 1 : 0 }}>
          {showGoogleMap && <MapComponentGoogle center={mapCenter} zoom={zoomLevel} tickets={visibleTickets} />}
        </div>
        <div style={{ flex: 1 }}>
          <MapComponent center={mapCenter} zoom={zoomLevel} tickets={visibleTickets} fullScreen={showGoogleMap} />
        </div>
      </div>
    </div>
  );
}

export default App;
