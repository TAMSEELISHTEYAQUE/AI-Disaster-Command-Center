/* =====================================================
   AI DISASTER COMMAND CENTER
   LIVEDATA.JS
=====================================================*/
function refreshDashboard() {

    if (typeof updateWeatherWidget === "function") {
        updateWeatherWidget();
    }

    if (typeof updateEarthquakeWidget === "function") {
        updateEarthquakeWidget();
    }

    if (typeof updateAssessmentPanel === "function") {
        updateAssessmentPanel();
    }

    if (typeof updateAIRecommendations === "function") {
        updateAIRecommendations();
    }

    if (typeof updateAISummary === "function") {
        updateAISummary();
    }

    if (typeof updateResourceAllocation === "function") {
        updateResourceAllocation();
    }

    if (typeof updateAlerts === "function") {
        updateAlerts();
    }

    if (typeof updateNavigationCenter === "function") {
        updateNavigationCenter();
    }

    if (typeof updateReportsDashboard === "function") {
        updateReportsDashboard();
    }

    if (typeof renderDashboardCharts === "function") {
        renderDashboardCharts();
    }

}

function initializeLiveData() {

    console.log("✅ Live Data Engine Started");

    refreshDashboard();

    setInterval(refreshDashboard, 5000);

console.log("Dashboard Auto Refresh : 5 Seconds");

}
/* =====================================================
   SYSTEM HEALTH
===================================================== */

function updateSystemHealth() {

    if (!IncidentDatabase.systemHealth) return;

    IncidentDatabase.systemHealth.lastRefresh =
        formatDateTime();

}
/* =====================================================
   LIVE ENGINE
===================================================== */

function forceRefresh() {

    refreshDashboard();

}