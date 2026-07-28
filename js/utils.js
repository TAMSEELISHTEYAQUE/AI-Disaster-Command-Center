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

function generateIncidentId() {

    return "ADC-" + Date.now();

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

    list.innerHTML = "";

    const shuffled = [...items].sort(() => Math.random() - 0.5);

    shuffled.slice(0, displayCount).forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        list.appendChild(li);

    });

}