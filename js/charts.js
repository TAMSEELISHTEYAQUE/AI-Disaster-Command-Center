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

    createTrendChart();
    createDistributionChart();
    createStateChart();
    createRiskChart();
    createRiskTrendChart();
    createResourceUsageChart();
    createIncidentFrequencyChart();

}

/* =====================================================
   DISASTER TREND CHART
===================================================== */

function createTrendChart() {

    if (typeof window.Chart === "undefined") {
        console.warn("⚠ Chart.js is unavailable.");
        return;
    }

    const trendCanvas = document.getElementById("trendChart");

    if (!trendCanvas) return;

    if (window.Chart.getChart(trendCanvas)) {
        window.Chart.getChart(trendCanvas).destroy();
    }

    new window.Chart(trendCanvas, {

        type: "line",

        data: {
            labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
            datasets: [{
                label: "Disasters",
                data: [12,18,15,21,17,24,20],
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

function createDistributionChart() {

    if (typeof window.Chart === "undefined") {
        console.warn("⚠ Chart.js is unavailable.");
        return;
    }

    const distributionCanvas = document.getElementById("distributionChart");

    if (!distributionCanvas) return;

    if (window.Chart.getChart(distributionCanvas)) {
        window.Chart.getChart(distributionCanvas).destroy();
    }

    new window.Chart(distributionCanvas, {

        type: "pie",

        data: {
            labels: ["Flood","Cyclone","Wildfire","Earthquake"],
            datasets: [{
                data: [35,25,20,20],
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

function createStateChart() {

    if (typeof window.Chart === "undefined") {
        console.warn("⚠ Chart.js is unavailable.");
        return;
    }

    const stateCanvas = document.getElementById("stateChart");

    if (!stateCanvas) return;

    if (window.Chart.getChart(stateCanvas)) {
        window.Chart.getChart(stateCanvas).destroy();
    }

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
                data: [18,14,10,8,6],

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

function createRiskChart() {

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

    new window.Chart(riskCanvas, {

        type: "doughnut",

        data: {

            labels: ["High Risk","Remaining"],

            datasets: [{
                data: [riskValue, 100 - riskValue],
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

function createRiskTrendChart() {

    if (typeof window.Chart === "undefined") return;

    const canvas = document.getElementById("riskTrendChart");

    if (!canvas) return;

    if (window.Chart.getChart(canvas)) {
        window.Chart.getChart(canvas).destroy();
    }

    const riskValue = typeof calculateRisk === "function" ? calculateRisk() : 82;

    new window.Chart(canvas, {
        type: "line",
        data: {
            labels: ["06:00","08:00","10:00","12:00","14:00","16:00"],
            datasets: [{
                label: "Risk Trend",
                data: [riskValue - 8, riskValue - 4, riskValue - 2, riskValue + 2, riskValue + 4, riskValue],
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

function createResourceUsageChart() {

    if (typeof window.Chart === "undefined") return;

    const canvas = document.getElementById("resourceUsageChart");

    if (!canvas) return;

    if (window.Chart.getChart(canvas)) {
        window.Chart.getChart(canvas).destroy();
    }

    const severityScore = typeof getSeverityScore === "function" ? getSeverityScore(IncidentDatabase.currentIncident && IncidentDatabase.currentIncident.severity) : 3;

    new window.Chart(canvas, {
        type: "bar",
        data: {
            labels: ["NDRF","Police","Fire","Medical","Heli"],
            datasets: [{
                label: "Deployment",
                data: [4 + severityScore, 6 + severityScore, 3 + severityScore, 5 + severityScore, 2 + severityScore],
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

function createIncidentFrequencyChart() {

    if (typeof window.Chart === "undefined") return;

    const canvas = document.getElementById("incidentFrequencyChart");

    if (!canvas) return;

    if (window.Chart.getChart(canvas)) {
        window.Chart.getChart(canvas).destroy();
    }

    const severityScore = typeof getSeverityScore === "function" ? getSeverityScore(IncidentDatabase.currentIncident && IncidentDatabase.currentIncident.severity) : 3;

    new window.Chart(canvas, {
        type: "pie",
        data: {
            labels: ["Flood","Cyclone","Earthquake","Fire"],
            datasets: [{
                data: [22 + severityScore, 14 + severityScore, 8 + severityScore, 6 + severityScore],
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