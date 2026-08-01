/* =====================================================
   AI DISASTER COMMAND CENTER
   AI.JS
===================================================== */

const supportedDisasterCatalog = [
    "Flood",
    "Flash Flood",
    "Cyclone",
    "Hurricane",
    "Tornado",
    "Heavy Rain",
    "Heatwave",
    "Wildfire",
    "Forest Fire",
    "Earthquake",
    "Landslide",
    "Tsunami",
    "Volcanic Activity",
    "Air Pollution",
    "Drought",
    "Disease Outbreak",
    "Chemical Leak",
    "Nuclear Accident",
    "Oil Spill",
    "Building Collapse"
];
/* =====================================================
   AI MODELS
===================================================== */

const AI_MODELS = {

    classification: "ADC Classification Engine",

    prediction: "ADC Prediction Engine",

    recommendation: "ADC Resource Optimizer",

    navigation: "ADC Route Intelligence",

    report: "ADC Report Generator"

};
function getSupportedDisasters() {
    return supportedDisasterCatalog;
}

function getDisasterMeta(type) {

    const disasterType = String(type || "Flood").toLowerCase();

    if (disasterType.includes("cyclone") || disasterType.includes("hurricane")) {
        return { icon: "🌀", color: "#8B5CF6", response: "Deploy evacuation boats" };
    }

    if (disasterType.includes("wildfire") || disasterType.includes("forest")) {
        return { icon: "🔥", color: "#EF4444", response: "Deploy fire suppression units" };
    }

    if (disasterType.includes("earthquake") || disasterType.includes("tsunami") || disasterType.includes("volcanic")) {
        return { icon: "🌋", color: "#F59E0B", response: "Deploy drone survey" };
    }

    if (disasterType.includes("flood") || disasterType.includes("rain")) {
        return { icon: "🌊", color: "#3B82F6", response: "Dispatch rescue boats" };
    }

    if (disasterType.includes("heat") || disasterType.includes("drought")) {
        return { icon: "☀️", color: "#F97316", response: "Open cooling centres" };
    }

    if (disasterType.includes("disease") || disasterType.includes("chemical") || disasterType.includes("nuclear") || disasterType.includes("oil") || disasterType.includes("collapse") || disasterType.includes("pollution")) {
        return { icon: "⚠️", color: "#10B981", response: "Activate containment and public health response" };
    }

    return { icon: "🚨", color: "#00D4FF", response: "Dispatch response teams" };

}

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

function calculateRiskForDisaster(disaster) {

    const severityScore = getSeverityScore(disaster && disaster.severity);
    const weatherFactor = getWeatherFactor();
    const disasterType = String(disaster && disaster.type || "Flood").toLowerCase();
    const populationFactor = Math.min(1, (disaster && disaster.populationAffected || 0) / 2000000);

    let disasterFactor = 10;

    if (disasterType.includes("cyclone") || disasterType.includes("hurricane")) disasterFactor = 16;
    else if (disasterType.includes("wildfire") || disasterType.includes("forest")) disasterFactor = 17;
    else if (disasterType.includes("earthquake") || disasterType.includes("tsunami") || disasterType.includes("volcanic")) disasterFactor = 18;
    else if (disasterType.includes("flood") || disasterType.includes("rain")) disasterFactor = 14;
    else if (disasterType.includes("heat") || disasterType.includes("drought")) disasterFactor = 11;
    else if (disasterType.includes("disease") || disasterType.includes("chemical") || disasterType.includes("nuclear") || disasterType.includes("oil") || disasterType.includes("collapse") || disasterType.includes("pollution")) disasterFactor = 15;

    const earthquakeMagnitude = IncidentDatabase.earthquakes && typeof IncidentDatabase.earthquakes.magnitude === "number"
        ? IncidentDatabase.earthquakes.magnitude
        : 0;

    const score = Math.round(
        Math.min(100, severityScore * 12 + weatherFactor * 8 + disasterFactor + Math.min(20, earthquakeMagnitude * 4) + populationFactor * 10)
    );

    return score;

}

function calculateRisk() {

    return calculateRiskForDisaster(IncidentDatabase.currentIncident || {});

}

function getResourceDeployment() {

    const incidents = IncidentDatabase.disasters || [];
    const activeCount = Math.max(1, incidents.length);
    const topRisk = Math.max(0, ...incidents.map((item) => calculateRiskForDisaster(item)));
    const severityScore = Math.max(1, Math.round(topRisk / 20));

    return [
        { name: "NDRF", count: 6 + activeCount + severityScore },
        { name: "Army", count: 4 + Math.round(activeCount / 2) },
        { name: "Police", count: 8 + activeCount * 2 },
        { name: "Fire", count: 4 + activeCount },
        { name: "Medical", count: 6 + activeCount + severityScore },
        { name: "Helicopters", count: 2 + Math.round(activeCount / 2) },
        { name: "Boats", count: activeCount > 2 ? 4 + Math.round(activeCount / 2) : 2 },
        { name: "Drones", count: 4 + activeCount },
        { name: "Relief Camps", count: 5 + activeCount + severityScore }
    ];

}

function populationFactor() {

    const incident = IncidentDatabase.currentIncident || {};
    return Math.min(4, Math.round((incident.populationAffected || 0) / 300000));

}

function calculatePriorityForDisaster(disaster) {

    const risk = calculateRiskForDisaster(disaster);

    if (risk >= 85) return "Critical";
    if (risk >= 65) return "High";
    if (risk >= 45) return "Moderate";

    return "Low";

}

function calculatePriority() {

    return calculatePriorityForDisaster(IncidentDatabase.currentIncident || {});

}

function estimateDamageForDisaster(disaster) {

    const risk = calculateRiskForDisaster(disaster);
    const severityScore = getSeverityScore(disaster && disaster.severity);
    const damage = Math.round(Math.min(95, risk * 0.75 + severityScore * 4));

    return `${damage}%`;

}

function estimateDamage() {

    return estimateDamageForDisaster(IncidentDatabase.currentIncident || {});

}

function estimatePopulationImpactForDisaster(disaster) {

    const population = disaster && disaster.populationAffected;

    if (typeof population === "number" && population > 0) {
        return `${population.toLocaleString()} people`;
    }

    return "No Data";

}

function estimatePopulationImpact() {

    return estimatePopulationImpactForDisaster(IncidentDatabase.currentIncident || {});

}

function generateRecommendationForDisaster(disaster) {

    const incident = disaster || {};
    const severityScore = getSeverityScore(incident.severity);
    const weather = IncidentDatabase.weather || {};
    const earthquakeMagnitude = IncidentDatabase.earthquakes && typeof IncidentDatabase.earthquakes.magnitude === "number"
        ? IncidentDatabase.earthquakes.magnitude
        : 0;
    const population = incident.populationAffected || 0;
    const damage = estimateDamageForDisaster(incident);
    const recommendations = [];
    const meta = getDisasterMeta(incident.type);

    recommendations.push(`${meta.response || "Dispatch response teams"} for ${incident.location || "the affected zone"}`);

    if (severityScore >= 4) {
        recommendations.push("Issue Red Alert and evacuate vulnerable districts");
    }

    if (earthquakeMagnitude > 0 || String(incident.type || "").toLowerCase().includes("earthquake") || String(incident.type || "").toLowerCase().includes("tsunami")) {
        recommendations.push("Deploy Drone Survey for structural assessment");
    }

    if (weather.condition && weather.condition.toLowerCase().includes("rain") || String(incident.type || "").toLowerCase().includes("flood") || String(incident.type || "").toLowerCase().includes("cyclone")) {
        recommendations.push("Open Relief Camp and activate rescue boats");
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

function generateRecommendations() {

    return generateRecommendationForDisaster(IncidentDatabase.currentIncident || {});

}

function updateAIRecommendations() {

    const list = document.getElementById("dashboardAiRecommendations");

    if (!list) return;

    const recommendations = generateRecommendations();

    list.innerHTML = "";

    recommendations.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });

}

function getAIRouteRecommendations() {
    const incident = IncidentDatabase.currentIncident || {};
    const navigation = IncidentDatabase.navigation || {};
    const risk = calculateRiskForDisaster(incident);
    const baseRoutes = [
        { route: "Primary Rescue Corridor", eta: navigation.eta || "22 min", score: 96, status: "Safe" },
        { route: "Northern Diversion Route", eta: navigation.eta ? `${Math.max(18, Number.parseInt(navigation.eta, 10) + 6)} min` : "28 min", score: 82, status: "Clear" },
        { route: "Medical Relief Spur", eta: navigation.eta ? `${Math.max(21, Number.parseInt(navigation.eta, 10) + 10)} min` : "31 min", score: 74, status: "Moderate" },
        { route: "Shelter Access Loop", eta: navigation.eta ? `${Math.max(27, Number.parseInt(navigation.eta, 10) + 14)} min` : "36 min", score: 68, status: "Alert" }
    ];

    return baseRoutes.map((entry) => ({
        ...entry,
        score: entry.score - (risk > 85 ? 5 : risk > 65 ? 2 : 0),
        rationale: entry.status === "Safe" ? "Low congestion, clear access, good shelter proximity" : entry.status === "Clear" ? "Diversion available but slightly longer transit" : entry.status === "Moderate" ? "Requires escort and traffic monitoring" : "Use only if primary route is blocked"
    }));
}

function updateAIRouteRecommendations() {
    const list = document.getElementById("aiRouteRecommendations");
    if (!list) return;

    const routes = getAIRouteRecommendations();
    list.innerHTML = "";

    routes.forEach((route) => {
        const li = document.createElement("li");
        li.className = "ai-decision-item";
        li.innerHTML = `
            <div class="decision-main">
                <strong>${route.route}</strong>
                <span>${route.status}</span>
            </div>
            <div class="decision-meta">ETA ${route.eta} • AI score ${route.score}/100</div>
            <small>${route.rationale}</small>
        `;
        list.appendChild(li);
    });
}

function getAIResourceMatrix() {
    const resources = getResourceDeployment();
    return resources.map((resource) => ({
        name: resource.name,
        count: resource.count,
        status: resource.count >= 8 ? "Ready" : resource.count >= 5 ? "Staged" : "Limited"
    }));
}

function updateAIResourceAllocation() {
    const list = document.getElementById("aiResourceAllocation");
    if (!list) return;

    const resources = getAIResourceMatrix();
    list.innerHTML = "";

    resources.forEach((resource) => {
        const li = document.createElement("li");
        li.className = "ai-decision-item";
        li.innerHTML = `
            <div class="decision-main">
                <strong>${resource.name}</strong>
                <span>${resource.status}</span>
            </div>
            <div class="decision-meta">${resource.count} units allocated</div>
        `;
        list.appendChild(li);
    });
}

function updateResourceAllocation() {

    const list = document.getElementById("dashboardResourceAllocation");

    if (!list) return;

    const resources = getResourceDeployment();

    list.innerHTML = "";

    resources.forEach((resource) => {
        const li = document.createElement("li");
        li.textContent = `${resource.name}: ${resource.count} units`;
        list.appendChild(li);
    });

    updateAIResourceAllocation();

}

function analyzeDisasters() {

    const disasters = IncidentDatabase.disasters || [];

    return disasters.map((disaster) => {
        const riskScore = calculateRiskForDisaster(disaster);
        const priority = calculatePriorityForDisaster(disaster);
        const expectedDamage = estimateDamageForDisaster(disaster);
        const affectedPopulation = estimatePopulationImpactForDisaster(disaster);
        const recoveryTime = `${Math.max(6, Math.round(14 - riskScore / 12))} hrs`;
        const recommendation = generateRecommendationForDisaster(disaster)[0] || "Monitor";

        return {
            ...disaster,
            riskScore,
            priority,
            expectedDamage,
            affectedPopulation,
            recoveryTime,
            recommendation
        };
    });

}

function getNationalThreatLevel() {

    const analyses = analyzeDisasters();
    const highestRisk = analyses.length ? analyses.reduce((a, b) => a.riskScore > b.riskScore ? a : b) : null;

    if (!highestRisk) return "Stable";
    if (highestRisk.riskScore >= 85) return "Critical";
    if (highestRisk.riskScore >= 65) return "High";
    if (highestRisk.riskScore >= 45) return "Moderate";

    return "Low";

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
    updateAIRouteRecommendations();
    updateAIResourceAllocation();
console.log(
    "AI Engine:",
    AI_MODELS.classification
);
    setInterval(updateAssessmentPanel, 8000);
    setInterval(updateAIRecommendations, 8000);
    setInterval(updateAISummary, 8000);
    setInterval(updateResourceAllocation, 8000);
    setInterval(updateAIRouteRecommendations, 8000);
    setInterval(updateAIResourceAllocation, 8000);

}
/* =====================================================
   FUTURE AI MODULES
===================================================== */

function explainDecision() {

    return "AI recommendation generated from disaster severity, weather, population exposure and resource availability.";

}

function predictMissionSuccess() {

    return "87%";

}

function estimateRecoveryTimeline() {

    return "48 Hours";

}

function generateEvacuationPlan() {

    return [

        "Identify high-risk zones",

        "Deploy transport resources",

        "Open temporary shelters",

        "Monitor evacuation progress"

    ];

}