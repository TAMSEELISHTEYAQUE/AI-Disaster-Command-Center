/* =====================================================
   AI DISASTER COMMAND CENTER
   API.JS - VERSION 2
===================================================== */

const API = {

    WEATHER_API_KEY: "a02b3861f04590cda768b35d6f7e74dc",

    WEATHER_BASE_URL: "https://api.openweathermap.org/data/2.5"

};

/* =====================================================
   INITIALIZE API
===================================================== */

function initializeAPI() {

    console.log("✅ API Module Loaded");

    if (typeof IncidentDatabase === "undefined") {
        console.warn("⚠ Incident database not available.");
        return;
    }

    if (typeof fetchWeatherData === "function") {
        fetchWeatherData();
    }
    else {
        console.warn("⚠ Weather data handler is unavailable.");
    }

    if (typeof fetchEarthquakeData === "function") {
        fetchEarthquakeData();
    }

}



/* =====================================================
   FETCH LIVE EARTHQUAKES
===================================================== */

async function fetchEarthquakeData() {

    try {

        if (typeof IncidentDatabase === "undefined") {
            throw new Error("Incident database is unavailable.");
        }

        const response = await fetch(
            "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );

        if (!response.ok) {
            throw new Error("USGS API Error");
        }

        const data = await response.json();
        const latest = data.features && data.features[0];

        if (!latest || !latest.properties || !latest.geometry || !latest.geometry.coordinates) {
            throw new Error("Earthquake data is incomplete.");
        }

        IncidentDatabase.earthquakes.magnitude = latest.properties.mag || 0;
        IncidentDatabase.earthquakes.latitude = latest.geometry.coordinates[1] || 0;
        IncidentDatabase.earthquakes.longitude = latest.geometry.coordinates[0] || 0;
        IncidentDatabase.earthquakes.depth = latest.geometry.coordinates[2] || 0;
        IncidentDatabase.earthquakes.lastUpdated = formatDateTime();

        console.log("🌍 Earthquake Updated", IncidentDatabase.earthquakes);

    }

    catch(error){

        console.error(error);

    }

}

/* =====================================================
   UPDATE WEATHER WIDGET
===================================================== */

function updateWeatherWidget() {

    const weatherText = document.getElementById("weatherText");

    if (!weatherText || typeof IncidentDatabase === "undefined") return;

    const safeTemperature = Number.isFinite(IncidentDatabase.weather.temperature)
        ? Math.round(IncidentDatabase.weather.temperature)
        : "--";
    const safeCity = IncidentDatabase.weather.city || "Unknown";

    weatherText.textContent = `${safeTemperature}°C ${safeCity}`;

}