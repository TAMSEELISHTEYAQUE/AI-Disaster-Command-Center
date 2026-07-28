/* =====================================================
   AI DISASTER COMMAND CENTER
   APP.JS - VERSION 5
===================================================== */

/* =====================================================
   DASHBOARD INITIALIZATION
===================================================== */

function initializeDashboard() {

    console.log("🚀 Initializing AI Disaster Command Center...");

    // Core Modules
    initializeMap();
    initializeClock();
    initializeAPI();

    // UI Animations
    animateCards();
    animateCounters();

    // Dashboard Modules
    initializeCharts();
    initializeAlerts();
    initializeAI();

    console.log("✅ Dashboard initialized successfully.");

}

/* =====================================================
   APPLICATION START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();
    initializeReport();

});