/* =====================================================
   AI DISASTER COMMAND CENTER
   APP.JS - VERSION 3
===================================================== */

/* =====================================================
   GLOBAL VARIABLES
===================================================== */

const map = L.map("map").setView([22.9734, 78.6569], 5);

/* =====================================================
   DASHBOARD INITIALIZATION
===================================================== */
function initializeDashboard() {

    initializeMap();

    initializeClock();

    animateCards();

    animateCounters();

    updateAlerts();

    updateAIRecommendations();

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

        maxZoom: 18,

    }).addTo(map);

    /* ---------- Headquarters Marker ---------- */

    L.marker([28.6139, 77.2090])

        .addTo(map)

        .bindPopup("<b>New Delhi</b><br>National Disaster Control Centre")

        .openPopup();

}

/* =====================================================
   LIVE CLOCK
===================================================== */

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

    const clock = document.getElementById("clock");

    if (clock) {

        clock.textContent = "🕒 " + now.toLocaleString("en-IN", options);

    }

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

    const range = end - start;

    const stepTime = Math.max(Math.floor(duration / Math.abs(range || 1)), 20);

    let current = start;

    const timer = setInterval(() => {

        current++;

        element.textContent = current + suffix;

        if (current >= end) {

            element.textContent = end + suffix;

            clearInterval(timer);

        }

    }, stepTime);

}

function animateCounters() {

    animateValue("satelliteCount", 0, 12, 1200);

    animateValue("floodCount", 0, 28, 1400);

    animateValue("fireCount", 0, 9, 1000);

    const accuracy = document.getElementById("accuracyCount");

    if (accuracy) {

        setTimeout(() => {

            accuracy.textContent = "98.4%";

        }, 1200);

    }

}

/* =====================================================
   CARD ENTRANCE ANIMATION
===================================================== */

function animateCards() {

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        card.style.transition = "all 0.6s ease";

        setTimeout(() => {

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";

        }, index * 200);

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

function updateAlerts() {

    const alertsList = document.getElementById("alertsList");

    if (!alertsList) return;

    alertsList.innerHTML = "";

    const shuffled = [...disasterAlerts].sort(() => 0.5 - Math.random());

    shuffled.slice(0,4).forEach(alert => {

        const li = document.createElement("li");

        li.textContent = alert;

        alertsList.appendChild(li);

    });

}

function updateAIRecommendations() {

    const aiList = document.getElementById("aiRecommendations");

    if (!aiList) return;

    aiList.innerHTML = "";

    const shuffled = [...aiSuggestions].sort(() => 0.5 - Math.random());

    shuffled.slice(0,4).forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        aiList.appendChild(li);

    });

}
/* =====================================================
   APPLICATION START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});