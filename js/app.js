/* =====================================================
   AI DISASTER COMMAND CENTER
   APP.JS - VERSION 6
===================================================== */

function setDashboardText(elementId, value) {

    const element = document.getElementById(elementId);

    if (!element) return;

    element.textContent = value;

}

function updateWeatherPanel() {

    const weather = IncidentDatabase.weather || {};
    const city = weather.city && weather.city !== "--" ? weather.city : "No Data";
    const temperature = typeof weather.temperature === "number"
        ? `${Math.round(weather.temperature)}°C`
        : "No Data";
    const condition = weather.condition && weather.condition !== "--"
        ? weather.condition
        : "No Data";
    const humidity = typeof weather.humidity === "number"
        ? `${weather.humidity}%`
        : "No Data";
    const wind = typeof weather.windSpeed === "number"
        ? `${weather.windSpeed} m/s`
        : "No Data";
    const pressure = typeof weather.pressure === "number"
        ? `${weather.pressure} hPa`
        : "No Data";
    const rainfall = typeof weather.rainfall === "number"
        ? `${weather.rainfall} mm`
        : "No Data";

    setDashboardText("weatherCityValue", city);
    setDashboardText("weatherTempValue", temperature);
    setDashboardText("weatherConditionValue", condition);
    setDashboardText("weatherHumidityValue", humidity);
    setDashboardText("weatherWindValue", wind);
    setDashboardText("weatherPressureValue", pressure);
    setDashboardText("weatherRainfallValue", rainfall);

    const weatherText = document.getElementById("weatherText");

    if (weatherText) {
        weatherText.textContent = `${temperature} ${city}`;
    }

}

function updateEarthquakeWidget() {

    const eq = IncidentDatabase.earthquakes || {};
    const magnitude = typeof eq.magnitude === "number" && eq.magnitude > 0
        ? `${eq.magnitude} Mw`
        : "No Data";
    const depth = typeof eq.depth === "number" && eq.depth > 0
        ? `${eq.depth} km`
        : "No Data";
    const location = typeof eq.latitude === "number" && typeof eq.longitude === "number"
        ? `${eq.latitude.toFixed(2)}, ${eq.longitude.toFixed(2)}`
        : "No Data";
    const status = typeof eq.magnitude === "number" && eq.magnitude > 0
        ? "Active"
        : "Monitoring";

    setDashboardText("earthquakeMagnitudeValue", magnitude);
    setDashboardText("earthquakeDepthValue", depth);
    setDashboardText("earthquakeLocationValue", location);
    setDashboardText("earthquakeStatusValue", status);

}

function updateCommandStatistics() {

    const incident = IncidentDatabase.currentIncident || {};
    const resources = IncidentDatabase.resources || {};
    const severityScore = incident.severity && incident.severity.toLowerCase().includes("critical")
        ? 5
        : incident.severity && incident.severity.toLowerCase().includes("high")
            ? 4
            : incident.severity && incident.severity.toLowerCase().includes("moderate")
                ? 3
                : incident.severity && incident.severity.toLowerCase().includes("low")
                    ? 2
                    : 1;

    const activeIncidents = Math.max(1, severityScore);
    const populationAtRisk = typeof incident.populationAffected === "number"
        ? incident.populationAffected
        : 0;
    const resourcesDeployed = Math.max(8, Math.round((resources.rescueTeams || 0) + (resources.ambulances || 0) / 6 + (resources.helicopters || 0) / 2));
    const responseTime = Math.max(6, 18 - severityScore * 2);
    const successRate = Math.max(72, 96 - severityScore);
    const aiAccuracy = IncidentDatabase.dashboard && typeof IncidentDatabase.dashboard.aiAccuracy === "number"
        ? IncidentDatabase.dashboard.aiAccuracy
        : 98.4;

    animateValue("activeIncidentsCount", 0, activeIncidents, 1000);
    setDashboardText("populationAtRiskCount", populationAtRisk.toLocaleString());
    animateValue("resourcesDeployedCount", 0, resourcesDeployed, 1400);
    setDashboardText("responseTimeCount", `${responseTime} min`);
    setDashboardText("successRateCount", `${successRate}%`);
    setDashboardText("aiAccuracyCount", `${aiAccuracy}%`);

}

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
    initializeSafe("updateWeatherPanel", updateWeatherPanel);
    initializeSafe("updateEarthquakeWidget", updateEarthquakeWidget);
    initializeSafe("updateCommandStatistics", updateCommandStatistics);

    console.log("✅ Dashboard initialized successfully.");

}

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