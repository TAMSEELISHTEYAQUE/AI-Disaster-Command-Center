/* =====================================================
   AI DISASTER COMMAND CENTER
   LIVEDATA.JS
=====================================================*/

function refreshDashboard() {

    updateWeatherWidget();

    // Future
    // updateEarthquakeWidget();
    // updateFloodWidget();
    // updateFireWidget();
    // updateRiskWidget();

}

function initializeLiveData() {

    console.log("✅ Live Data Engine Started");

    refreshDashboard();

    setInterval(refreshDashboard,5000);

}