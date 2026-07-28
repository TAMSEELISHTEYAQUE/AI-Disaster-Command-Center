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

    fetchWeatherData();

    fetchEarthquakeData();

}

/* =====================================================
   FETCH WEATHER DATA
===================================================== */

async function fetchWeatherData() {

    try {

        const city = "Barpeta";

        const response = await fetch(
            `${API.WEATHER_BASE_URL}/weather?q=${city},IN&appid=${API.WEATHER_API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("🌦 Weather Data:", data);

        IncidentDatabase.weather.city = data.name;
        IncidentDatabase.weather.temperature = data.main.temp;
        IncidentDatabase.weather.feelsLike = data.main.feels_like;
        IncidentDatabase.weather.humidity = data.main.humidity;
        IncidentDatabase.weather.pressure = data.main.pressure;
        IncidentDatabase.weather.windSpeed = data.wind.speed;
        IncidentDatabase.weather.visibility = data.visibility;
        IncidentDatabase.weather.condition = data.weather[0].main;
        IncidentDatabase.weather.icon = data.weather[0].icon;
        IncidentDatabase.weather.lastUpdated = formatDateTime();
        updateWeatherWidget();
        console.log("✅ Weather database updated.");

    } catch (error) {

        console.error("❌ Weather API Failed:", error);

    }

}

/* =====================================================
   FETCH LIVE EARTHQUAKES
===================================================== */

async function fetchEarthquakeData() {

    try {

        const response = await fetch(
            "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );

        if (!response.ok) {
            throw new Error("USGS API Error");
        }

        const data = await response.json();

        const latest = data.features[0];

        IncidentDatabase.earthquakes.magnitude =
            latest.properties.mag;

        IncidentDatabase.earthquakes.latitude =
            latest.geometry.coordinates[1];

        IncidentDatabase.earthquakes.longitude =
            latest.geometry.coordinates[0];

        IncidentDatabase.earthquakes.depth =
            latest.geometry.coordinates[2];

        IncidentDatabase.earthquakes.lastUpdated =
            formatDateTime();

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

    if (!weatherText) return;

    weatherText.textContent =
        `${Math.round(IncidentDatabase.weather.temperature)}°C ${IncidentDatabase.weather.city}`;

}