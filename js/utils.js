/* =====================================================
   AI DISASTER COMMAND CENTER
   UTILS.JS
===================================================== */

/* =====================================================
   GENERAL HELPERS
===================================================== */

function getCurrentTime() {

    return new Date();

}

function formatDateTime() {

    return new Date().toLocaleString("en-IN");

}

function randomItem(array) {

    return array[Math.floor(Math.random() * array.length)];

}
function generateIncidentId(disasterType = "GEN") {

    const year = new Date().getFullYear();

    const typeMap = {
        Flood: "FLD",
        Earthquake: "EQK",
        Cyclone: "CYC",
        Tsunami: "TSU",
        Wildfire: "WLF",
        Landslide: "LND",
        Avalanche: "AVL",
        Heatwave: "HTW",
        Drought: "DRT",
        Industrial: "IND",
        Chemical: "CHM",
        Gas: "GAS",
        Building: "BLD",
        Fire: "FIR",
        Road: "RDA",
        Train: "TRN",
        Aviation: "AIR",
        Maritime: "MAR",
        Disease: "DIS",
        Terror: "TER",
        Stampede: "STM",
        Health: "HLT"
    };

    const prefix = typeMap[disasterType] || "GEN";

    const serial = String(
        Math.floor(Math.random() * 99999)
    ).padStart(5, "0");

    return `ADC-${year}-${prefix}-${serial}`;

}
/* =====================================================
   LIVE CLOCK
===================================================== */

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = getCurrentTime();

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

    const dashboard = IncidentDatabase.dashboard;

    animateValue(
        "satelliteCount",
        0,
        dashboard.satellites,
        1200
    );

    animateValue(
        "floodCount",
        0,
        dashboard.floodAlerts,
        1400
    );

    animateValue(
        "fireCount",
        0,
        dashboard.wildfireAlerts,
        1000
    );

    animateValue(
        "accuracyCount",
        0,
        Math.round(dashboard.aiAccuracy),
        1500,
        "%"
    );

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
   SHARED LIST RENDERER
===================================================== */

function updateList(listId, items, displayCount = 4) {

    const list = document.getElementById(listId);

    if (!list) return;

    const safeItems = Array.isArray(items) ? items : [];

    list.innerHTML = "";

    if (!safeItems.length) return;

    const shuffled = [...safeItems].sort(() => Math.random() - 0.5);

    shuffled.slice(0, displayCount).forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        list.appendChild(li);

    });

}
/* =====================================================
   DISASTER HELPERS
===================================================== */

function getSeverityColor(severity) {

    switch ((severity || "").toLowerCase()) {

        case "critical":
            return "#C62828";

        case "high":
            return "#EF4444";

        case "moderate":
            return "#D6A100";

        case "low":
            return "#1F8F4D";

        default:
            return "#00BFFF";

    }

}

function getDisasterMeta(type) {

    const disasters = {

        Flood:      { icon: "🌊", color: "#2196F3" },
        Earthquake: { icon: "🌍", color: "#795548" },
        Cyclone:    { icon: "🌀", color: "#8E24AA" },
        Tsunami:    { icon: "🌊", color: "#1565C0" },
        Wildfire:   { icon: "🔥", color: "#E53935" },
        Landslide:  { icon: "⛰", color: "#8D6E63" },
        Avalanche:  { icon: "❄", color: "#81D4FA" },
        Heatwave:   { icon: "☀", color: "#FB8C00" },
        Drought:    { icon: "🌾", color: "#A1887F" },
        Industrial: { icon: "🏭", color: "#607D8B" },
        Chemical:   { icon: "☣", color: "#9C27B0" },
        Disease:    { icon: "🦠", color: "#43A047" },
        Terror:     { icon: "🚨", color: "#D32F2F" }

    };

    return disasters[type] || {
        icon: "⚠",
        color: "#00BFFF"
    };

}