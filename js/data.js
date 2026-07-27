/* =====================================================
   AI DISASTER COMMAND CENTER
   DATA.JS
===================================================== */

/* =====================================================
   CURRENT INCIDENT
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

/* =====================================================
   DASHBOARD DATA
===================================================== */

    dashboard: {

        satellites: 12,

        floodAlerts: 28,

        wildfireAlerts: 9,

        aiAccuracy: 98.4

    },

/* =====================================================
   WEATHER
===================================================== */

    weather: {

        temperature: 31,

        humidity: 92,

        rainfall: 210,

        windSpeed: 58,

        condition: "Heavy Rain"

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