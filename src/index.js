import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your custom CSS
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
// MarkerCluster CSS
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
