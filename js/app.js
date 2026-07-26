/* =====================================================
   AI DISASTER COMMAND CENTER
   APP.JS - VERSION 4
===================================================== */

/* =====================================================
   GLOBAL VARIABLES
===================================================== */

const map = L.map("map").setView([22.9734, 78.6569], 5);

/* =====================================================
   DASHBOARD INITIALIZATION
===================================================== */

function initializeDashboard() {

    // Initialize all dashboard modules
    initializeMap();
    initializeClock();
    animateCards();
    animateCounters();

    // Load data immediately
    updateAlerts();
    updateAIRecommendations();

    // Auto Refresh
    setInterval(updateAlerts, 5000);
    setInterval(updateAIRecommendations, 7000);

}
/* =====================================================
   MAP SYSTEM
===================================================== */

function initializeMap() {

    /* ---------- Map Tiles ---------- */

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18
    }).addTo(map);

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

    const markers = [];

    disasterLocations.forEach(location => {

        const marker = L.marker(location.coords)
            .addTo(map)
            .bindPopup(`
                <b>${location.name}</b><br>
                ${location.info}
            `);

        markers.push(marker);

    });

    const group = L.featureGroup(markers);

    map.fitBounds(group.getBounds(), {
        padding: [40, 40]
    });

}
/* =====================================================
   LIVE CLOCK
===================================================== */

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    const options = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };

    clock.textContent = "🕒 " + now.toLocaleString("en-IN", options);

}

function initializeClock() {

    updateClock();

    setInterval(updateClock, 1000);

}
/* =====================================================
   KPI COUNTER ANIMATION
===================================================== */

function animateValue(elementId, start, end, duration, suffix = "") {

    const element = document.getElementById(elementId);

    if (!element) return;

    const increment = end >= start ? 1 : -1;

    const range = Math.abs(end - start);

    const stepTime = Math.max(Math.floor(duration / (range || 1)), 20);

    let current = start;

    element.textContent = current + suffix;

    const timer = setInterval(() => {

        current += increment;

        element.textContent = current + suffix;

        if (current === end) {

            clearInterval(timer);

        }

    }, stepTime);

}

function animateCounters() {

    animateValue("satelliteCount", 0, 12, 1200);

    animateValue("floodCount", 0, 28, 1400);

    animateValue("fireCount", 0, 9, 1000);

    animateValue("accuracyCount", 0, 98, 1500, "%");

}

/* =====================================================
   CARD ENTRANCE ANIMATION
===================================================== */

function animateCards() {

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

        setTimeout(() => {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 150);

    });

}
/* =====================================================
   LIVE ALERT SYSTEM
===================================================== */

const disasterAlerts = [
    "🔴 Flood Warning — Assam",
    "🟠 Cyclone Watch — Odisha",
    "🟡 Wildfire Risk — Uttarakhand",
    "🔵 Heavy Rain — Kerala",
    "🔥 Forest Fire — Himachal Pradesh",
    "🌍 Earthquake Watch — Gujarat"
];

const aiSuggestions = [
    "✅ Deploy Rescue Team Alpha",
    "📢 Issue Early Warning Notification",
    "🛰 Increase Satellite Monitoring",
    "🏥 Prepare Emergency Shelters",
    "🚁 Dispatch Medical Helicopter",
    "📡 Activate Emergency Communication"
];

function updateList(listId, items, displayCount = 4) {

    const list = document.getElementById(listId);

    if (!list) return;

    list.innerHTML = "";

    const shuffled = [...items].sort(() => Math.random() - 0.5);

    shuffled.slice(0, displayCount).forEach(item => {

        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);

    });

}

function updateAlerts() {

    updateList("alertsList", disasterAlerts);

}

function updateAIRecommendations() {

    updateList("aiRecommendations", aiSuggestions);

}

/* =====================================================
   APPLICATION START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});