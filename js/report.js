/* =====================================================
   AI DISASTER COMMAND CENTER
   REPORT.JS
===================================================== */

/* =====================================================
   PDF REPORT GENERATION
===================================================== */

function generateIncidentReport() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI Disaster Incident Report", 20, 20);

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

    doc.text("Recommended Actions", 20, 120);

    doc.text("- Deploy Rescue Teams", 30, 135);
    doc.text("- Increase Satellite Monitoring", 30, 145);
    doc.text("- Notify Local Authorities", 30, 155);

    doc.save("AI_Disaster_Report.pdf");

}