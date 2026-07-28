/* =====================================================
   AI DISASTER COMMAND CENTER
   API.JS
===================================================== */

/* =====================================================
   API CONFIGURATION
===================================================== */

const API = {

    WEATHER_API_KEY: "a02b3861f04590cda768b35d6f7e74dc",

    WEATHER_BASE_URL: "https://api.openweathermap.org/data/2.5"

};

/* =====================================================
   API STATUS
===================================================== */

function initializeAPI() {

    console.log("✅ API module loaded successfully");
    fetchWeatherData();

}
/* =====================================================
   FETCH WEATHER DATA
===================================================== */

async function fetchWeatherData() {

   const city = "Barpeta";

const url =
    `${API.WEATHER_BASE_URL}/weather?q=${city},IN&appid=${API.WEATHER_API_KEY}&units=metric`;

console.log(url);

}