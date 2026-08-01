/* =====================================================
   AI DISASTER COMMAND CENTER
   DATA.JS - VERSION 2
===================================================== */

const IncidentDatabase = {

    /* =====================================================
       CURRENT INCIDENT
    ===================================================== */

    currentIncident: {

        incidentId: "ADC-2026-001",

        disasterType: "Flood",

        severity: "High",

        responseLevel: "Level 4",

        location: {

            country: "India",

            state: "Assam",

            district: "Barpeta",

            latitude: 26.20,

            longitude: 91.00

        },

        populationAffected: 1200000,

        aiConfidence: 98.4,

        status: "Active"

    },

    /* =====================================================
       DASHBOARD
    ===================================================== */

    dashboard: {

        satellites: 12,

        floodAlerts: 28,

        wildfireAlerts: 9,

        aiAccuracy: 98.4

    },

    /* =====================================================
       LIVE WEATHER
    ===================================================== */

    weather: {

        city: "Barpeta",

        temperature: "--",

        feelsLike: "--",

        humidity: "--",

        pressure: "--",

        rainfall: "--",

        windSpeed: "--",

        visibility: "--",

        condition: "--",

        icon: "",

        lastUpdated: "--"

    },

    /* =====================================================
       SATELLITE
    ===================================================== */

    satellite: {

        source: "Simulation",

        lastUpdated: "--",

        floodArea: 0,

        wildfireArea: 0,

        cloudCoverage: 0

    },

    /* =====================================================
       EARTHQUAKES
    ===================================================== */

    earthquakes: {

        magnitude: 0,

        depth: 0,

        latitude: 0,

        longitude: 0,

        lastUpdated: "--"

    },

    /* =====================================================
       RESOURCES
    ===================================================== */

    resources: {

        rescueTeams: 14,

        ambulances: 42,

        helicopters: 8,

        shelters: 28,

        hospitals: 17

    }
,

/* =====================================================
   MULTI-HAZARD INCIDENTS
===================================================== */

disasters: [

    {
        id: generateIncidentId("Flood"),
        type: "Flood",
        severity: "High",
        status: "Active",
        location: "Assam",
        coordinates: [26.20, 91.00],
        radius: 18000,
        recommendation: "Deploy rescue boats immediately."
    },

    {
        id: generateIncidentId("Cyclone"),
        type: "Cyclone",
        severity: "Moderate",
        status: "Monitoring",
        location: "Odisha",
        coordinates: [20.95, 85.09],
        radius: 22000,
        recommendation: "Prepare coastal evacuation."
    },

    {
        id: generateIncidentId("Wildfire"),
        type: "Wildfire",
        severity: "High",
        status: "Active",
        location: "Uttarakhand",
        coordinates: [30.06, 79.01],
        radius: 12000,
        recommendation: "Deploy aerial firefighting units."
    }

],

/* =====================================================
   ACTIVE MISSIONS
===================================================== */

missions: [

    {
        missionId: "MIS-001",
        incident: "Flood",
        commander: "Operator Alpha",
        status: "En Route",
        eta: "18 min",
        progress: 45
    }

],

/* =====================================================
   NAVIGATION
===================================================== */

navigation: {

    destination: "Flood Zone - Assam",

    distance: "18.4 km",

    eta: "22 min",

    safestRoute: true,

    blockedRoads: 2,

    alternativeRoutes: 3

},

/* =====================================================
   REPORTS
===================================================== */

reports: {

    totalReports: 18,

    latestReport: "AI_Disaster_Report.pdf",

    lastGenerated: "--"

},

/* =====================================================
   SYSTEM HEALTH
===================================================== */

systemHealth: {

    ai: "Online",

    satellite: "Connected",

    database: "Healthy",

    communication: "Online",

    navigation: "Ready"

}
};
