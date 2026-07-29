/* =====================================================
   AI DISASTER COMMAND CENTER
   APP.JS - VERSION 6
===================================================== */

function setDashboardText(elementId, value) {

    const element = document.getElementById(elementId);

    if (!element) return;

    element.textContent = value;

}

function initializeMultiHazardData() {

    if (IncidentDatabase.disasters && IncidentDatabase.disasters.length) {
        const first = IncidentDatabase.disasters[0];
        IncidentDatabase.currentIncident = {
            ...IncidentDatabase.currentIncident,
            ...first,
            disasterType: first.type,
            severity: first.severity,
            populationAffected: first.populationAffected,
            location: {
                ...IncidentDatabase.currentIncident.location,
                state: first.state || first.location,
                latitude: first.coordinates ? first.coordinates[0] : IncidentDatabase.currentIncident.location.latitude,
                longitude: first.coordinates ? first.coordinates[1] : IncidentDatabase.currentIncident.location.longitude
            }
        };
        return;
    }

    const baseIncident = IncidentDatabase.currentIncident || {};

    IncidentDatabase.disasters = [
        {
            id: "DIS-001",
            type: baseIncident.disasterType || "Flood",
            location: baseIncident.location && baseIncident.location.state ? baseIncident.location.state : "Assam",
            state: baseIncident.location && baseIncident.location.state ? baseIncident.location.state : "Assam",
            severity: baseIncident.severity || "High",
            riskLevel: baseIncident.severity || "High",
            populationAffected: baseIncident.populationAffected || 1200000,
            status: "Active",
            recommendation: "Dispatch NDRF Team Alpha",
            lastUpdated: "Just now",
            coordinates: [baseIncident.location ? baseIncident.location.latitude : 26.20, baseIncident.location ? baseIncident.location.longitude : 91.00],
            radius: 22000,
            icon: "🌊",
            color: "#3B82F6"
        },
        {
            id: "DIS-002",
            type: "Cyclone",
            location: "Odisha",
            state: "Odisha",
            severity: "Severe",
            riskLevel: "High",
            populationAffected: 950000,
            status: "Warning",
            recommendation: "Open shelters and pre-position relief",
            lastUpdated: "5 min ago",
            coordinates: [20.9517, 85.0985],
            radius: 18000,
            icon: "🌀",
            color: "#8B5CF6"
        },
        {
            id: "DIS-003",
            type: "Wildfire",
            location: "Uttarakhand",
            state: "Uttarakhand",
            severity: "High",
            riskLevel: "High",
            populationAffected: 320000,
            status: "Monitor",
            recommendation: "Deploy fire suppression units",
            lastUpdated: "12 min ago",
            coordinates: [30.0668, 79.0193],
            radius: 15000,
            icon: "🔥",
            color: "#EF4444"
        },
        {
            id: "DIS-004",
            type: "Heatwave",
            location: "Rajasthan",
            state: "Rajasthan",
            severity: "Moderate",
            riskLevel: "Moderate",
            populationAffected: 780000,
            status: "Alert",
            recommendation: "Activate cooling centres",
            lastUpdated: "18 min ago",
            coordinates: [27.0238, 74.2179],
            radius: 14000,
            icon: "☀️",
            color: "#F59E0B"
        }
    ];

    IncidentDatabase.currentIncident = {
        ...IncidentDatabase.currentIncident,
        ...IncidentDatabase.disasters[0],
        disasterType: IncidentDatabase.disasters[0].type,
        severity: IncidentDatabase.disasters[0].severity,
        populationAffected: IncidentDatabase.disasters[0].populationAffected,
        location: {
            ...IncidentDatabase.currentIncident.location,
            state: IncidentDatabase.disasters[0].state || IncidentDatabase.disasters[0].location,
            latitude: IncidentDatabase.disasters[0].coordinates[0],
            longitude: IncidentDatabase.disasters[0].coordinates[1]
        }
    };

    IncidentDatabase.resources = {
        ...IncidentDatabase.resources,
        NDRF: 12,
        Army: 9,
        Police: 18,
        Fire: 10,
        Medical: 14,
        Helicopters: 8,
        Boats: 5,
        Drones: 12,
        ReliefCamps: 16
    };

}

function updateNationalOverview() {

    const disasters = IncidentDatabase.disasters || [];
    const analyses = typeof analyzeDisasters === "function" ? analyzeDisasters() : disasters;
    const highestRisk = analyses.length ? analyses.reduce((a, b) => a.riskScore > b.riskScore ? a : b) : null;
    const stateCount = disasters.reduce((summary, disaster) => {
        summary[disaster.state || disaster.location] = (summary[disaster.state || disaster.location] || 0) + 1;
        return summary;
    }, {});
    const mostAffectedState = Object.entries(stateCount).sort((a, b) => b[1] - a[1])[0] || "No Data";
    const populationAtRisk = disasters.reduce((total, disaster) => total + (disaster.populationAffected || 0), 0);
    const resourcesDeployed = disasters.reduce((total, disaster) => total + (disaster.resourcesDeployed || 0), 0) + (IncidentDatabase.resources ? (IncidentDatabase.resources.NDRF || 0) + (IncidentDatabase.resources.Army || 0) : 0);
    const threatLevel = typeof getNationalThreatLevel === "function" ? getNationalThreatLevel() : "Moderate";

    setDashboardText("nationalActiveDisasters", disasters.length);
    setDashboardText("nationalHighestRiskDisaster", highestRisk ? highestRisk.type : "No Data");
    setDashboardText("nationalMostAffectedState", mostAffectedState[0] || "No Data");
    setDashboardText("nationalPopulationAtRisk", populationAtRisk.toLocaleString());
    setDashboardText("nationalResourcesDeployed", resourcesDeployed);
    setDashboardText("nationalThreatLevel", threatLevel);

    const topKpi = document.getElementById("floodCount");
    if (topKpi) {
        topKpi.textContent = disasters.filter((item) => item.type && item.type.toLowerCase().includes("flood")).length;
    }

    const wildfireKpi = document.getElementById("fireCount");
    if (wildfireKpi) {
        wildfireKpi.textContent = disasters.filter((item) => item.type && (item.type.toLowerCase().includes("fire") || item.type.toLowerCase().includes("wildfire"))).length;
    }

}

function updateDisasterMonitorTable() {

    const tableBody = document.getElementById("disasterMonitorBody");

    if (!tableBody) return;

    const disasters = IncidentDatabase.disasters || [];

    tableBody.innerHTML = "";

    disasters.forEach((disaster) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${disaster.type || "Unknown"}</td>
            <td>${disaster.location || "No Data"}</td>
            <td>${disaster.severity || "No Data"}</td>
            <td>${disaster.riskLevel || "No Data"}</td>
            <td>${(disaster.populationAffected || 0).toLocaleString()}</td>
            <td>${disaster.status || "Monitor"}</td>
            <td>${disaster.recommendation || "Monitor"}</td>
            <td>${disaster.lastUpdated || "No Data"}</td>
        `;
        tableBody.appendChild(row);
    });

}

function updateWeatherPanel() {

    const weather = IncidentDatabase.weather || {};
    const city = weather.city && weather.city !== "--" ? weather.city : "No Data";
    const temperature = typeof weather.temperature === "number"
        ? `${Math.round(weather.temperature)}°C`
        : "No Data";
    const condition = weather.condition && weather.condition !== "--"
        ? weather.condition
        : "No Data";
    const humidity = typeof weather.humidity === "number"
        ? `${weather.humidity}%`
        : "No Data";
    const wind = typeof weather.windSpeed === "number"
        ? `${weather.windSpeed} m/s`
        : "No Data";
    const pressure = typeof weather.pressure === "number"
        ? `${weather.pressure} hPa`
        : "No Data";
    const rainfall = typeof weather.rainfall === "number"
        ? `${weather.rainfall} mm`
        : "No Data";

    setDashboardText("weatherCityValue", city);
    setDashboardText("weatherTempValue", temperature);
    setDashboardText("weatherConditionValue", condition);
    setDashboardText("weatherHumidityValue", humidity);
    setDashboardText("weatherWindValue", wind);
    setDashboardText("weatherPressureValue", pressure);
    setDashboardText("weatherRainfallValue", rainfall);

    const weatherText = document.getElementById("weatherText");

    if (weatherText) {
        weatherText.textContent = `${temperature} ${city}`;
    }

}

function updateEarthquakeWidget() {

    const eq = IncidentDatabase.earthquakes || {};
    const magnitude = typeof eq.magnitude === "number" && eq.magnitude > 0
        ? `${eq.magnitude} Mw`
        : "No Data";
    const depth = typeof eq.depth === "number" && eq.depth > 0
        ? `${eq.depth} km`
        : "No Data";
    const location = typeof eq.latitude === "number" && typeof eq.longitude === "number"
        ? `${eq.latitude.toFixed(2)}, ${eq.longitude.toFixed(2)}`
        : "No Data";
    const status = typeof eq.magnitude === "number" && eq.magnitude > 0
        ? "Active"
        : "Monitoring";

    setDashboardText("earthquakeMagnitudeValue", magnitude);
    setDashboardText("earthquakeDepthValue", depth);
    setDashboardText("earthquakeLocationValue", location);
    setDashboardText("earthquakeStatusValue", status);

}

function updateCommandStatistics() {

    const incident = IncidentDatabase.currentIncident || {};
    const resources = IncidentDatabase.resources || {};
    const severityScore = incident.severity && incident.severity.toLowerCase().includes("critical")
        ? 5
        : incident.severity && incident.severity.toLowerCase().includes("high")
            ? 4
            : incident.severity && incident.severity.toLowerCase().includes("moderate")
                ? 3
                : incident.severity && incident.severity.toLowerCase().includes("low")
                    ? 2
                    : 1;

    const activeIncidents = Math.max(1, severityScore);
    const populationAtRisk = typeof incident.populationAffected === "number"
        ? incident.populationAffected
        : 0;
    const resourcesDeployed = Math.max(8, Math.round((resources.rescueTeams || 0) + (resources.ambulances || 0) / 6 + (resources.helicopters || 0) / 2));
    const responseTime = Math.max(6, 18 - severityScore * 2);
    const successRate = Math.max(72, 96 - severityScore);
    const aiAccuracy = IncidentDatabase.dashboard && typeof IncidentDatabase.dashboard.aiAccuracy === "number"
        ? IncidentDatabase.dashboard.aiAccuracy
        : 98.4;

    animateValue("activeIncidentsCount", 0, activeIncidents, 1000);
    setDashboardText("populationAtRiskCount", populationAtRisk.toLocaleString());
    animateValue("resourcesDeployedCount", 0, resourcesDeployed, 1400);
    setDashboardText("responseTimeCount", `${responseTime} min`);
    setDashboardText("successRateCount", `${successRate}%`);
    setDashboardText("aiAccuracyCount", `${aiAccuracy}%`);

}

function updateIncidentTimeline() {

    const timeline = document.getElementById("incidentTimeline");

    if (!timeline) return;

    const incident = IncidentDatabase.currentIncident || {};
    const severity = incident.severity || "Unknown";
    const risk = typeof calculateRisk === "function" ? calculateRisk() : 0;
    const priority = typeof calculatePriority === "function" ? calculatePriority() : "Moderate";
    const items = [
        `${incident.disasterType || "Incident"} declared in ${incident.location && incident.location.state ? incident.location.state : "the affected region"}`,
        `Severity escalated to ${severity} with ${risk}/100 AI risk score`,
        `Response priority set to ${priority}`,
        `Command center resources aligned to the current threat level`
    ];

    timeline.innerHTML = "";
    items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        timeline.appendChild(li);
    });

}

function bindDashboardInteractions() {

    const navItems = document.querySelectorAll("#navLinks li");
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navItems.forEach((entry) => entry.classList.remove("active"));
            item.classList.add("active");
            const target = item.getAttribute("data-target");
            if (target) {
                const targetElement = document.getElementById(target);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", `#${target}`);
                }
            }
        });
    });

    document.querySelectorAll(".interactive-card").forEach((card) => {
        card.addEventListener("click", () => {
            const filter = card.getAttribute("data-filter");
            IncidentDatabase.dashboard.activeFilter = filter;
            document.querySelectorAll(".interactive-card").forEach((entry) => entry.classList.toggle("active", entry === card));
            applyDashboardFilter(filter);
        });
    });

    document.querySelectorAll(".filter-btn").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach((entry) => entry.classList.remove("active"));
            button.classList.add("active");
            IncidentDatabase.dashboard.activeFilter = button.getAttribute("data-range") || "today";
            if (typeof initializeCharts === "function") {
                initializeCharts();
            }
        });
    });

}

function applyDashboardFilter(filter) {

    const disasters = IncidentDatabase.disasters || [];
    const matched = disasters.filter((disaster) => !filter || filter === "AI" || disaster.type === filter || disaster.type.toLowerCase().includes(filter.toLowerCase()));

    if (typeof updateDisasterMonitorTable === "function") {
        const tableBody = document.getElementById("disasterMonitorBody");
        if (tableBody) {
            tableBody.innerHTML = "";
            matched.forEach((disaster) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${disaster.type || "Unknown"}</td>
                    <td>${disaster.location || "No Data"}</td>
                    <td>${disaster.severity || "No Data"}</td>
                    <td>${disaster.riskLevel || "No Data"}</td>
                    <td>${(disaster.populationAffected || 0).toLocaleString()}</td>
                    <td>${disaster.status || "Monitor"}</td>
                    <td>${disaster.recommendation || "Monitor"}</td>
                    <td>${disaster.lastUpdated || "No Data"}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    }

    if (typeof updateAlerts === "function") {
        const alerts = matched.length ? matched.map((disaster) => `${disaster.severity.toUpperCase()} | ${disaster.state || disaster.location} | ${disaster.type} | ${disaster.lastUpdated || "Just now"}`) : ["No matching incidents" ];
        IncidentDatabase.dashboard.alerts = alerts;
        updateAlerts();
    }

    if (typeof updateMapView === "function") {
        updateMapView(matched);
    }

}

function initializeDashboard() {

    console.log("🚀 Initializing AI Disaster Command Center...");

    IncidentDatabase.dashboard = IncidentDatabase.dashboard || {};
    IncidentDatabase.dashboard.activeFilter = "today";
    IncidentDatabase.dashboard.selectedHazard = null;

    bindDashboardInteractions();

    const initializeSafe = (name, fn) => {

        if (typeof fn !== "function") {
            console.warn(`⚠ ${name} is unavailable.`);
            return;
        }

        try {
            fn();
        }
        catch (error) {
            console.error(`❌ ${name} failed:`, error);
        }

    };

    initializeSafe("initializeMultiHazardData", initializeMultiHazardData);
    initializeSafe("initializeMap", initializeMap);
    initializeSafe("initializeClock", initializeClock);
    initializeSafe("initializeAPI", initializeAPI);
    initializeSafe("animateCards", animateCards);
    initializeSafe("animateCounters", animateCounters);
    initializeSafe("initializeCharts", initializeCharts);
    initializeSafe("initializeAlerts", initializeAlerts);
    initializeSafe("initializeAI", initializeAI);
    initializeSafe("initializeLiveData", initializeLiveData);
    initializeSafe("updateMissionStatus", updateMissionStatus);
    initializeSafe("updateWeatherPanel", updateWeatherPanel);
    initializeSafe("updateEarthquakeWidget", updateEarthquakeWidget);
    initializeSafe("updateCommandStatistics", updateCommandStatistics);
    initializeSafe("updateIncidentTimeline", updateIncidentTimeline);
    initializeSafe("updateNationalOverview", updateNationalOverview);
    initializeSafe("updateDisasterMonitorTable", updateDisasterMonitorTable);
    initializeSafe("updateMissionControl", updateMissionControl);

    console.log("✅ Dashboard initialized successfully.");

}

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

    if (typeof initializeReport === "function") {
        try {
            initializeReport();
        }
        catch (error) {
            console.error("❌ Report initialization failed:", error);
        }
    }

});