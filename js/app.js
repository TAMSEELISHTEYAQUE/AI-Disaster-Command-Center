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
    animateCards();
    animateCounters();

    initializeCharts();

    updateAlerts();
    updateAIRecommendations();

    updateAISummary();

setInterval(updateAISummary,6000);

    setInterval(updateAlerts,5000);
    setInterval(updateAIRecommendations,7000);

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
