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
function updateAISummary(){

    const summary = document.getElementById("aiSummary");

    if(!summary) return;

    const random =
        aiSummaries[Math.floor(Math.random()*aiSummaries.length)];

    summary.innerHTML = `<p>${random.replace(/\n/g,"<br>")}</p>`;

}

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});

document.getElementById("generateReport").addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI Disaster Incident Report",20,20);

    doc.setFontSize(12);

    doc.text("Generated: " + new Date().toLocaleString(),20,35);

    doc.text("Satellites Online: 12",20,55);

    doc.text("Flood Alerts: 28",20,65);

    doc.text("Wildfire Alerts: 9",20,75);

    doc.text("AI Accuracy: 98%",20,85);

    doc.text("Recommended Action:",20,105);

    doc.text("- Deploy Rescue Teams",30,120);

    doc.text("- Increase Satellite Monitoring",30,130);

    doc.text("- Notify Local Authorities",30,140);

    doc.save("AI_Disaster_Report.pdf");

});
