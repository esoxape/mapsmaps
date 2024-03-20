import React from 'react';
import { GoogleMap, LoadScript, MarkerF, MarkerClusterer } from '@react-google-maps/api';

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

const clustererOptions = {
  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  gridSize: 60,
  minimumClusterSize: 3,
};

function getMarkerIcon(id) {
  switch(id) {
    case 'varmt':
      return { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' };
    case 'kallt':
      return { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' };
    case 'diskmaskin':
      return { url: 'http://maps.gstatic.com/mapfiles/ms2/micons/mechanic.png' };
    default:
      return { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }
  }
}

const MapComponentGoogle = ({ center, zoom, tickets }) => { // Use props including tickets
  
  const markerData = tickets.map(ticket => ({ // Generate marker data from tickets prop
    id: ticket.type,
    position: { lat: ticket.lat, lng: ticket.long },
  }));

  const onMarkerClick = (id) => {
    alert(`Marker ID: ${id}`);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDI4l8aY10yK7YQTyj-hLx5MZH9wSVecXc">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={{ styles: mapStyles }}
      >
        <MarkerClusterer options={clustererOptions}>
          {(clusterer) => (
            markerData.map((marker, index) => (
              <MarkerF
                key={index}
                position={marker.position}
                icon={getMarkerIcon(marker.id)}
                clusterer={clusterer}
                onClick={() => onMarkerClick(marker.id)}
              />
            ))
          )}
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponentGoogle;