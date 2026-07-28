/* =====================================================
   AI DISASTER COMMAND CENTER
   AI.JS
===================================================== */

function getSeverityScore(severityValue) {

    if (!severityValue) return 1;

    const value = String(severityValue).toLowerCase();

    if (value.includes("critical") || value.includes("catastrophic")) return 5;
    if (value.includes("high") || value.includes("severe")) return 4;
    if (value.includes("moderate") || value.includes("medium")) return 3;
    if (value.includes("low")) return 2;

    return 1;

}

function getWeatherFactor() {

    const weather = IncidentDatabase.weather || {};
    const condition = String(weather.condition || "").toLowerCase();

    if (condition.includes("storm") || condition.includes("rain")) return 1.2;
    if (condition.includes("cloud")) return 0.8;
    if (condition.includes("clear")) return 0.5;

    return 1;

}

function calculateRisk() {

    const incident = IncidentDatabase.currentIncident || {};
    const severityScore = getSeverityScore(incident.severity);
    const weatherFactor = getWeatherFactor();
    const earthquakeMagnitude = IncidentDatabase.earthquakes && typeof IncidentDatabase.earthquakes.magnitude === "number"
        ? IncidentDatabase.earthquakes.magnitude
        : 0;
    const populationFactor = Math.min(1, (incident.populationAffected || 0) / 2000000);

    const score = Math.round(
        Math.min(100, severityScore * 14 + weatherFactor * 8 + Math.min(20, earthquakeMagnitude * 4) + populationFactor * 10)
    );

    return score;

}

function getResourceDeployment() {

    const incident = IncidentDatabase.currentIncident || {};
    const severityScore = getSeverityScore(incident.severity);
    const weatherFactor = getWeatherFactor();
    const damageFactor = Math.max(1, Math.round(calculateRisk() / 20));

    return [
        { name: "NDRF", count: 4 + severityScore + Math.round(weatherFactor) },
        { name: "Police", count: 8 + severityScore * 2 },
        { name: "Fire", count: 3 + severityScore },
        { name: "Ambulance", count: 6 + severityScore * 2 },
        { name: "Medical Teams", count: 5 + severityScore + damageFactor },
        { name: "Helicopters", count: 2 + Math.round(severityScore / 2) },
        { name: "Relief Camps", count: 4 + severityScore + Math.round(populationFactor() * 2) }
    ];

}

function populationFactor() {

    const incident = IncidentDatabase.currentIncident || {};
    return Math.min(4, Math.round((incident.populationAffected || 0) / 300000));

}

function calculatePriority() {

    const risk = calculateRisk();

    if (risk >= 85) return "Critical";
    if (risk >= 65) return "High";
    if (risk >= 45) return "Moderate";

    return "Low";

}

function estimateDamage() {

    const risk = calculateRisk();
    const severityScore = getSeverityScore(IncidentDatabase.currentIncident && IncidentDatabase.currentIncident.severity);
    const damage = Math.round(Math.min(95, risk * 0.75 + severityScore * 4));

    return `${damage}%`;

}

function estimatePopulationImpact() {

    const population = IncidentDatabase.currentIncident && IncidentDatabase.currentIncident.populationAffected;

    if (typeof population === "number" && population > 0) {
        return `${population.toLocaleString()} people`;
    }

    return "No Data";

}

function generateRecommendations() {

    const incident = IncidentDatabase.currentIncident || {};
    const severityScore = getSeverityScore(incident.severity);
    const weather = IncidentDatabase.weather || {};
    const earthquakeMagnitude = IncidentDatabase.earthquakes && typeof IncidentDatabase.earthquakes.magnitude === "number"
        ? IncidentDatabase.earthquakes.magnitude
        : 0;
    const population = incident.populationAffected || 0;
    const damage = estimateDamage();
    const recommendations = [];

    recommendations.push(`Dispatch NDRF Team Alpha to ${incident.location && incident.location.state ? incident.location.state : "the affected zone"}`);

    if (severityScore >= 4) {
        recommendations.push("Issue Red Alert and evacuate vulnerable districts");
    }

    if (earthquakeMagnitude > 0) {
        recommendations.push("Deploy Drone Survey for structural assessment");
    }

    if (weather.condition && weather.condition.toLowerCase().includes("rain")) {
        recommendations.push("Open Relief Camp and activate water supply units");
    }

    if (population > 500000) {
        recommendations.push("Open Relief Camp at staging points near the impact zone");
    }

    if (severityScore >= 3) {
        recommendations.push("Close Highway access corridors for safety");
    }

    if (damage !== "No Data") {
        recommendations.push(`Airlift Medical Teams for ${damage} infrastructure impact`);
    }

    recommendations.push("Activate mobile hospital support for triage operations");
    recommendations.push("Issue public safety advisories to affected districts");

    if (recommendations.length > 8) {
        return recommendations.slice(0, 8);
    }

    return recommendations;

}

function updateAIRecommendations() {

    const list = document.getElementById("aiRecommendations");

    if (!list) return;

    const recommendations = generateRecommendations();

    list.innerHTML = "";

    recommendations.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });

}

function updateResourceAllocation() {

    const list = document.getElementById("resourceAllocation");

    if (!list) return;

    const resources = getResourceDeployment();

    list.innerHTML = "";

    resources.forEach((resource) => {
        const li = document.createElement("li");
        li.textContent = `${resource.name}: ${resource.count} units`;
        list.appendChild(li);
    });

}

function updateAISummary() {

    const summary = document.getElementById("aiSummary");

    if (!summary) return;

    const incident = IncidentDatabase.currentIncident || {};
    const risk = calculateRisk();
    const priority = calculatePriority();
    const weatherCondition = IncidentDatabase.weather && IncidentDatabase.weather.condition && IncidentDatabase.weather.condition !== "--"
        ? IncidentDatabase.weather.condition
        : "No Data";
    const earthquakeMagnitude = IncidentDatabase.earthquakes && typeof IncidentDatabase.earthquakes.magnitude === "number" && IncidentDatabase.earthquakes.magnitude > 0
        ? `${IncidentDatabase.earthquakes.magnitude} Mw`
        : "No Data";

    summary.innerHTML = `<p>AI assessment for ${incident.incidentId || "current incident"} reports a ${risk}/100 risk index with ${priority} response priority. Weather is ${weatherCondition} and seismic activity is ${earthquakeMagnitude}.</p>`;

}

function updateAssessmentPanel() {

    const incident = IncidentDatabase.currentIncident || {};
    const risk = calculateRisk();
    const severity = incident.severity || "No Data";
    const populationImpact = estimatePopulationImpact();
    const damage = estimateDamage();
    const priority = calculatePriority();
    const confidence = typeof incident.aiConfidence === "number"
        ? `${Math.round(incident.aiConfidence)}%`
        : "No Data";

    const elements = {
        riskLevelValue: `${risk}/100`,
        disasterSeverityValue: severity,
        populationImpactValue: populationImpact,
        infrastructureDamageValue: damage,
        responsePriorityValue: priority,
        confidenceValue: confidence
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });

}

function initializeAI() {

    updateAssessmentPanel();
    updateAIRecommendations();
    updateAISummary();
    updateResourceAllocation();

    setInterval(updateAssessmentPanel, 8000);
    setInterval(updateAIRecommendations, 8000);
    setInterval(updateAISummary, 8000);
    setInterval(updateResourceAllocation, 8000);

}