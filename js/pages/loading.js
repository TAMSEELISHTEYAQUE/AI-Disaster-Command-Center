"use strict";

/*==========================================================
AI DISASTER COMMAND CENTER
LOADING SCRIPT
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const progressBar = document.getElementById("progressBar");
    const progressValue = document.getElementById("progressValue");
    const loadingPercent = document.getElementById("loadingPercent");

    const consoleLines = [
        ...document.querySelectorAll(".console-line")
    ];

    const statusAI = document.getElementById("statusAI");
    const statusSatellite = document.getElementById("statusSatellite");
    const statusDatabase = document.getElementById("statusDatabase");
    const statusMission = document.getElementById("statusMission");

    const particlesContainer =
        document.getElementById("particlesContainer");

    let progress = 0;

    let activeLine = 0;

    const bootSteps = [

        {
            percent:10,
            ai:"Booting",
            satellite:"Connecting",
            database:"Offline",
            mission:"Initializing"
        },

        {
            percent:25,
            ai:"Loading Models",
            satellite:"Connected",
            database:"Connecting",
            mission:"Synchronizing"
        },

        {
            percent:45,
            ai:"Neural Network Ready",
            satellite:"Receiving Data",
            database:"Connected",
            mission:"Analyzing"
        },

        {
            percent:65,
            ai:"Prediction Active",
            satellite:"Online",
            database:"Operational",
            mission:"Calibrating"
        },

        {
            percent:85,
            ai:"Operational",
            satellite:"Operational",
            database:"Operational",
            mission:"Final Checks"
        },

        {
            percent:100,
            ai:"ONLINE",
            satellite:"ONLINE",
            database:"ONLINE",
            mission:"MISSION READY"
        }

    ];

    createParticles();

    startBootSequence();

    /*======================================================
    BOOT
    ======================================================*/

    function startBootSequence() {

        const timer = setInterval(() => {

            progress++;

            updateProgress(progress);

            if (
                activeLine < consoleLines.length &&
                progress >= (activeLine + 1) * 10
            ) {

                consoleLines[activeLine]
                    .classList.add("active");

                consoleLines[activeLine]
                    .scrollIntoView({
                        behavior:"smooth",
                        block:"nearest"
                    });

                activeLine++;

            }

            updateStatus(progress);

            if (progress >= 100) {

                clearInterval(timer);

                finishStartup();

            }

        }, 60);

    }

    /*======================================================
    PROGRESS
    ======================================================*/

    function updateProgress(value) {

        progressBar.style.width = value + "%";

        progressValue.textContent = value + "%";

        loadingPercent.textContent = value + "%";

    }
        /*======================================================
    STATUS UPDATES
    ======================================================*/

    function updateStatus(value) {

        for (const step of bootSteps) {

            if (value >= step.percent) {

                statusAI.textContent = step.ai;
                statusSatellite.textContent = step.satellite;
                statusDatabase.textContent = step.database;
                statusMission.textContent = step.mission;

            }

        }

    }

    /*======================================================
    PARTICLES
    ======================================================*/

    function createParticles() {

        for (let i = 0; i < 40; i++) {

            const particle = document.createElement("span");

            particle.className = "adc-particle";

            particle.style.left = Math.random() * 100 + "%";

            particle.style.bottom = "-" + (Math.random() * 100) + "px";

            particle.style.animationDuration =
                (8 + Math.random() * 8) + "s";

            particle.style.animationDelay =
                (Math.random() * 6) + "s";

            particle.style.opacity =
                (0.2 + Math.random() * 0.6);

            particlesContainer.appendChild(particle);

        }

    }

    /*======================================================
    FINISH
    ======================================================*/

    function finishStartup() {

        statusMission.textContent = "MISSION READY";

        statusMission.style.color = "#36d67d";

        setTimeout(() => {

            window.location.replace("index.html");

        }, 1200);

    }

    /*======================================================
    PAGE VISIBILITY
    Pause animation when tab is hidden
    ======================================================*/

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            document.body.classList.add("paused");

        } else {

            document.body.classList.remove("paused");

        }

    });

});
