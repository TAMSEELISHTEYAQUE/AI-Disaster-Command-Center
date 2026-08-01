/* =====================================================
   AI DISASTER COMMAND CENTER
   INCIDENT MANAGEMENT
===================================================== */

/* =====================================================
   STATE
===================================================== */

const IncidentManager = {

    selectedIncident: null,

    filteredIncidents: [],

    search: "",

    severity: "All",

    status: "All",

    disaster: "All"

};

/* =====================================================
   GET INCIDENTS
===================================================== */

function getIncidents() {

    return Array.isArray(IncidentDatabase.disasters)
        ? IncidentDatabase.disasters
        : [];

}

/* =====================================================
   FILTER INCIDENTS
===================================================== */

function getFilteredIncidents() {

    let incidents = getIncidents();

    if (IncidentManager.search) {

        const search = IncidentManager.search.toLowerCase();

        incidents = incidents.filter((incident) =>
            incident.type.toLowerCase().includes(search) ||
            incident.location.toLowerCase().includes(search)
        );

    }

    if (IncidentManager.severity !== "All") {

        incidents = incidents.filter(
            incident => incident.severity === IncidentManager.severity
        );

    }

    if (IncidentManager.status !== "All") {

        incidents = incidents.filter(
            incident => incident.status === IncidentManager.status
        );

    }

    if (IncidentManager.disaster !== "All") {

        incidents = incidents.filter(
            incident => incident.type === IncidentManager.disaster
        );

    }

    IncidentManager.filteredIncidents = incidents;

    return incidents;

}

/* =====================================================
   SELECT INCIDENT
===================================================== */

function selectIncident(id) {

    const incident = getIncidents().find(
        item => item.id === id
    );

    if (!incident) return;

    IncidentManager.selectedIncident = incident;

}

/* =====================================================
   UPDATE
===================================================== */
function updateIncidentManagement() {

    getFilteredIncidents();

    renderIncidentTable();

    updateIncidentDetails();

}

/* =====================================================
   INITIALIZE
===================================================== */

function initializeIncidentManagement() {

    updateIncidentManagement();

}
/* =====================================================
   INCIDENT TABLE
===================================================== */

function renderIncidentTable() {

    const tableBody = document.getElementById("incidentTableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    const incidents = getFilteredIncidents();

    incidents.forEach((incident) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${incident.id}</td>
            <td>${incident.type}</td>
            <td>${incident.location}</td>
            <td>${incident.severity}</td>
            <td>${incident.status}</td>
            <td>${incident.population ?? "--"}</td>
            <td>${incident.aiConfidence ?? "--"}%</td>
        `;

        row.addEventListener("click", () => {

            selectIncident(incident.id);

            updateIncidentDetails();

        });

        tableBody.appendChild(row);

    });

}
/* =====================================================
   INCIDENT DETAILS
===================================================== */

function updateIncidentDetails() {

    if (!IncidentManager.selectedIncident) return;

    const incident = IncidentManager.selectedIncident;

    const title = document.getElementById("incidentTitle");
    const location = document.getElementById("incidentLocation");
    const severity = document.getElementById("incidentSeverity");
    const status = document.getElementById("incidentStatus");

    if (title) {
        title.textContent = incident.type;
    }

    if (location) {
        location.textContent = incident.location;
    }

    if (severity) {
        severity.textContent = incident.severity;
    }

    if (status) {
        status.textContent = incident.status;
    }

}