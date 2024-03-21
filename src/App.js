import React, { useState } from 'react';
import './App.css';
import MapComponent from './MapComponent.tsx';
import MapComponentGoogle from './MapComponentGoogle.tsx';
import { Ticket } from './Ticket.tsx'; // Ensure this path is correct

function App() {
  const [mapCenter, setMapCenter] = useState({ lat: 57.0, lng: 14.5 });
  const [zoomLevel, setZoomLevel] = useState(8);
  const [tickets, setTickets] = useState(Ticket.generateRandomTickets(1000)); // State to hold tickets
  const [visibleTypes, setVisibleTypes] = useState({ varmt: true, kallt: true, diskmaskin: true });
  const randomZoom = () => {
    const randomTicketIndex = Math.floor(Math.random() * tickets.length);
    const randomTicket = tickets[randomTicketIndex];
    setMapCenter({ lat: randomTicket.lat, lng: randomTicket.long });
    setZoomLevel(18); // Adjust zoom level as desired
  };

  const generateNewMarkers = (count) => {
    setTickets(Ticket.generateRandomTickets(count)); // Update tickets state with specified count
  };
  const toggleVisibility = (type) => {
    setVisibleTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };
  const visibleTickets = tickets.filter(ticket => visibleTypes[ticket.type]);
  return (
    <div className="App">
      <button onClick={randomZoom} style={{ position: 'absolute', zIndex: 1000, top: '10px', right: '10px' }}>
        Random Zoom
      </button>
      <button onClick={() => generateNewMarkers(1000)} style={{ position: 'absolute', zIndex: 1000, top: '50px', right: '10px' }}>
        Generate 1,000 Tickets
      </button>
      <button onClick={() => generateNewMarkers(10000)} style={{ position: 'absolute', zIndex: 1000, top: '90px', right: '10px' }}>
        Generate 10,000 Tickets
      </button>
      <button onClick={() => generateNewMarkers(100000)} style={{ position: 'absolute', zIndex: 1000, top: '130px', right: '10px' }}>
        Generate 100,000 Tickets
      </button>
      <button onClick={() => toggleVisibility('varmt')}>Toggle Varmt</button>
      <button onClick={() => toggleVisibility('kallt')}>Toggle Kallt</button>
      <button onClick={() => toggleVisibility('diskmaskin')}>Toggle Diskmaskin</button>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <MapComponent center={mapCenter} zoom={zoomLevel} tickets={visibleTickets}  />
        </div>
        <div style={{ flex: 1 }}>
          <MapComponentGoogle center={mapCenter} zoom={zoomLevel} tickets={visibleTickets} />
        </div>
      </div>
    </div>
  );
}

export default App;
