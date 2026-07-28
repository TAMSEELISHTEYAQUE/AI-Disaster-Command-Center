function updateMissionStatus() {

    const mission = document.getElementById("missionStatus");

    if (!mission) return;

    const incident = IncidentDatabase.currentIncident || {};
    const severity = String(incident.severity || "No Data").toLowerCase();
    let phase = "Preparing";
    let detail = "Initial staging and readiness checks are underway.";
    let teams = "2 teams ready";

    if (severity.includes("critical") || severity.includes("catastrophic")) {
        phase = "Active";
        detail = "Top-priority response operations are underway across the impact zone.";
        teams = "9 teams deployed";
    }
    else if (severity.includes("high")) {
        phase = "En Route";
        detail = "Rapid-response assets are moving toward the affected districts.";
        teams = "6 teams deployed";
    }
    else if (severity.includes("moderate")) {
        phase = "Deploying";
        detail = "Support units are being staged for local mobilization.";
        teams = "4 teams deployed";
    }
    else if (severity.includes("low")) {
        phase = "Completed";
        detail = "Monitoring remains active while the response footprint is reduced.";
        teams = "1 team standby";
    }

    mission.innerHTML = `
        <span class="status-pill">${phase}</span>
        <div class="mission-status-list">
            <p>${detail}</p>
            <p>🧭 Response Level: <strong>${incident.responseLevel || "No Data"}</strong></p>
            <p>🚑 Teams: <strong>${teams}</strong></p>
            <p>🏥 Hospitals: <strong>${IncidentDatabase.resources && IncidentDatabase.resources.hospitals ? IncidentDatabase.resources.hospitals : "No Data"}</strong></p>
        </div>
    `;
}