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

        console.log("✅ Weather database updated.");

    } catch (error) {

        console.error("❌ Weather API Failed:", error);

    }

}