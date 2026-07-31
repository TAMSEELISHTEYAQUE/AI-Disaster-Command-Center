/* =====================================================
   AI DISASTER COMMAND CENTER
   REPORT.JS
===================================================== */

/* =====================================================
   PDF REPORT GENERATION
===================================================== */

function generateIncidentReport() {

    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.warn("⚠ Report generation is unavailable.");
        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(22);
doc.setTextColor(0, 102, 255);
doc.text("AI DISASTER COMMAND CENTER", 20, 20);

doc.setFontSize(15);
doc.setTextColor(40, 40, 40);
doc.text("Enterprise Incident Assessment Report", 20, 30);

doc.setDrawColor(0,102,255);
doc.line(20,35,190,35);
    doc.setFontSize(12);

    doc.text("Generated: " + formatDateTime(), 20, 35);

    doc.text(
        "Incident ID: " + IncidentDatabase.currentIncident.incidentId,
        20,
        50
    );

    doc.text(
        "Disaster Type: " + IncidentDatabase.currentIncident.disasterType,
        20,
        60
    );

    doc.text(
        "Severity: " + IncidentDatabase.currentIncident.severity,
        20,
        70
    );

    doc.text(
        "State: " + IncidentDatabase.currentIncident.location.state,
        20,
        80
    );

    doc.text(
        "Population Affected: " +
        IncidentDatabase.currentIncident.populationAffected,
        20,
        90
    );

    doc.text(
        "AI Confidence: " +
        IncidentDatabase.currentIncident.aiConfidence + "%",
        20,
        100
    );
doc.setFontSize(13);

doc.text(
    "Executive Summary",
    20,
    115
);

doc.setFontSize(11);

doc.text(
    "This report has been generated automatically by the AI Disaster Command Center using integrated incident intelligence, operational resources and AI-assisted analysis.",
    20,
    122,
    { maxWidth: 170 }
);
    doc.text("Recommended Actions", 20, 120);

    doc.text("- Deploy Rescue Teams", 30, 135);
    doc.text("- Increase Satellite Monitoring", 30, 145);
    doc.text("- Notify Local Authorities", 30, 155);
doc.setFontSize(13);

doc.text(
    "System Information",
    20,
    175
);

doc.setFontSize(11);

doc.text(
    "AI Status : " + IncidentDatabase.systemHealth.ai,
    20,
    185
);

doc.text(
    "Navigation : " + IncidentDatabase.systemHealth.navigation,
    20,
    193
);

doc.text(
    "Database : " + IncidentDatabase.systemHealth.database,
    20,
    201
);

doc.text(
    "Communication : " + IncidentDatabase.systemHealth.communication,
    20,
    209
);
    doc.save("AI_Disaster_Report.pdf");

}
/* =====================================================
   INITIALIZE REPORT
===================================================== */

function initializeReport() {

    const button = document.getElementById("generateReport");

    if (!button) return;

    button.addEventListener("click", generateIncidentReport);

}
/* =====================================================
   REPORT DASHBOARD
===================================================== */

function updateReportsDashboard() {

    if (!IncidentDatabase.reports) return;

    IncidentDatabase.reports.lastGenerated =
        formatDateTime();

}