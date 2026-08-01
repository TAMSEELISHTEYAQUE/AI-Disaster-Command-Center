/* =====================================================
   ENTERPRISE PAGE NAVIGATION
===================================================== */

function showWorkspacePage(pageId) {

    const safeId = pageId || "dashboardPage";

    document.querySelectorAll(".workspace-page").forEach((page) => {
        page.classList.remove("active-page");
    });

    const page = document.getElementById(safeId);
    if (page) {
        page.classList.add("active-page");
    }

    document.querySelectorAll("#navLinks li").forEach((item) => {
        item.classList.toggle("active", item.dataset.page === safeId);
    });

    const pageTitle = page?.querySelector("h2")?.textContent || "Dashboard";
    if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", `#${safeId}`);
    }
    document.title = `${pageTitle} | AI Disaster Command Center`;

}

function buildNavigationRoutes() {
    const navigation = IncidentDatabase.navigation || {};

    if (Array.isArray(navigation.routeAlternatives) && navigation.routeAlternatives.length) {
        return navigation.routeAlternatives;
    }

    return [
        { name: "Primary Rescue Corridor", status: navigation.safestRoute ? "Safe" : "Monitoring", eta: navigation.eta || "22 min", distance: navigation.distance || "18.4 km" },
        { name: "Northern Diversion Route", status: "Clear", eta: "28 min", distance: "21.1 km" },
        { name: "Medical Relief Spur", status: "Moderate", eta: "31 min", distance: "24.0 km" },
        { name: "Shelter Access Loop", status: "Alert", eta: "36 min", distance: "26.8 km" }
    ];
}

function buildVehicleTracking() {
    const navigation = IncidentDatabase.navigation || {};

    if (Array.isArray(navigation.vehicles) && navigation.vehicles.length) {
        return navigation.vehicles;
    }

    return [
        { unit: "R-14", type: "Ambulance", eta: "14 min", status: "En route", progress: 74 },
        { unit: "R-27", type: "Rescue Boat", eta: "18 min", status: "Clearing channel", progress: 62 },
        { unit: "M-09", type: "Medical Team", eta: "11 min", status: "On station", progress: 81 }
    ];
}

function simulateRoutePulse() {
    const navigation = IncidentDatabase.navigation || {};
    const pulse = Date.now() / 1000;

    navigation.safestRoute = true;
    navigation.blockedRoads = Math.max(1, Math.min(4, 2 + Math.round(Math.sin(pulse / 5) * 1.5)));
    navigation.distance = `${(18.4 + Math.sin(pulse / 7) * 1.8).toFixed(1)} km`;
    navigation.eta = `${Math.max(8, Math.round(22 + Math.sin(pulse / 6) * 6))} min`;
    navigation.routeSummary = `Primary rescue corridor is active with ${navigation.blockedRoads} blocked roads and 3 alternate options.`;

    const routeTemplates = [
        { name: "Primary Rescue Corridor", status: "Safe", eta: navigation.eta, distance: navigation.distance },
        { name: "Northern Diversion Route", status: "Clear", eta: `${Math.round(Number.parseFloat((navigation.distance || "18.4").replace(" km", "")) + 3.2)} min`, distance: `${(Number.parseFloat((navigation.distance || "18.4").replace(" km", "")) + 2.6).toFixed(1)} km` },
        { name: "Medical Relief Spur", status: "Moderate", eta: `${Math.round(Number.parseFloat((navigation.distance || "18.4").replace(" km", "")) + 7.2)} min`, distance: `${(Number.parseFloat((navigation.distance || "18.4").replace(" km", "")) + 5.4).toFixed(1)} km` }
    ];
    navigation.routeAlternatives = routeTemplates;

    navigation.vehicles = [
        { unit: "R-14", type: "Ambulance", eta: `${Math.max(8, 14 + Math.round(Math.sin(pulse / 4) * 3))} min`, status: "En route", progress: 72 + Math.round(Math.sin(pulse / 3) * 12) },
        { unit: "R-27", type: "Rescue Boat", eta: `${Math.max(11, 18 + Math.round(Math.cos(pulse / 4) * 4))} min`, status: "Clearing channel", progress: 58 + Math.round(Math.cos(pulse / 3) * 10) },
        { unit: "M-09", type: "Medical Team", eta: `${Math.max(7, 11 + Math.round(Math.sin(pulse / 5) * 2))} min`, status: "On station", progress: 79 + Math.round(Math.cos(pulse / 3) * 6) },
        { unit: "F-06", type: "Fire Unit", eta: `${Math.max(20, 26 + Math.round(Math.sin(pulse / 4) * 5))} min`, status: "Re-routing", progress: 52 + Math.round(Math.sin(pulse / 2) * 8) }
    ];
}

function initializeNavigation() {

    const navItems = document.querySelectorAll("#navLinks li");

    navItems.forEach((item) => {
        if (item.dataset.bound === "true") return;

        item.dataset.bound = "true";
        item.addEventListener("click", () => {
            showWorkspacePage(item.dataset.page);
            item.setAttribute("aria-current", "page");
        });
    });

    const hashTarget = window.location.hash.replace("#", "");
    const firstPage = document.getElementById(hashTarget) ? hashTarget : document.querySelector(".workspace-page")?.id || "dashboardPage";
    showWorkspacePage(firstPage);
    simulateRoutePulse();
    updateNavigationCenter();

    if (window.__navigationRefreshTimer) {
        clearInterval(window.__navigationRefreshTimer);
    }

    window.__navigationRefreshTimer = setInterval(() => {
        simulateRoutePulse();
        updateNavigationCenter();
    }, 8000);

}

function updateNavigationRouteList() {
    const target = document.getElementById("navigationRouteList");
    if (!target) return;

    const routes = buildNavigationRoutes();
    target.innerHTML = routes.map((route) => {
        const statusClass = route.status === "Safe" ? "safe" : route.status === "Moderate" ? "warning" : route.status === "Alert" ? "danger" : "";
        return `
            <div class="route-option ${statusClass}">
                <div>
                    <strong>${route.name}</strong>
                    <small>${route.status}</small>
                </div>
                <span>${route.eta} • ${route.distance}</span>
            </div>
        `;
    }).join("");
}

function updateNavigationVehicleList() {
    const target = document.getElementById("navigationVehicleList");
    if (!target) return;

    const vehicles = buildVehicleTracking();

    target.innerHTML = vehicles.map((vehicle) => `
        <li class="vehicle-item">
            <div class="vehicle-meta">
                <strong>${vehicle.unit}</strong>
                <small>${vehicle.type}</small>
            </div>
            <div class="vehicle-status">
                <span class="dot ${vehicle.status === "On station" ? "active" : "warn"}"></span>
                <span>${vehicle.status}</span>
            </div>
            <div class="vehicle-eta">ETA ${vehicle.eta}</div>
            <div class="mini-progress"><span style="width:${Math.min(100, Math.max(0, vehicle.progress || 0))}%"></span></div>
        </li>
    `).join("");
}

function updateNavigationCenter() {

    const navigation = IncidentDatabase.navigation || {};

    const destination = document.getElementById("navigationDestination");
    const distance = document.getElementById("navigationDistance");
    const eta = document.getElementById("navigationETA");
    const blocked = document.getElementById("blockedRoads");
    const status = document.getElementById("navigationStatus");
    const routeSummary = document.getElementById("navigationRouteSummary");

    if (destination) destination.textContent = navigation.destination || "--";
    if (distance) distance.textContent = navigation.distance || "--";
    if (eta) eta.textContent = navigation.eta || "--";
    if (blocked) blocked.textContent = navigation.blockedRoads ?? "--";
    if (status) status.textContent = navigation.safestRoute ? "Primary route active" : "Fallback route selected";
    if (routeSummary) routeSummary.textContent = navigation.routeSummary || "Primary route summary unavailable.";

    updateNavigationRouteList();
    updateNavigationVehicleList();

}