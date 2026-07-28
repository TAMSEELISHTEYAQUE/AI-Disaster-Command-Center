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

};