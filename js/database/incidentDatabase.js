/* =====================================================
   AI DISASTER COMMAND CENTER
   DATA.JS - VERSION 2
===================================================== */

const IncidentDatabase = {

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

    dashboard: {
        satellites: 12,
        floodAlerts: 28,
        wildfireAlerts: 9,
        aiAccuracy: 98.4,
        activeFilter: null,
        activeRange: "today"
    },

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

    satellite: {
        source: "Simulation",
        lastUpdated: "--",
        floodArea: 0,
        wildfireArea: 0,
        cloudCoverage: 0
    },

    earthquakes: {
        magnitude: 0,
        depth: 0,
        latitude: 0,
        longitude: 0,
        lastUpdated: "--"
    },

    resources: {
        rescueTeams: 14,
        ambulances: 42,
        helicopters: 8,
        shelters: 28,
        hospitals: 17,
        NDRF: 12,
        Army: 9,
        Police: 18,
        Fire: 10,
        Medical: 14,
        Boats: 5,
        Drones: 12,
        ReliefCamps: 16
    },

    disasters: [
        {
            id: "ADC-2026-FLD-00001",
            type: "Flood",
            severity: "High",
            status: "Active",
            location: "Assam",
            state: "Assam",
            coordinates: [26.20, 91.00],
            radius: 18000,
            recommendation: "Deploy rescue boats immediately.",
            populationAffected: 1200000,
            lastUpdated: "Just now",
            riskLevel: "High",
            resourcesDeployed: 18
        },
        {
            id: "ADC-2026-CYC-00002",
            type: "Cyclone",
            severity: "Moderate",
            status: "Monitoring",
            location: "Odisha",
            state: "Odisha",
            coordinates: [20.95, 85.09],
            radius: 22000,
            recommendation: "Prepare coastal evacuation.",
            populationAffected: 950000,
            lastUpdated: "5 min ago",
            riskLevel: "Moderate",
            resourcesDeployed: 12
        },
        {
            id: "ADC-2026-WLF-00003",
            type: "Wildfire",
            severity: "High",
            status: "Active",
            location: "Uttarakhand",
            state: "Uttarakhand",
            coordinates: [30.06, 79.01],
            radius: 12000,
            recommendation: "Deploy aerial firefighting units.",
            populationAffected: 320000,
            lastUpdated: "12 min ago",
            riskLevel: "High",
            resourcesDeployed: 11
        }
    ],

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

    navigation: {
        destination: "Flood Zone - Assam",
        distance: "18.4 km",
        eta: "22 min",
        safestRoute: true,
        blockedRoads: 2,
        alternativeRoutes: 3,
        routeSummary: "Primary rescue corridor is active with 2 blocked roads and 3 alternate options.",
        routeAlternatives: [
            { name: "Primary Rescue Corridor", status: "Safe", eta: "22 min", distance: "18.4 km" },
            { name: "Northern Diversion Route", status: "Clear", eta: "28 min", distance: "21.1 km" },
            { name: "Medical Relief Spur", status: "Moderate", eta: "31 min", distance: "24.0 km" }
        ],
        vehicles: [
            { unit: "R-14", type: "Ambulance", eta: "14 min", status: "En route", progress: 74 },
            { unit: "R-27", type: "Rescue Boat", eta: "18 min", status: "Clearing channel", progress: 62 },
            { unit: "M-09", type: "Medical Team", eta: "11 min", status: "On station", progress: 81 },
            { unit: "F-06", type: "Fire Unit", eta: "26 min", status: "Re-routing", progress: 56 }
        ]
    },

    reports: {
        totalReports: 18,
        latestReport: "AI_Disaster_Report.pdf",
        lastGenerated: "--"
    },

    systemHealth: {
        ai: "Online",
        satellite: "Connected",
        database: "Healthy",
        communication: "Online",
        navigation: "Ready"
    }
};