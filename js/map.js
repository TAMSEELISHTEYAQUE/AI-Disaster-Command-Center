/* =====================================================
   AI DISASTER COMMAND CENTER
   MAP.JS
===================================================== */

/* =====================================================
   MAP SYSTEM
===================================================== */

function addLayerToggle(container, label, key, checked = true) {
    const item = document.createElement("label");
    item.innerHTML = `<input type="checkbox" data-layer-key="${key}" ${checked ? "checked" : ""}> ${label}`;
    container.appendChild(item);
    return item;
}

function initializeMap() {

    const mapContainer = document.getElementById("map");

    if (!window.L || !mapContainer) {
        console.warn("⚠ Leaflet map is unavailable.");
        return;
    }

    const location = IncidentDatabase.currentIncident && IncidentDatabase.currentIncident.location
        ? IncidentDatabase.currentIncident.location
        : { latitude: 26.20, longitude: 91.00 };

    const centerLat = Number(location.latitude) || 26.20;
    const centerLng = Number(location.longitude) || 91.00;

    window.map = window.L.map(mapContainer).setView([centerLat, centerLng], 5);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18
    }).addTo(window.map);

    const disasterLocations = [
        { name: "National Control Centre", coords: [28.6139, 77.2090], info: "🛰 National Disaster Control Centre" },
        { name: "Assam", coords: [26.2006, 92.9376], info: "🌊 Flood Warning" },
        { name: "Odisha", coords: [20.9517, 85.0985], info: "🌀 Cyclone Watch" },
        { name: "Uttarakhand", coords: [30.0668, 79.0193], info: "🔥 Wildfire Risk" },
        { name: "Kerala", coords: [10.8505, 76.2711], info: "🌧 Heavy Rain Alert" },
        { name: "Hyderabad", coords: [17.3850, 78.4867], info: "🤖 AI Monitoring Centre" }
    ];

    disasterLocations.unshift({
        name: IncidentDatabase.currentIncident.location.state,
        coords: [centerLat, centerLng],
        info: `🚨 ${IncidentDatabase.currentIncident.disasterType} (${IncidentDatabase.currentIncident.severity})`
    });

    const markers = [];
    const layerGroup = window.L.layerGroup();
    const toggleContainer = document.getElementById("mapLayerToggles");
    const overlayGroups = {};

    if (toggleContainer) {
        toggleContainer.innerHTML = "";
    }

    const hazardLayers = [];
    const hazards = IncidentDatabase.disasters || [];

    hazards.forEach((disaster, index) => {
        const meta = typeof getDisasterMeta === "function" ? getDisasterMeta(disaster.type) : { icon: "🚨", color: "#00D4FF" };
        const coords = disaster.coordinates || [centerLat, centerLng];
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
        hazardLayers.push(layer);
        overlayGroups[`hazard-${index}`] = layer;
        markers.push(marker);

        if (toggleContainer) {
            addLayerToggle(toggleContainer, `${disaster.type} alert`, `hazard-${index}`, true);
        }
    });

    const hospitalLayer = window.L.layerGroup();
    const shelterLayer = window.L.layerGroup();
    const rescueLayer = window.L.layerGroup();
    const dangerLayer = window.L.layerGroup();
    const trafficLayer = window.L.layerGroup();

    const hospitalPoints = [
        [26.17, 91.76], [27.98, 94.63], [20.46, 85.87], [30.33, 78.06]
    ];
    const shelterPoints = [
        [26.32, 91.40], [21.12, 86.28], [30.59, 78.55]
    ];
    const rescuePoints = [
        [26.24, 91.14], [20.76, 85.62], [30.12, 78.83]
    ];
    const dangerPoints = [
        [26.33, 91.10], [25.93, 90.86], [30.14, 78.71]
    ];
    const trafficPoints = [
        [26.19, 91.32], [20.95, 85.31], [30.28, 78.12]
    ];

    hospitalPoints.forEach((point) => {
        const hospitalMarker = window.L.marker(point).addTo(window.map).bindPopup("Hospital facility");
        hospitalLayer.addLayer(hospitalMarker);
        markers.push(hospitalMarker);
    });

    shelterPoints.forEach((point) => {
        const shelterMarker = window.L.marker(point, {
            icon: window.L.divIcon({ html: "<div style='background:#22c55e;color:white;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;'>S</div>", className: "", iconSize: [18, 18] })
        }).addTo(window.map).bindPopup("Shelter facility");
        shelterLayer.addLayer(shelterMarker);
        markers.push(shelterMarker);
    });

    rescuePoints.forEach((point) => {
        const rescueMarker = window.L.marker(point, {
            icon: window.L.divIcon({ html: "<div style='background:#f59e0b;color:white;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;'>R</div>", className: "", iconSize: [18, 18] })
        }).addTo(window.map).bindPopup("Rescue unit");
        rescueLayer.addLayer(rescueMarker);
        markers.push(rescueMarker);
    });

    dangerPoints.forEach((point) => {
        const dangerCircle = window.L.circle(point, {
            radius: 12000,
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.16,
            weight: 1
        }).addTo(window.map).bindPopup("Danger zone");
        dangerLayer.addLayer(dangerCircle);
    });

    trafficPoints.forEach((point) => {
        const trafficCircle = window.L.circleMarker(point, {
            radius: 7,
            color: "#60a5fa",
            fillColor: "#60a5fa",
            fillOpacity: 0.8
        }).addTo(window.map).bindPopup("Traffic congestion");
        trafficLayer.addLayer(trafficCircle);
    });

    overlayGroups.hospitals = hospitalLayer;
    overlayGroups.shelters = shelterLayer;
    overlayGroups.rescue = rescueLayer;
    overlayGroups.danger = dangerLayer;
    overlayGroups.traffic = trafficLayer;

    if (toggleContainer) {
        addLayerToggle(toggleContainer, "Hospitals", "hospitals", true);
        addLayerToggle(toggleContainer, "Shelters", "shelters", true);
        addLayerToggle(toggleContainer, "Rescue Teams", "rescue", true);
        addLayerToggle(toggleContainer, "Traffic", "traffic", true);
        addLayerToggle(toggleContainer, "Danger Zones", "danger", true);
    }

    if (toggleContainer) {
        toggleContainer.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.addEventListener("change", (event) => {
                const key = event.target.getAttribute("data-layer-key");
                const layer = overlayGroups[key];
                if (!layer) return;
                if (event.target.checked) {
                    layer.addTo(window.map);
                }
                else {
                    layer.remove();
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
        window.map.setView([centerLat, centerLng], 5);
    }

}
