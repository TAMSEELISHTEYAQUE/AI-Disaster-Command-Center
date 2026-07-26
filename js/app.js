/* =====================================================
   AI DISASTER COMMAND CENTER
   APP.JS - VERSION 4
===================================================== */

/* =====================================================
   GLOBAL VARIABLES
===================================================== */

const map = L.map("map").setView([22.9734, 78.6569], 5);

/* =====================================================
   DASHBOARD INITIALIZATION
===================================================== */
function initializeDashboard(){

    initializeMap();
    initializeClock();
    animateCards();
    animateCounters();

    initializeCharts();

    updateAlerts();
    updateAIRecommendations();

    setInterval(updateAlerts,5000);
    setInterval(updateAIRecommendations,7000);

}
/* =====================================================
   MAP SYSTEM
===================================================== */

function initializeMap() {

    /* ---------- Map Tiles ---------- */

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18
    }).addTo(map);

    /* ---------- Disaster Monitoring Locations ---------- */

    const disasterLocations = [

        {
            name: "New Delhi",
            coords: [28.6139, 77.2090],
            info: "🛰 National Disaster Control Centre"
        },

        {
            name: "Assam",
            coords: [26.2006, 92.9376],
            info: "🌊 Flood Warning"
        },

        {
            name: "Odisha",
            coords: [20.9517, 85.0985],
            info: "🌀 Cyclone Watch"
        },

        {
            name: "Uttarakhand",
            coords: [30.0668, 79.0193],
            info: "🔥 Wildfire Risk"
        },

        {
            name: "Kerala",
            coords: [10.8505, 76.2711],
            info: "🌧 Heavy Rain Alert"
        },

        {
            name: "Hyderabad",
            coords: [17.3850, 78.4867],
            info: "🤖 AI Monitoring Centre"
        }

    ];

    const markers = [];

    disasterLocations.forEach(location => {

        const marker = L.marker(location.coords)
            .addTo(map)
            .bindPopup(`
                <b>${location.name}</b><br>
                ${location.info}
            `);

        markers.push(marker);

    });

    const group = L.featureGroup(markers);

    map.fitBounds(group.getBounds(), {
        padding: [40, 40]
    });

}
/* =====================================================
   LIVE CLOCK
===================================================== */

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    const options = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };

    clock.textContent = "🕒 " + now.toLocaleString("en-IN", options);

}

function initializeClock() {

    updateClock();

    setInterval(updateClock, 1000);

}
/* =====================================================
   KPI COUNTER ANIMATION
===================================================== */

function animateValue(elementId, start, end, duration, suffix = "") {

    const element = document.getElementById(elementId);

    if (!element) return;

    const increment = end >= start ? 1 : -1;

    const range = Math.abs(end - start);

    const stepTime = Math.max(Math.floor(duration / (range || 1)), 20);

    let current = start;

    element.textContent = current + suffix;

    const timer = setInterval(() => {

        current += increment;

        element.textContent = current + suffix;

        if (current === end) {

            clearInterval(timer);

        }

    }, stepTime);

}

function animateCounters() {

    animateValue("satelliteCount", 0, 12, 1200);

    animateValue("floodCount", 0, 28, 1400);

    animateValue("fireCount", 0, 9, 1000);

    animateValue("accuracyCount", 0, 98, 1500, "%");

}

/* =====================================================
   CARD ENTRANCE ANIMATION
===================================================== */

function animateCards() {

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

        setTimeout(() => {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 150);

    });

}
/* =====================================================
   LIVE ALERT SYSTEM
===================================================== */

const disasterAlerts = [
    "🔴 Flood Warning — Assam",
    "🟠 Cyclone Watch — Odisha",
    "🟡 Wildfire Risk — Uttarakhand",
    "🔵 Heavy Rain — Kerala",
    "🔥 Forest Fire — Himachal Pradesh",
    "🌍 Earthquake Watch — Gujarat"
];

const aiSuggestions = [
    "✅ Deploy Rescue Team Alpha",
    "📢 Issue Early Warning Notification",
    "🛰 Increase Satellite Monitoring",
    "🏥 Prepare Emergency Shelters",
    "🚁 Dispatch Medical Helicopter",
    "📡 Activate Emergency Communication"
];

function updateList(listId, items, displayCount = 4) {

    const list = document.getElementById(listId);

    if (!list) return;

    list.innerHTML = "";

    const shuffled = [...items].sort(() => Math.random() - 0.5);

    shuffled.slice(0, displayCount).forEach(item => {

        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);

    });

}

function updateAlerts() {

    updateList("alertsList", disasterAlerts);

}

function updateAIRecommendations() {

    updateList("aiRecommendations", aiSuggestions);

}
/* =====================================================
   ANALYTICS CHARTS
===================================================== */

function initializeCharts(){

    /* -----------------------------
       Disaster Trend
    ------------------------------ */

    const trendCanvas = document.getElementById("trendChart");

    if(trendCanvas){

        new Chart(trendCanvas,{

            type:"line",

            data:{
                labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

                datasets:[{
                    label:"Disasters",
                    data:[12,18,15,21,17,24,20],
                    borderColor:"#00d4ff",
                    backgroundColor:"rgba(0,212,255,0.15)",
                    fill:true,
                    tension:0.4
                }]
            },

            options:{
                responsive:true,
                maintainAspectRatio:false,

                plugins:{
                    legend:{
                        labels:{
                            color:"#ffffff"
                        }
                    }
                },

                scales:{
                    x:{
                        ticks:{ color:"#ffffff" },
                        grid:{ color:"rgba(255,255,255,0.08)" }
                    },
                    y:{
                        ticks:{ color:"#ffffff" },
                        grid:{ color:"rgba(255,255,255,0.08)" }
                    }
                }

            }

        });

    }

    /* -----------------------------
       Disaster Distribution
    ------------------------------ */

    const distributionCanvas=document.getElementById("distributionChart");

    if(distributionCanvas){

        new Chart(distributionCanvas,{

            type:"pie",

            data:{

                labels:[
                    "Flood",
                    "Cyclone",
                    "Wildfire",
                    "Earthquake"
                ],

                datasets:[{

                    data:[35,25,20,20],

                    backgroundColor:[
                        "#3B82F6",
                        "#F59E0B",
                        "#EF4444",
                        "#10B981"
                    ],

                    borderWidth:2,

                    borderColor:"#111827"

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{
                    legend:{
                        position:"bottom",
                        labels:{
                            color:"#ffffff"
                        }
                    }
                }

            }

        });

    }

    /* -----------------------------
       State-wise Alerts
    ------------------------------ */

    const stateCanvas=document.getElementById("stateChart");

    if(stateCanvas){

        new Chart(stateCanvas,{

            type:"bar",

            data:{

                labels:[
                    "Assam",
                    "Odisha",
                    "Kerala",
                    "Gujarat",
                    "Uttarakhand"
                ],

                datasets:[{

                    label:"Active Alerts",

                    data:[18,14,10,8,6],

                    backgroundColor:[
                        "#2563EB",
                        "#F97316",
                        "#10B981",
                        "#EF4444",
                        "#8B5CF6"
                    ]

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{
                        labels:{
                            color:"#ffffff"
                        }
                    }

                },

                scales:{

                    x:{
                        ticks:{
                            color:"#ffffff"
                        },
                        grid:{
                            color:"rgba(255,255,255,0.08)"
                        }
                    },

                    y:{
                        beginAtZero:true,
                        ticks:{
                            color:"#ffffff"
                        },
                        grid:{
                            color:"rgba(255,255,255,0.08)"
                        }
                    }

                }

            }

        });

    }


    /* -----------------------------
       AI Risk Score
    ------------------------------ */

    const riskCanvas = document.getElementById("riskChart");

    if(riskCanvas){

        new Chart(riskCanvas,{

            type:"doughnut",

            data:{

                labels:[
                    "High Risk",
                    "Remaining"
                ],

                datasets:[{

                    data:[82,18],

                    backgroundColor:[
                        "#EF4444",
                        "#374151"
                    ],

                    borderWidth:0,

                    cutout:"75%"

                }]

            },
        
            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        position:"bottom",

                        labels:{
                            color:"#ffffff"
                        }

                    },

                    tooltip:{

                        callbacks:{

                            label:function(context){

                                return context.raw + "%";

                            }

                        }

                    }

                }

            }

        });

    }
}
/* =====================================================
   APPLICATION START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});
