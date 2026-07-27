/* =====================================================
   AI DISASTER COMMAND CENTER
   AI.JS
===================================================== */

/* =====================================================
   AI DATA
===================================================== */

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

/* =====================================================
   AI FUNCTIONS
===================================================== */

function updateAIRecommendations() {

    updateList("aiRecommendations", aiSuggestions);

}

function updateAISummary() {

    const summary = document.getElementById("aiSummary");

    if (!summary) return;

    const random = randomItem(aiSummaries);

    summary.innerHTML = `<p>${random.replace(/\n/g,"<br>")}</p>`;

}