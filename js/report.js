/* =====================================================
   AI DISASTER COMMAND CENTER
   REPORT.JS
===================================================== */

/* =====================================================
   ENTERPRISE REPORT GENERATION
===================================================== */

function buildReportSummary() {
    const incident = IncidentDatabase.currentIncident || {};
    const risk = typeof calculateRisk === "function" ? calculateRisk() : 0;
    const priority = typeof calculatePriority === "function" ? calculatePriority() : "Moderate";
    const recommendations = typeof generateRecommendationForDisaster === "function"
        ? generateRecommendationForDisaster(incident)
        : ["Activate response teams", "Open relief shelters", "Maintain AI monitoring"];

    return {
        incidentId: incident.incidentId || "ADC-2026-001",
        disasterType: incident.disasterType || "Flood",
        severity: incident.severity || "High",
        state: incident.location && incident.location.state ? incident.location.state : "Assam",
        district: incident.location && incident.location.district ? incident.location.district : "Barpeta",
        populationAffected: incident.populationAffected || 0,
        aiConfidence: incident.aiConfidence || 98,
        riskScore: risk,
        priority,
        recommendations: Array.isArray(recommendations) ? recommendations.slice(0, 4) : [recommendations],
        generatedAt: formatDateTime(),
        status: incident.status || "Active"
    };
}

function generateIncidentReport() {

    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.warn("⚠ Report generation is unavailable.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const summary = buildReportSummary();
    const resources = IncidentDatabase.resources || {};
    const navigation = IncidentDatabase.navigation || {};
    const missions = Array.isArray(IncidentDatabase.missions) ? IncidentDatabase.missions : [];
    const disasters = Array.isArray(IncidentDatabase.disasters) ? IncidentDatabase.disasters : [];

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    let y = 18;

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 52, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("AI DISASTER COMMAND CENTER", margin, 18);
    doc.setFontSize(10);
    doc.text("Government Emergency Operations Platform", margin, 28);
    doc.text(`Generated: ${summary.generatedAt}`, margin, 36);
    doc.text(`Verification QR: ADC-${summary.incidentId}`, margin, 44);

    doc.setDrawColor(59, 130, 246);
    doc.line(margin, 50, pageWidth - margin, 50);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    y = 62;
    doc.text("Executive Summary", margin, y);
    y += 12;
    doc.setFontSize(10);
    const summaryText = `Disaster Type: ${summary.disasterType} | Severity: ${summary.severity} | State: ${summary.state} | District: ${summary.district} | Status: ${summary.status}. The operational AI assessment indicates a ${summary.priority} priority response with a ${summary.riskScore}/100 risk score and ${summary.aiConfidence}% forecast confidence.`;
    const wrappedSummary = doc.splitTextToSize(summaryText, pageWidth - margin * 2);
    doc.text(wrappedSummary, margin, y);
    y += wrappedSummary.length * 5 + 8;

    doc.setFontSize(12);
    doc.text("Incident Overview", margin, y);
    y += 8;
    doc.setFontSize(10);
    const incidentSummary = [
        `Incident ID: ${summary.incidentId}`,
        `Disaster Type: ${summary.disasterType}`,
        `Severity: ${summary.severity}`,
        `State / District: ${summary.state}, ${summary.district}`,
        `Population Affected: ${summary.populationAffected.toLocaleString()}`,
        `AI Confidence: ${summary.aiConfidence}%`,
        `Risk Score: ${summary.riskScore}/100`,
        `Response Priority: ${summary.priority}`
    ];
    incidentSummary.forEach((line) => {
        doc.text(line, margin + 4, y);
        y += 7;
    });

    if (y > 150) {
        doc.addPage();
        y = 20;
    }

    doc.setFontSize(12);
    doc.text("AI Analysis & Recommendations", margin, y);
    y += 8;
    doc.setFontSize(10);
    summary.recommendations.forEach((recommendation, index) => {
        doc.text(`${index + 1}. ${recommendation}`, margin + 4, y);
        y += 7;
    });

    y += 8;
    doc.text("Mission Timeline", margin, y);
    y += 8;
    missions.length ? missions.forEach((mission) => {
        doc.text(`• ${mission.missionId || "Mission"}: ${mission.incident || "Incident"} | Status: ${mission.status || "Active"} | ETA: ${mission.eta || "--"}`, margin + 4, y);
        y += 7;
    }) : doc.text("• No active mission data available", margin + 4, y);

    y += 8;
    doc.text("Resource Deployment", margin, y);
    y += 8;
    const resourceLines = [
        `Rescue Teams: ${resources.rescueTeams || 0}`,
        `Ambulances: ${resources.ambulances || 0}`,
        `Helicopters: ${resources.helicopters || 0}`,
        `Shelters: ${resources.shelters || 0}`,
        `Hospitals: ${resources.hospitals || 0}`,
        `Relief Camps: ${resources.ReliefCamps || 0}`
    ];
    resourceLines.forEach((line) => {
        doc.text(`• ${line}`, margin + 4, y);
        y += 7;
    });

    y += 8;
    doc.text("Route Intelligence", margin, y);
    y += 8;
    const routeText = [
        `Destination: ${navigation.destination || "Flood Zone - Assam"}`,
        `Distance: ${navigation.distance || "18.4 km"}`,
        `ETA: ${navigation.eta || "22 min"}`,
        `Blocked Roads: ${navigation.blockedRoads ?? 2}`,
        `Alternative Routes: ${navigation.alternativeRoutes ?? 3}`,
        `Status: ${navigation.safestRoute ? "Primary route active" : "Secondary route active"}`
    ];
    routeText.forEach((line) => {
        doc.text(`• ${line}`, margin + 4, y);
        y += 7;
    });

    if (y > 250) {
        doc.addPage();
        y = 20;
    }

    doc.setFontSize(12);
    doc.text("Officer & Verification Details", margin, y);
    y += 10;
    doc.setFontSize(10);
    doc.text("Officer: Admin Operator / National Emergency Coordination Cell", margin + 4, y);
    y += 7;
    doc.text("Shift: 06:00 - 18:00 IST", margin + 4, y);
    y += 7;
    doc.text(`QR Verification ID: ${summary.incidentId}`, margin + 4, y);
    y += 7;
    doc.text("Seal: Verified by AI Command Center Operations Desk", margin + 4, y);
    y += 10;

    doc.setFontSize(12);
    doc.text("Operational Notes", margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.text("This report is intended for emergency operations planning, field coordination, and executive situational awareness. Distribution is restricted to public safety and disaster response personnel.", margin + 4, y, { maxWidth: pageWidth - margin * 2 });

    doc.save(`AI_Disaster_Report_${summary.incidentId}.pdf`);
    IncidentDatabase.reports = IncidentDatabase.reports || {};
    IncidentDatabase.reports.lastGenerated = summary.generatedAt;
    IncidentDatabase.reports.latestReport = `AI_Disaster_Report_${summary.incidentId}.pdf`;

}

function initializeReport() {
    const buttons = document.querySelectorAll("[data-report-trigger]");
    buttons.forEach((button) => {
        if (button.dataset.bound === "true") return;
        button.dataset.bound = "true";
        button.addEventListener("click", generateIncidentReport);
    });
}

function updateReportsDashboard() {
    if (!IncidentDatabase.reports) return;
    IncidentDatabase.reports.lastGenerated = formatDateTime();
}