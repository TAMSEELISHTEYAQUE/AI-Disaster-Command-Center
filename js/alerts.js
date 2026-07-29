/* =====================================================
   AI DISASTER COMMAND CENTER
   ALERTS.JS
===================================================== */

/* =====================================================
   ALERT DATA
===================================================== */

const disasterAlerts = [

    { severity: "High", state: "Assam", type: "Flood Warning", time: "2 min ago", detail: "River levels rising near the Brahamputra corridor" },
    { severity: "Medium", state: "Odisha", type: "Cyclone Watch", time: "5 min ago", detail: "Storm surge expected along coastal districts" },
    { severity: "Medium", state: "Uttarakhand", type: "Wildfire Risk", time: "8 min ago", detail: "Dry winds accelerating spread near forest edge" },
    { severity: "Low", state: "Kerala", type: "Heavy Rain", time: "12 min ago", detail: "Localized flooding risks in low-lying settlements" },
    { severity: "High", state: "Himachal", type: "Forest Fire", time: "16 min ago", detail: "Fire line containment in progress" },
    { severity: "Low", state: "Gujarat", type: "Earthquake Watch", time: "20 min ago", detail: "Aftershock monitoring active" }

];

let alertsRefreshTimer = null;

/* =====================================================
   ALERT FUNCTIONS
===================================================== */

function formatAlertText(alert) {
    if (typeof alert === "string") {
        return alert;
    }

    return `${alert.severity || "Alert"} | ${alert.state || "Region"} | ${alert.type || "Incident"} | ${alert.time || "Just now"}`;
}

function createAlertItem(alert) {
    const item = document.createElement("li");
    const alertText = formatAlertText(alert);
    const detailText = typeof alert === "string" ? "" : alert.detail || "";

    item.className = "alert-item";
    item.innerHTML = `<strong>${alertText}</strong>${detailText ? `<span class="alert-meta">${detailText}</span>` : ""}`;
    item.addEventListener("click", () => {
        item.classList.toggle("is-expanded");
    });

    return item;
}

function updateAlerts() {

    const list = document.getElementById("alertsList");

    if (!list) return;

    const alerts = Array.isArray(IncidentDatabase && IncidentDatabase.dashboard && IncidentDatabase.dashboard.alerts)
        ? IncidentDatabase.dashboard.alerts
        : disasterAlerts;

    list.innerHTML = "";

    alerts.forEach((alert) => {
        list.appendChild(createAlertItem(alert));
    });

}

/* =====================================================
   INITIALIZE ALERTS
===================================================== */

function initializeAlerts() {

    updateAlerts();

    if (alertsRefreshTimer) {
        clearInterval(alertsRefreshTimer);
    }

    alertsRefreshTimer = setInterval(updateAlerts, 5000);

}