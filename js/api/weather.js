console.log("🌦 Weather Module Loaded");

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

        IncidentDatabase.weather.city = data.name || IncidentDatabase.weather.city || "Barpeta";
        IncidentDatabase.weather.temperature = typeof data.main.temp === "number" ? data.main.temp : IncidentDatabase.weather.temperature;
        IncidentDatabase.weather.feelsLike = typeof data.main.feels_like === "number" ? data.main.feels_like : IncidentDatabase.weather.feelsLike;
        IncidentDatabase.weather.humidity = typeof data.main.humidity === "number" ? data.main.humidity : IncidentDatabase.weather.humidity;
        IncidentDatabase.weather.pressure = typeof data.main.pressure === "number" ? data.main.pressure : IncidentDatabase.weather.pressure;
        IncidentDatabase.weather.windSpeed = typeof data.wind.speed === "number" ? data.wind.speed : IncidentDatabase.weather.windSpeed;
        IncidentDatabase.weather.visibility = typeof data.visibility === "number" ? data.visibility : IncidentDatabase.weather.visibility;
        IncidentDatabase.weather.condition = data.weather && data.weather[0] ? data.weather[0].main : IncidentDatabase.weather.condition;
        IncidentDatabase.weather.icon = data.weather && data.weather[0] ? data.weather[0].icon : IncidentDatabase.weather.icon;
        IncidentDatabase.weather.lastUpdated = formatDateTime();

        if (typeof refreshDashboard === "function") {
            refreshDashboard();
        }
        else {
            updateWeatherWidget();
        }
        console.log("✅ Weather database updated.");

    } catch (error) {

        console.error("❌ Weather API Failed:", error);

        if (typeof refreshDashboard === "function") {
            refreshDashboard();
        }

    }

}

/* =====================================================
   UPDATE WEATHER WIDGET
===================================================== */

function updateWeatherWidget() {

    const weatherText = document.getElementById("weatherText");

    if (!weatherText) return;

    const temperature = typeof IncidentDatabase.weather.temperature === "number"
        ? `${Math.round(IncidentDatabase.weather.temperature)}°C`
        : "—";
    const city = IncidentDatabase.weather.city || "Barpeta";

    weatherText.textContent = `${temperature} • ${city}`;

}