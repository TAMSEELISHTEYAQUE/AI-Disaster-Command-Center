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