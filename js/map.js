/* =====================================================
   AI DISASTER COMMAND CENTER
   MAP.JS
===================================================== */

/* =====================================================
   MAP SYSTEM
===================================================== */

function initializeMap() {

    const mapContainer = document.getElementById("map");

    if (!window.L || !mapContainer) {
        console.warn("⚠ Leaflet map is unavailable.");
        return;
    }

    /* ---------- Current Incident Location ---------- */

    const { latitude, longitude } = IncidentDatabase.currentIncident.location;

    /* ---------- Create Map ---------- */

    window.map = window.L.map(mapContainer).setView([latitude, longitude], 5);

    /* ---------- OpenStreetMap Tiles ---------- */

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18
    }).addTo(window.map);

    /* ---------- Disaster Monitoring Locations ---------- */

    const disasterLocations = [

        {
            name: "New Delhi",
            coords: [28.6139, 77.2090],
            info: "🛰 National Disaster Control Centre"
        },

        {
            name: "Assam",
            coords: [26.2006, 92.9376],
            info: "🌊 Flood Warning"
        },

        {
            name: "Odisha",
            coords: [20.9517, 85.0985],
            info: "🌀 Cyclone Watch"
        },

        {
            name: "Uttarakhand",
            coords: [30.0668, 79.0193],
            info: "🔥 Wildfire Risk"
        },

        {
            name: "Kerala",
            coords: [10.8505, 76.2711],
            info: "🌧 Heavy Rain Alert"
        },

        {
            name: "Hyderabad",
            coords: [17.3850, 78.4867],
            info: "🤖 AI Monitoring Centre"
        }

    ];

    /* ---------- Current Active Incident ---------- */

    disasterLocations.unshift({

        name: IncidentDatabase.currentIncident.location.state,

        coords: [
            IncidentDatabase.currentIncident.location.latitude,
            IncidentDatabase.currentIncident.location.longitude
        ],

        info: `🚨 ${IncidentDatabase.currentIncident.disasterType} (${IncidentDatabase.currentIncident.severity})`

    });

    /* ---------- Live Earthquake (Optional) ---------- */

    if (
        IncidentDatabase.earthquakes &&
        IncidentDatabase.earthquakes.magnitude > 0
    ) {

        disasterLocations.push({

            name: "Live Earthquake",

            coords: [
                IncidentDatabase.earthquakes.latitude,
                IncidentDatabase.earthquakes.longitude
            ],

            info: `
                🌍 Magnitude: ${IncidentDatabase.earthquakes.magnitude}<br>
                📏 Depth: ${IncidentDatabase.earthquakes.depth} km
            `

        });

    }

    /* ---------- Add Markers ---------- */

    const markers = [];

    disasterLocations.forEach(location => {

        const marker = window.L.marker(location.coords)
            .addTo(window.map)
            .bindPopup(`
                <b>${location.name}</b><br>
                ${location.info}
            `);

        markers.push(marker);

    });

    /* ---------- Auto Zoom ---------- */

    if (markers.length > 0) {
        const group = window.L.featureGroup(markers);

        window.map.fitBounds(group.getBounds(), {
            padding: [40, 40]
        });
    }
    else {
        window.map.setView([latitude, longitude], 5);
    }

}
