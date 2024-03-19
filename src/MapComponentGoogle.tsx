import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, MarkerClusterer, Marker, MarkerClustererF } from '@react-google-maps/api';
import { Ticket } from './Ticket.tsx'; // Ensure this path is correct

const containerStyle = {
  width: '50vw',
  height: '100vh'
};

const center = {
  lat: 57.0,
  lng: 14.5
};

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

// Adjust options for clustering behavior
const clustererOptions = {
  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  gridSize: 50, // Adjust grid size for clustering (default is 60)
  minimumClusterSize: 5, // Minimum number of markers to form a cluster (default is 2)
};

const markerData = Ticket.tickets.map(ticket => ({
  id: ticket.type,
  position: { lat: ticket.lat, lng: ticket.long }
}));

function MapComponentGoogle() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDI4l8aY10yK7YQTyj-hLx5MZH9wSVecXc"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        options={{ styles: mapStyles }}
      >
        <MarkerClusterer options={clustererOptions}>
          {(clusterer) => (
            <>
              {markerData.map((marker, index) => (
                <MarkerF
                  key={index} // Changed to index for uniqueness
                  position={marker.position}
                  clusterer={clusterer}
                />
              ))}
            </>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponentGoogle;
