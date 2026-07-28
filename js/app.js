/* =====================================================
   AI DISASTER COMMAND CENTER
   APP.JS - VERSION 5
===================================================== */

/* =====================================================
   DASHBOARD INITIALIZATION
===================================================== */

function initializeDashboard() {

    console.log("🚀 Initializing AI Disaster Command Center...");

    const initializeSafe = (name, fn) => {

        if (typeof fn !== "function") {
            console.warn(`⚠ ${name} is unavailable.`);
            return;
        }

        try {
            fn();
        }
        catch (error) {
            console.error(`❌ ${name} failed:`, error);
        }

    };

    initializeSafe("initializeMap", initializeMap);
    initializeSafe("initializeClock", initializeClock);
    initializeSafe("initializeAPI", initializeAPI);
    initializeSafe("animateCards", animateCards);
    initializeSafe("animateCounters", animateCounters);
    initializeSafe("initializeCharts", initializeCharts);
    initializeSafe("initializeAlerts", initializeAlerts);
    initializeSafe("initializeAI", initializeAI);
    initializeSafe("initializeLiveData", initializeLiveData);
    initializeSafe("updateMissionStatus", updateMissionStatus);

    console.log("✅ Dashboard initialized successfully.");

}

/* =====================================================
   APPLICATION START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

    if (typeof initializeReport === "function") {
        try {
            initializeReport();
        }
        catch (error) {
            console.error("❌ Report initialization failed:", error);
        }
    }

});