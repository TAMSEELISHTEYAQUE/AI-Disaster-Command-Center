/* =====================================================
   AI DISASTER COMMAND CENTER
   CHARTS.JS
===================================================== */

const chartRegistry = {};

function getChartInstance(canvasId) {
    return chartRegistry[canvasId] || null;
}

function storeChartInstance(canvasId, chartInstance) {
    chartRegistry[canvasId] = chartInstance;
}

function destroyChart(canvasId) {
    const chartInstance = getChartInstance(canvasId);
    if (chartInstance) {
        chartInstance.destroy();
        chartRegistry[canvasId] = null;
    }
}

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

    destroyChart("trendChart");

    const config = {
        today: { labels: ["06:00","09:00","12:00","15:00","18:00","21:00"], data: [3,5,6,7,10,8] },
        "24h": { labels: ["00:00","04:00","08:00","12:00","16:00","20:00"], data: [2,4,7,6,9,11] },
        "7d": { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], data: [12,18,15,21,17,24,20] },
        "30d": { labels: ["W1","W2","W3","W4"], data: [28,36,41,45] },
        all: { labels: ["Jan","Feb","Mar","Apr","May","Jun"], data: [21,27,35,39,44,50] }
    };

    const values = config[range] || config.today;

    const chartInstance = new window.Chart(trendCanvas, {

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
                duration: 1200,
                easing: "easeOutQuart"
            },
            interaction: { mode: "index", intersect: false },
            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff"
                    }
                },
                tooltip: {
                    backgroundColor: "#0f172a",
                    titleColor: "#00D4FF",
                    bodyColor: "#ffffff",
                    borderColor: "rgba(0,212,255,0.3)",
                    borderWidth: 1
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

    storeChartInstance("trendChart", chartInstance);

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

    destroyChart("distributionChart");

    const scale = range === "30d" ? 1.25 : range === "7d" ? 1.1 : 1;
    const counts = {
        today: [6,4,3,2],
        "24h": [7,5,4,3],
        "7d": [35,25,20,20],
        "30d": [42,31,24,26],
        all: [58,41,30,34]
    };

    const values = counts[range] || counts.today;

    const chartInstance = new window.Chart(distributionCanvas, {

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

            animation: { duration: 1200, easing: "easeOutQuart" },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#ffffff"
                    }
                },
                tooltip: {
                    backgroundColor: "#0f172a",
                    bodyColor: "#ffffff"
                }
            }
        }

    });

    storeChartInstance("distributionChart", chartInstance);

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

    destroyChart("stateChart");

    const counts = {
        today: [8,6,4,3,2],
        "24h": [10,8,5,4,3],
        "7d": [18,14,10,8,6],
        "30d": [24,19,14,12,8],
        all: [30,24,18,16,11]
    };

    const values = counts[range] || counts.today;

    const chartInstance = new window.Chart(stateCanvas, {

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

    storeChartInstance("stateChart", chartInstance);

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

    destroyChart("riskChart");

    const riskValue = typeof calculateRisk === "function" ? calculateRisk() : 82;
    const modifier = range === "30d" ? 4 : range === "7d" ? 2 : range === "24h" ? 1 : 0;
    const adjustedRisk = Math.min(96, riskValue + modifier);

    const chartInstance = new window.Chart(riskCanvas, {

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

            animation: { duration: 1200, easing: "easeOutQuart" },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#ffffff"
                    }
                },

                tooltip: {
                    backgroundColor: "#0f172a",
                    bodyColor: "#ffffff",
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}%`;
                        }
                    }
                }
            }
        }

    });

    storeChartInstance("riskChart", chartInstance);

}

function createRiskTrendChart(range = "today") {

    if (typeof window.Chart === "undefined") return;

    const canvas = document.getElementById("riskTrendChart");

    if (!canvas) return;

    destroyChart("riskTrendChart");

    const riskValue = typeof calculateRisk === "function" ? calculateRisk() : 82;
    const offset = range === "30d" ? 3 : range === "7d" ? 2 : range === "24h" ? 1 : 0;

    const chartInstance = new window.Chart(canvas, {
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
            animation: { duration: 1200, easing: "easeOutQuart" },
            interaction: { mode: "index", intersect: false },
            plugins: { legend: { labels: { color: "#ffffff" } }, tooltip: { backgroundColor: "#0f172a", bodyColor: "#ffffff" } },
            scales: { x: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.08)" } }, y: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.08)" } } }
        }
    });

    storeChartInstance("riskTrendChart", chartInstance);

}

function createResourceUsageChart(range = "today") {

    if (typeof window.Chart === "undefined") return;

    const canvas = document.getElementById("resourceUsageChart");

    if (!canvas) return;

    destroyChart("resourceUsageChart");

    const severityScore = typeof getSeverityScore === "function" ? getSeverityScore(IncidentDatabase.currentIncident && IncidentDatabase.currentIncident.severity) : 3;
    const multiplier = range === "30d" ? 1.2 : range === "7d" ? 1.1 : 1;

    const chartInstance = new window.Chart(canvas, {
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
            animation: { duration: 1200, easing: "easeOutQuart" },
            plugins: { legend: { labels: { color: "#ffffff" } }, tooltip: { backgroundColor: "#0f172a", bodyColor: "#ffffff" } },
            scales: { x: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.08)" } }, y: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.08)" } } }
        }
    });

    storeChartInstance("resourceUsageChart", chartInstance);

}

function createIncidentFrequencyChart(range = "today") {

    if (typeof window.Chart === "undefined") return;

    const canvas = document.getElementById("incidentFrequencyChart");

    if (!canvas) return;

    destroyChart("incidentFrequencyChart");

    const severityScore = typeof getSeverityScore === "function" ? getSeverityScore(IncidentDatabase.currentIncident && IncidentDatabase.currentIncident.severity) : 3;
    const scale = range === "30d" ? 1.35 : range === "7d" ? 1.18 : 1;

    const chartInstance = new window.Chart(canvas, {
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
            animation: { duration: 1200, easing: "easeOutQuart" },
            plugins: { legend: { position: "bottom", labels: { color: "#ffffff" } }, tooltip: { backgroundColor: "#0f172a", bodyColor: "#ffffff" } }
        }
    });

    storeChartInstance("incidentFrequencyChart", chartInstance);

}