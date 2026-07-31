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

    const { latitude, longitude } = IncidentDatabase.currentIncident.location;

    window.map = window.L.map(mapContainer).setView([latitude, longitude], 5);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18
    }).addTo(window.map);

    const disasterLocations = [
        {
            name: "National Control Centre",
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

    disasterLocations.unshift({
        name: IncidentDatabase.currentIncident.location.state,
        coords: [
            IncidentDatabase.currentIncident.location.latitude,
            IncidentDatabase.currentIncident.location.longitude
        ],
        info: `🚨 ${IncidentDatabase.currentIncident.disasterType} (${IncidentDatabase.currentIncident.severity})`
    });

    const markers = [];
const rescueMarkers = [];
const hospitalMarkers = [];
const shelterMarkers = [];
const vehicleMarkers = [];
    const layerGroup = window.L.layerGroup();
    const toggleContainer = document.getElementById("mapLayerToggles");

    if (toggleContainer) {
        toggleContainer.innerHTML = "";
    }

    const disasterLayers = [];
    const rescueLayers = [];
const hospitalLayers = [];
const shelterLayers = [];
const vehicleLayers = [];
    const hazards = IncidentDatabase.disasters || [];

    hazards.forEach((disaster, index) => {
        const meta = typeof getDisasterMeta === "function" ? getDisasterMeta(disaster.type) : { icon: "🚨", color: "#00D4FF" };
        const coords = disaster.coordinates || [latitude, longitude];
        const marker = window.L.marker(coords, {
            icon: window.L.divIcon({
                html: `<div class="hazard-marker-wrapper"><div class="hazard-marker" style="background:${meta.color};">${meta.icon}</div></div>`,
                className: "",
                iconSize: [30, 30]
            })
        }).bindPopup(`<b>${disaster.type}</b><br>${disaster.location}<br>${disaster.severity}<br>${disaster.recommendation}`);

        const circle = window.L.circle(coords, {
            radius: disaster.radius || 15000,
            color: meta.color,
            fillColor: meta.color,
            fillOpacity: 0.16,
            weight: 1.2
        });

        const layer = window.L.layerGroup([circle, marker]);
        layer.addTo(window.map);
        layerGroup.addLayer(layer);
        disasterLayers.push(layer);
        markers.push(marker);

        if (toggleContainer) {
            const label = document.createElement("label");
            label.innerHTML = `<input type="checkbox" checked data-layer-index="${index}"> ${disaster.type}`;
            toggleContainer.appendChild(label);
        }
    });

    if (toggleContainer) {
        toggleContainer.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.addEventListener("change", (event) => {
                const index = Number(event.target.getAttribute("data-layer-index"));
                const layer = disasterLayers[index];
                if (layer) {
                    if (event.target.checked) {
                        layer.addTo(window.map);
                    }
                    else {
                        layer.remove();
                    }
                }
            });
        });
    }

    disasterLocations.forEach((location) => {
        const marker = window.L.marker(location.coords)
            .addTo(window.map)
            .bindPopup(`<b>${location.name}</b><br>${location.info}`);
        markers.push(marker);
    });

    if (markers.length > 0) {
        const group = window.L.featureGroup(markers);
        window.map.fitBounds(group.getBounds(), { padding: [40, 40] });
    }
    else {
        window.map.setView([latitude, longitude], 5);
    }

}
/* =====================================================
   NAVIGATION CENTER
===================================================== */

function updateNavigationCenter() {

    if (!window.map) return;

    const navigation = IncidentDatabase.navigation;

    const destination = document.getElementById("navigationDestination");
    const distance = document.getElementById("navigationDistance");
    const eta = document.getElementById("navigationETA");
    const blocked = document.getElementById("blockedRoads");

    if (destination) {
        destination.textContent = navigation.destination || "--";
    }

    if (distance) {
        distance.textContent = navigation.distance || "--";
    }

    if (eta) {
        eta.textContent = navigation.eta || "--";
    }

    if (blocked) {
        blocked.textContent = navigation.blockedRoads ?? "--";
    }

}
/* =====================================================
   NAVIGATION CENTER
===================================================== */

function updateNavigationCenter() {

    if (!window.map) return;

    const navigation = IncidentDatabase.navigation;

    const destination = document.getElementById("navigationDestination");
    const distance = document.getElementById("navigationDistance");
    const eta = document.getElementById("navigationETA");
    const blocked = document.getElementById("blockedRoads");

    if (destination) {
        destination.textContent = navigation.destination || "--";
    }

    if (distance) {
        distance.textContent = navigation.distance || "--";
    }

    if (eta) {
        eta.textContent = navigation.eta || "--";
    }

    if (blocked) {
        blocked.textContent = navigation.blockedRoads ?? "--";
    }

}
