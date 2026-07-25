/* =====================================================
   AI DISASTER COMMAND CENTER
   APP.JS - VERSION 2
===================================================== */

/* ===========================
   CREATE MAP
=========================== */

const map = L.map('map').setView([22.9734, 78.6569], 5);

/* ===========================
   ADD MAP TILES
=========================== */

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18,
}).addTo(map);

/* ===========================
   INDIA MARKER
=========================== */

L.marker([28.6139, 77.2090])
    .addTo(map)
    .bindPopup("<b>New Delhi</b><br>National Disaster Control Centre")
    .openPopup();

/* ===========================
   LIVE CLOCK
=========================== */

function updateClock() {

    const now = new Date();

    const options = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };

    document.getElementById("clock").innerHTML =
        "🕒 " + now.toLocaleString("en-IN", options);

}

// Update immediately
updateClock();

// Update every second
setInterval(updateClock, 1000);