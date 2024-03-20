import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent'; // Your Leaflet map component
import MapComponentGoogle from './MapComponentGoogle'; // Your Google Maps component
import { Ticket } from './Ticket.tsx'; // Ensure this path is correct

const MapsApp = () => {
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(null);

  // Function to generate a random ticket index for zooming
  const zoomInOnRandomPin = () => {
    const newIndex = Math.floor(Math.random() * Ticket.tickets.length);
    setSelectedTicketIndex(newIndex);
  };

  useEffect(() => {
    Ticket.generateRandomTickets(10000); // Generate tickets on initial load
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MapComponent selectedTicketIndex={selectedTicketIndex} />
      <MapComponentGoogle selectedTicketIndex={selectedTicketIndex} />
      <button onClick={zoomInOnRandomPin} style={{ position: 'absolute', top: '90px', left: '10px', zIndex: 1000 }}>
        Zoom In On Pins
      </button>
    </div>
  );
};

export default MapsApp;
