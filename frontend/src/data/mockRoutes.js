// src/data/mockRoutes.js

// Leaflet uses [Latitude, Longitude] format
export const fastestRoute = [
  [22.5820, 88.4150], // Start: Salt Lake
  [22.5750, 88.4000], // EM Bypass (High Traffic)
  [22.5600, 88.3800], // Connector
  [22.5550, 88.3600], // Park Circus Area
  [22.5520, 88.3520]  // End: Park Street
];

export const healthiestRoute = [
  [22.5820, 88.4150], // Start: Salt Lake
  [22.5800, 88.3900], // Inner residential roads (Trees)
  [22.5700, 88.3700], // Avoid main highway
  [22.5600, 88.3550], // Maidan Area (Heavy Green Cover)
  [22.5520, 88.3520]  // End: Park Street
];