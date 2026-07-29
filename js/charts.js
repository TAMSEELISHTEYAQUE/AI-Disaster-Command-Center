/* =====================================================
   AI DISASTER COMMAND CENTER
   CHARTS.JS
===================================================== */

/* =====================================================
   ANALYTICS CHARTS
===================================================== */

function initializeCharts() {

    if (typeof window.Chart === "undefined") {
        console.warn("⚠ Chart.js is unavailable.");
        return;
    }

    const range = (IncidentDatabase.dashboard && IncidentDatabase.dashboard.activeFilter) || "today";
    createTrendChart(range);
    createDistributionChart(range);
    createStateChart(range);
    createRiskChart(range);
    createRiskTrendChart(range);
    createResourceUsageChart(range);
    createIncidentFrequencyChart(range);

}

/* =====================================================
   DISASTER TREND CHART
===================================================== */

function createTrendChart(range = "today") {

    if (typeof window.Chart === "undefined") {
        console.warn("⚠ Chart.js is unavailable.");
        return;
    }

    const trendCanvas = document.getElementById("trendChart");

    if (!trendCanvas) return;

    if (window.Chart.getChart(trendCanvas)) {
        window.Chart.getChart(trendCanvas).destroy();
    }

    const config = {
        today: { labels: ["06:00","09:00","12:00","15:00","18:00","21:00"], data: [3,5,6,7,10,8] },
        "24h": { labels: ["00:00","04:00","08:00","12:00","16:00","20:00"], data: [2,4,7,6,9,11] },
        "7d": { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], data: [12,18,15,21,17,24,20] },
        "30d": { labels: ["W1","W2","W3","W4"], data: [28,36,41,45] },
        all: { labels: ["Jan","Feb","Mar","Apr","May","Jun"], data: [21,27,35,39,44,50] }
    };

    const values = config[range] || config.today;

    new window.Chart(trendCanvas, {

        type: "line",

        data: {
            labels: values.labels,
            datasets: [{
                label: "Disasters",
                data: values.data,
                borderColor: "#00D4FF",
                backgroundColor: "rgba(0,212,255,0.12)",
                borderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: "#00D4FF",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                fill: true,
                tension: 0.45
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            animation: {
                duration: 1500,
                easing: "easeOutQuart"
            },

            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff"
                    }
                }
            },

            scales: {
                x: {
                    ticks: { color: "#ffffff" },
                    grid: { color: "rgba(255,255,255,0.08)" }
                },
                y: {
                    ticks: { color: "#ffffff" },
                    grid: { color: "rgba(255,255,255,0.08)" }
                }
            }
        }

    });

}

/* =====================================================
   DISASTER DISTRIBUTION CHART
===================================================== */

function createDistributionChart(range = "today") {

    if (typeof window.Chart === "undefined") {
        console.warn("⚠ Chart.js is unavailable.");
        return;
    }

    const distributionCanvas = document.getElementById("distributionChart");

    if (!distributionCanvas) return;

    if (window.Chart.getChart(distributionCanvas)) {
        window.Chart.getChart(distributionCanvas).destroy();
    }

    const scale = range === "30d" ? 1.25 : range === "7d" ? 1.1 : 1;
    const counts = {
        today: [6,4,3,2],
        "24h": [7,5,4,3],
        "7d": [35,25,20,20],
        "30d": [42,31,24,26],
        all: [58,41,30,34]
    };

    const values = counts[range] || counts.today;

    new window.Chart(distributionCanvas, {

        type: "pie",

        data: {
            labels: ["Flood","Cyclone","Wildfire","Earthquake"],
            datasets: [{
                data: values.map((value) => Math.round(value * scale)),
                backgroundColor: [
                    "#3B82F6",
                    "#F59E0B",
                    "#EF4444",
                    "#10B981"
                ],
                borderWidth: 2,
                borderColor: "#111827"
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#ffffff"
                    }
                }
            }
        }

    });

}

/* =====================================================
   STATE ALERT CHART
===================================================== */

function createStateChart(range = "today") {

    if (typeof window.Chart === "undefined") {
        console.warn("⚠ Chart.js is unavailable.");
        return;
    }

    const stateCanvas = document.getElementById("stateChart");

    if (!stateCanvas) return;

    if (window.Chart.getChart(stateCanvas)) {
        window.Chart.getChart(stateCanvas).destroy();
    }

    const counts = {
        today: [8,6,4,3,2],
        "24h": [10,8,5,4,3],
        "7d": [18,14,10,8,6],
        "30d": [24,19,14,12,8],
        all: [30,24,18,16,11]
    };

    const values = counts[range] || counts.today;

    new window.Chart(stateCanvas, {

        type: "bar",

        data: {
            labels: [
                "Assam",
                "Odisha",
                "Kerala",
                "Gujarat",
                "Uttarakhand"
            ],

            datasets: [{
                label: "Active Alerts",
                data: values,

                backgroundColor: [
                    "#2563EB",
                    "#F97316",
                    "#10B981",
                    "#EF4444",
                    "#8B5CF6"
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff"
                    }
                }
            },

            scales: {
                x: {
                    ticks: { color: "#ffffff" },
                    grid: { color: "rgba(255,255,255,0.08)" }
                },

                y: {
                    beginAtZero: true,
                    ticks: { color: "#ffffff" },
                    grid: { color: "rgba(255,255,255,0.08)" }
                }
            }
        }

    });

}

/* =====================================================
   AI RISK CHART
===================================================== */

function createRiskChart(range = "today") {

    if (typeof window.Chart === "undefined") {
        console.warn("⚠ Chart.js is unavailable.");
        return;
    }

    const riskCanvas = document.getElementById("riskChart");

    if (!riskCanvas) return;

    if (window.Chart.getChart(riskCanvas)) {
        window.Chart.getChart(riskCanvas).destroy();
    }

    const riskValue = typeof calculateRisk === "function" ? calculateRisk() : 82;
    const modifier = range === "30d" ? 4 : range === "7d" ? 2 : range === "24h" ? 1 : 0;
    const adjustedRisk = Math.min(96, riskValue + modifier);

    new window.Chart(riskCanvas, {

        type: "doughnut",

        data: {

            labels: ["High Risk","Remaining"],

            datasets: [{
                data: [adjustedRisk, 100 - adjustedRisk],
                backgroundColor: [
                    "#EF4444",
                    "#374151"
                ],
                borderWidth: 0,
                cutout: "75%"
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#ffffff"
                    }
                },

                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw + "%";
                        }
                    }
                }
            }
        }

    });

}

function createRiskTrendChart(range = "today") {

    if (typeof window.Chart === "undefined") return;

    const canvas = document.getElementById("riskTrendChart");

    if (!canvas) return;

    if (window.Chart.getChart(canvas)) {
        window.Chart.getChart(canvas).destroy();
    }

    const riskValue = typeof calculateRisk === "function" ? calculateRisk() : 82;
    const offset = range === "30d" ? 3 : range === "7d" ? 2 : range === "24h" ? 1 : 0;

    new window.Chart(canvas, {
        type: "line",
        data: {
            labels: ["06:00","08:00","10:00","12:00","14:00","16:00"],
            datasets: [{
                label: "Risk Trend",
                data: [riskValue - 8 + offset, riskValue - 4 + offset, riskValue - 2 + offset, riskValue + 2 + offset, riskValue + 4 + offset, riskValue + offset],
                borderColor: "#00D4FF",
                backgroundColor: "rgba(0,212,255,0.18)",
                fill: true,
                tension: 0.25
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "#ffffff" } } },
            scales: { x: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.08)" } }, y: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.08)" } } }
        }
    });

}

function createResourceUsageChart(range = "today") {

    if (typeof window.Chart === "undefined") return;

    const canvas = document.getElementById("resourceUsageChart");

    if (!canvas) return;

    if (window.Chart.getChart(canvas)) {
        window.Chart.getChart(canvas).destroy();
    }

    const severityScore = typeof getSeverityScore === "function" ? getSeverityScore(IncidentDatabase.currentIncident && IncidentDatabase.currentIncident.severity) : 3;
    const multiplier = range === "30d" ? 1.2 : range === "7d" ? 1.1 : 1;

    new window.Chart(canvas, {
        type: "bar",
        data: {
            labels: ["NDRF","Police","Fire","Medical","Heli"],
            datasets: [{
                label: "Deployment",
                data: [4 + severityScore, 6 + severityScore, 3 + severityScore, 5 + severityScore, 2 + severityScore].map((value) => Math.round(value * multiplier)),
                backgroundColor: ["#3B82F6", "#F59E0B", "#EF4444", "#10B981", "#8B5CF6"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "#ffffff" } } },
            scales: { x: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.08)" } }, y: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.08)" } } }
        }
    });

}

function createIncidentFrequencyChart(range = "today") {

    if (typeof window.Chart === "undefined") return;

    const canvas = document.getElementById("incidentFrequencyChart");

    if (!canvas) return;

    if (window.Chart.getChart(canvas)) {
        window.Chart.getChart(canvas).destroy();
    }

    const severityScore = typeof getSeverityScore === "function" ? getSeverityScore(IncidentDatabase.currentIncident && IncidentDatabase.currentIncident.severity) : 3;
    const scale = range === "30d" ? 1.35 : range === "7d" ? 1.18 : 1;

    new window.Chart(canvas, {
        type: "pie",
        data: {
            labels: ["Flood","Cyclone","Earthquake","Fire"],
            datasets: [{
                data: [22 + severityScore, 14 + severityScore, 8 + severityScore, 6 + severityScore].map((value) => Math.round(value * scale)),
                backgroundColor: ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom", labels: { color: "#ffffff" } } }
        }
    });

}