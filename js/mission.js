function getMissionPhase(severity) {

    const value = String(severity || "").toLowerCase();

    if (value.includes("critical") || value.includes("catastrophic")) {
        return { phase: "Active", detail: "Top-priority response operations are underway across the impact zone.", teams: "9 teams deployed" };
    }
    if (value.includes("high") || value.includes("severe")) {
        return { phase: "En Route", detail: "Rapid-response assets are moving toward the affected districts.", teams: "6 teams deployed" };
    }
    if (value.includes("moderate") || value.includes("medium")) {
        return { phase: "Deploying", detail: "Support units are being staged for local mobilization.", teams: "4 teams deployed" };
    }
    if (value.includes("low")) {
        return { phase: "Completed", detail: "Monitoring remains active while the response footprint is reduced.", teams: "1 team standby" };
    }

    return { phase: "Preparing", detail: "Initial staging and readiness checks are underway.", teams: "2 teams ready" };

}

function updateMissionStatus() {

    const statusElement = document.getElementById("missionStatus");

    if (!statusElement) return;

    const incident = IncidentDatabase.currentIncident || {};
    const status = getMissionPhase(incident.severity);
    const hospitalCount = IncidentDatabase.resources && IncidentDatabase.resources.hospitals ? IncidentDatabase.resources.hospitals : "No Data";

    statusElement.innerHTML = `
        <span class="status-pill">${status.phase}</span>
        <div class="mission-status-list">
            <p>${status.detail}</p>
            <p>🧭 Response Level: <strong>${incident.responseLevel || "No Data"}</strong></p>
            <p>🚑 Teams: <strong>${status.teams}</strong></p>
            <p>🏥 Hospitals: <strong>${hospitalCount}</strong></p>
        </div>
    `;
}

function updateMissionControl() {

    const target = document.getElementById("missionControlList");

    if (!target) return;

    const analyses = typeof analyzeDisasters === "function" ? analyzeDisasters() : [];

    if (!analyses.length) {
        target.innerHTML = '<div class="mission-card"><strong>No active missions</strong><span>Mission control is idle.</span></div>';
        return;
    }

    target.innerHTML = "";

    analyses.forEach((disaster, index) => {
        const status = getMissionPhase(disaster.severity);
        const missionCard = document.createElement("div");
        missionCard.className = "mission-card";
        missionCard.innerHTML = `
            <strong>${disaster.type} · Mission ${String(index + 1).padStart(2, "0")}</strong>
            <span>${status.phase} · ${disaster.location || "Unknown location"} · ETA ${Math.max(30, 90 - index * 10)} min</span>
        `;
        target.appendChild(missionCard);
    });

}