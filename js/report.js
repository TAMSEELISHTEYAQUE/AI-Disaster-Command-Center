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

function buildReportPreviewHtml(summary) {
    const resources = IncidentDatabase.resources || {};
    const navigation = IncidentDatabase.navigation || {};
    const missions = Array.isArray(IncidentDatabase.missions) ? IncidentDatabase.missions : [];
    const recommendations = Array.isArray(summary.recommendations) ? summary.recommendations : [summary.recommendations || "Activate response teams"];
    const routeStatus = navigation.safestRoute ? "Primary route active" : "Fallback route active";

    return `
        <html>
        <head>
            <title>AI Disaster Report Preview</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #f3f8ff;
                    color: #0f172a;
                    margin: 0;
                    padding: 24px;
                }
                .report-shell {
                    max-width: 980px;
                    margin: 0 auto;
                    background: #fff;
                    border: 1px solid #d2e2f6;
                    border-radius: 18px;
                    overflow: hidden;
                    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
                }
                .report-header {
                    background: linear-gradient(135deg, #0f172a, #1d4ed8);
                    color: white;
                    padding: 22px 28px;
                }
                .report-header h1 {
                    margin: 0 0 8px;
                    font-size: 28px;
                }
                .report-body {
                    padding: 28px;
                }
                .report-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(220px, 1fr));
                    gap: 16px;
                    margin: 18px 0 28px;
                }
                .report-card {
                    background: #f8fbff;
                    border: 1px solid #dfeaf7;
                    border-radius: 12px;
                    padding: 14px 16px;
                }
                .report-card strong {
                    display: block;
                    margin-top: 8px;
                    font-size: 1.1rem;
                }
                .section-title {
                    margin: 0 0 12px;
                    font-size: 18px;
                    color: #0f172a;
                }
                ul {
                    margin: 0;
                    padding-left: 18px;
                    line-height: 1.9;
                }
                .qrcode {
                    display: inline-block;
                    padding: 10px 12px;
                    border: 2px solid #0f172a;
                    font-weight: 700;
                    letter-spacing: 0.18em;
                    border-radius: 8px;
                    background: #eef8ff;
                }
                @media print {
                    body { background: white; }
                    .report-shell { box-shadow: none; border: none; }
                }
            </style>
        </head>
        <body>
            <div class="report-shell">
                <div class="report-header">
                    <h1>AI Disaster Command Center</h1>
                    <div>Government Emergency Operations Platform</div>
                    <div>Generated: ${summary.generatedAt}</div>
                </div>
                <div class="report-body">
                    <h2 class="section-title">Executive Summary</h2>
                    <p>${summary.disasterType} incident in ${summary.state} with ${summary.severity} severity and ${summary.riskScore}/100 AI risk score. Response priority: ${summary.priority}. Forecast confidence: ${summary.aiConfidence}%.</p>

                    <div class="report-grid">
                        <div class="report-card"><span>Incident ID</span><strong>${summary.incidentId}</strong></div>
                        <div class="report-card"><span>State / District</span><strong>${summary.state} / ${summary.district}</strong></div>
                        <div class="report-card"><span>Population Affected</span><strong>${summary.populationAffected.toLocaleString()}</strong></div>
                        <div class="report-card"><span>Status</span><strong>${summary.status}</strong></div>
                        <div class="report-card"><span>AI Confidence</span><strong>${summary.aiConfidence}%</strong></div>
                        <div class="report-card"><span>Route Status</span><strong>${routeStatus}</strong></div>
                    </div>

                    <h2 class="section-title">Incident Overview</h2>
                    <ul>
                        <li>Disaster Type: ${summary.disasterType}</li>
                        <li>Severity: ${summary.severity}</li>
                        <li>Response Priority: ${summary.priority}</li>
                        <li>Destination: ${navigation.destination || "Flood Zone - Assam"}</li>
                        <li>Distance: ${navigation.distance || "18.4 km"}</li>
                        <li>ETA: ${navigation.eta || "22 min"}</li>
                    </ul>

                    <h2 class="section-title">AI Analysis & Recommendations</h2>
                    <ul>
                        ${recommendations.map((item) => `<li>${item}</li>`).join("")}
                    </ul>

                    <h2 class="section-title">Mission Timeline</h2>
                    <ul>
                        ${missions.length ? missions.map((mission) => `<li>${mission.missionId || "Mission"}: ${mission.incident || "Incident"} | ${mission.status || "Active"} | ETA ${mission.eta || "--"}</li>`).join("") : "<li>No active mission data available</li>"}
                    </ul>

                    <h2 class="section-title">Resource Deployment</h2>
                    <ul>
                        <li>Rescue Teams: ${resources.rescueTeams || 0}</li>
                        <li>Ambulances: ${resources.ambulances || 0}</li>
                        <li>Helicopters: ${resources.helicopters || 0}</li>
                        <li>Shelters: ${resources.shelters || 0}</li>
                        <li>Hospitals: ${resources.hospitals || 0}</li>
                    </ul>

                    <h2 class="section-title">Officer & Verification</h2>
                    <div class="report-grid">
                        <div class="report-card"><span>Officer</span><strong>Admin Operator</strong></div>
                        <div class="report-card"><span>Shift</span><strong>06:00 - 18:00 IST</strong></div>
                    </div>
                    <div class="qrcode">QR-${summary.incidentId}</div>
                </div>
            </div>
        </body>
        </html>
    `;
}

function previewIncidentReport() {
    const summary = buildReportSummary();
    const reportWindow = window.open("", "_blank", "width=1100,height=900");

    if (!reportWindow) {
        console.warn("⚠ Report preview was blocked by the browser.");
        return;
    }

    reportWindow.document.write(buildReportPreviewHtml(summary));
    reportWindow.document.close();
    reportWindow.focus();
    setTimeout(() => reportWindow.print(), 300);
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
    const triggerButtons = document.querySelectorAll("[data-report-trigger]");
    triggerButtons.forEach((button) => {
        if (button.dataset.bound === "true") return;
        button.dataset.bound = "true";
        button.addEventListener("click", generateIncidentReport);
    });

    const previewButtons = document.querySelectorAll("[data-report-preview]");
    previewButtons.forEach((button) => {
        if (button.dataset.previewBound === "true") return;
        button.dataset.previewBound = "true";
        button.addEventListener("click", previewIncidentReport);
    });
}

function updateReportsDashboard() {
    if (!IncidentDatabase.reports) return;
    IncidentDatabase.reports.lastGenerated = formatDateTime();
}