/* =====================================================
   AI DISASTER COMMAND CENTER
   APP.JS - VERSION 4
===================================================== */

/* =====================================================
   GLOBAL VARIABLES
===================================================== */



/* =====================================================
   DASHBOARD INITIALIZATION
===================================================== */
function initializeDashboard(){

    initializeMap();

    initializeClock();

    initializeAPI();

    animateCards();

    animateCounters();

    initializeCharts();

    initializeAlerts();

    initializeAI();

}

/* =====================================================
   APPLICATION START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

    document
        .getElementById("generateReport")
        .addEventListener("click", generateIncidentReport);

});
