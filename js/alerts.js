/* =====================================================
   AI DISASTER COMMAND CENTER
   ALERTS.JS
===================================================== */

/* =====================================================
   ALERT DATA
===================================================== */

const disasterAlerts = [

    "🔴 HIGH | Assam | Flood Warning | 2 min ago",
    "🟠 MEDIUM | Odisha | Cyclone Watch | 5 min ago",
    "🟡 MEDIUM | Uttarakhand | Wildfire Risk | 8 min ago",
    "🔵 LOW | Kerala | Heavy Rain | 12 min ago",
    "🔥 HIGH | Himachal | Forest Fire | 16 min ago",
    "🌍 LOW | Gujarat | Earthquake Watch | 20 min ago"

];

/* =====================================================
   ALERT FUNCTIONS
===================================================== */

function updateAlerts() {

    updateList("alertsList", disasterAlerts);

}

/* =====================================================
   INITIALIZE ALERTS
===================================================== */

function initializeAlerts() {

    updateAlerts();

    setInterval(updateAlerts, 5000);

}