/* =====================================================
   AI DISASTER COMMAND CENTER
   APP.JS - VERSION 1
===================================================== */

/* ===========================
   CREATE MAP
=========================== */

// Create the map inside <div id="map">
const map = L.map('map').setView([22.9734, 78.6569], 5);

/* ===========================
   ADD MAP TILES
=========================== */

// Load OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    attribution: '&copy; OpenStreetMap contributors',

    maxZoom: 18,

}).addTo(map);

/* ===========================
   INDIA MARKER
=========================== */

// Example marker
L.marker([28.6139, 77.2090])
.addTo(map)
.bindPopup("<b>New Delhi</b><br>National Disaster Control Centre")
.openPopup();