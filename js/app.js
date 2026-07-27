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
   LIVE ALERT SYSTEM
===================================================== */

const disasterAlerts = [

    "🔴 HIGH | Assam | Flood Warning | 2 min ago",

    "🟠 MEDIUM | Odisha | Cyclone Watch | 5 min ago",

    "🟡 MEDIUM | Uttarakhand | Wildfire Risk | 8 min ago",

    "🔵 LOW | Kerala | Heavy Rain | 12 min ago",

    "🔥 HIGH | Himachal | Forest Fire | 16 min ago",

    "🌍 LOW | Gujarat | Earthquake Watch | 20 min ago"

];

const aiSuggestions = [

    "🤖 Deploy Rescue Team Alpha | Confidence 98%",

    "📡 Increase Satellite Monitoring | Confidence 96%",

    "🏥 Prepare Emergency Shelters | Confidence 94%",

    "🚁 Dispatch Medical Helicopter | Confidence 97%",

    "📢 Issue Public Warning | Confidence 95%",

    "📍 Activate Emergency Command | Confidence 99%"

    
];
const aiSummaries = [

`🟢 Flood probability in Assam increased by 18%.
🛰 AI recommends deploying Rescue Team Alpha.
📍 Confidence: 98.4%`,

`🟠 Cyclone movement detected near Odisha.
🚁 Prepare 4 emergency helicopters.
📍 Confidence: 97.1%`,

`🔴 Wildfire hotspot detected in Uttarakhand.
🚒 Dispatch Fire Response Unit immediately.
📍 Confidence: 96.8%`,

`🌧 Heavy rainfall expected in Kerala.
🏥 Activate temporary medical camps.
📍 Confidence: 98.9%`,

`🌍 Minor seismic activity detected in Gujarat.
⚠ Continue satellite monitoring.
📍 Confidence: 95.7%`

];

function updateList(listId, items, displayCount = 4) {

    const list = document.getElementById(listId);

    if (!list) return;

    list.innerHTML = "";

    const shuffled = [...items].sort(() => Math.random() - 0.5);

    shuffled.slice(0, displayCount).forEach(item => {

        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);

    });

}

function updateAlerts() {

    updateList("alertsList", disasterAlerts);

}

function updateAIRecommendations() {

    updateList("aiRecommendations", aiSuggestions);


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
