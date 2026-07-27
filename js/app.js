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

    updateAISummary();

setInterval(updateAISummary,6000);

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

    "🔴 HIGH | Assam | Flood Warning | 2 min ago",

    "🟠 MEDIUM | Odisha | Cyclone Watch | 5 min ago",

    "🟡 MEDIUM | Uttarakhand | Wildfire Risk | 8 min ago",

    "🔵 LOW | Kerala | Heavy Rain | 12 min ago",

    "🔥 HIGH | Himachal | Forest Fire | 16 min ago",

    "🌍 LOW | Gujarat | Earthquake Watch | 20 min ago"

];

const aiSuggestions = [

    "🤖 Deploy Rescue Team Alpha | Confidence 98%",

    "📡 Increase Satellite Monitoring | Confidence 96%",

    "🏥 Prepare Emergency Shelters | Confidence 94%",

    "🚁 Dispatch Medical Helicopter | Confidence 97%",

    "📢 Issue Public Warning | Confidence 95%",

    "📍 Activate Emergency Command | Confidence 99%"

    
];
const aiSummaries = [

`🟢 Flood probability in Assam increased by 18%.
🛰 AI recommends deploying Rescue Team Alpha.
📍 Confidence: 98.4%`,

`🟠 Cyclone movement detected near Odisha.
🚁 Prepare 4 emergency helicopters.
📍 Confidence: 97.1%`,

`🔴 Wildfire hotspot detected in Uttarakhand.
🚒 Dispatch Fire Response Unit immediately.
📍 Confidence: 96.8%`,

`🌧 Heavy rainfall expected in Kerala.
🏥 Activate temporary medical camps.
📍 Confidence: 98.9%`,

`🌍 Minor seismic activity detected in Gujarat.
⚠ Continue satellite monitoring.
📍 Confidence: 95.7%`

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

        if (Chart.getChart(trendCanvas)) {
    Chart.getChart(trendCanvas).destroy();
}

new Chart(trendCanvas,{

            type:"line",

            data:{
                labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

                datasets:[{
    label:"Disasters",
    data:[12,18,15,21,17,24,20],

    borderColor:"#00D4FF",
    backgroundColor:"rgba(0,212,255,0.12)",

    borderWidth:3,

    pointRadius:5,
    pointHoverRadius:8,

    pointBackgroundColor:"#00D4FF",
    pointBorderColor:"#ffffff",
    pointBorderWidth:2,

    fill:true,

    tension:0.45
}]
            },

            options:{
    responsive:true,
    maintainAspectRatio:false,

    animation:{
        duration:1500,
        easing:"easeOutQuart"
    },

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

       if (Chart.getChart(distributionCanvas)) {
    Chart.getChart(distributionCanvas).destroy();
}

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

       if (Chart.getChart(stateCanvas)) {
    Chart.getChart(stateCanvas).destroy();
}

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

        if (Chart.getChart(riskCanvas)) {
    Chart.getChart(riskCanvas).destroy();
}

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
function updateAISummary(){

    const summary = document.getElementById("aiSummary");

    if(!summary) return;

    const random =
        aiSummaries[Math.floor(Math.random()*aiSummaries.length)];

    summary.innerHTML = `<p>${random.replace(/\n/g,"<br>")}</p>`;

}

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});

document.getElementById("generateReport").addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI Disaster Incident Report",20,20);

    doc.setFontSize(12);

    doc.text("Generated: " + new Date().toLocaleString(),20,35);

    doc.text("Satellites Online: 12",20,55);

    doc.text("Flood Alerts: 28",20,65);

    doc.text("Wildfire Alerts: 9",20,75);

    doc.text("AI Accuracy: 98%",20,85);

    doc.text("Recommended Action:",20,105);

    doc.text("- Deploy Rescue Teams",30,120);

    doc.text("- Increase Satellite Monitoring",30,130);

    doc.text("- Notify Local Authorities",30,140);

    doc.save("AI_Disaster_Report.pdf");

});
