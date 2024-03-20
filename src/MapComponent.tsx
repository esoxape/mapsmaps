import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const createColoredMarkerSvg = (color) => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${color}'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z'/%3E%3C/svg%3E`;
};

const customIcons = {
  varmt: new L.Icon({
    iconUrl: createColoredMarkerSvg('%23ff4436'), // Red
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  kallt: new L.Icon({
    iconUrl: createColoredMarkerSvg('%23007bff'), // Blue
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  diskmaskin: new L.Icon({
    iconUrl: createColoredMarkerSvg('%23000000'), // Black
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
};
const UpdateView = ({ center, zoom }) => {
    const map = useMap();
  
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
  
    return null;
  };
  
  const Markers = ({ tickets, customIcons }) => {
    const map = useMap();
  
    useEffect(() => {
      const markerClusterGroup = L.markerClusterGroup();
  
      tickets.forEach(ticket => {
        const marker = L.marker([ticket.lat, ticket.long], { icon: customIcons[ticket.type] || L.Icon.Default })
          .bindPopup(`Type: ${ticket.type}`);
        markerClusterGroup.addLayer(marker);
      });
  
      map.addLayer(markerClusterGroup);
  
      return () => map.removeLayer(markerClusterGroup);
    }, [tickets, map, customIcons]);
  
    return null;
  };
  
  const MapComponent = ({ center, zoom, tickets }) => {
    return (
      <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '50vw' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <UpdateView center={center} zoom={zoom} />
        <Markers tickets={tickets} customIcons={customIcons} />
      </MapContainer>
    );
  };
  
  export default MapComponent;