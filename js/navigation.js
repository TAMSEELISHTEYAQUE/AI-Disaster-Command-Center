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

function initializeNavigation() {

    const navItems = document.querySelectorAll("#navLinks li");

    navItems.forEach((item) => {
        if (item.dataset.bound === "true") return;

        item.dataset.bound = "true";
        item.addEventListener("click", () => {
            showWorkspacePage(item.dataset.page);
        });
    });

    const hashTarget = window.location.hash.replace("#", "");
    const firstPage = document.getElementById(hashTarget) ? hashTarget : document.querySelector(".workspace-page")?.id || "dashboardPage";
    showWorkspacePage(firstPage);

}

function updateNavigationRouteList() {
    const target = document.getElementById("navigationRouteList");
    if (!target) return;

    const navigation = IncidentDatabase.navigation || {};
    const routes = Array.isArray(navigation.routeAlternatives) && navigation.routeAlternatives.length
        ? navigation.routeAlternatives
        : [
            { name: "Primary Rescue Corridor", status: navigation.safestRoute ? "Safe" : "Monitoring", eta: navigation.eta || "22 min", distance: navigation.distance || "18.4 km" },
            { name: "Northern Diversion Route", status: "Clear", eta: "28 min", distance: "21.1 km" },
            { name: "Medical Relief Spur", status: "Moderate", eta: "31 min", distance: "24.0 km" }
        ];

    target.innerHTML = routes.map((route) => `
        <div class="route-option ${route.status === "Safe" ? "safe" : route.status === "Moderate" ? "warning" : ""}">
            <div>
                <strong>${route.name}</strong>
                <small>${route.status}</small>
            </div>
            <span>${route.eta} • ${route.distance}</span>
        </div>
    `).join("");
}

function updateNavigationCenter() {

    const navigation = IncidentDatabase.navigation || {};

    const destination = document.getElementById("navigationDestination");
    const distance = document.getElementById("navigationDistance");
    const eta = document.getElementById("navigationETA");
    const blocked = document.getElementById("blockedRoads");
    const status = document.getElementById("navigationStatus");

    if (destination) destination.textContent = navigation.destination || "--";
    if (distance) distance.textContent = navigation.distance || "--";
    if (eta) eta.textContent = navigation.eta || "--";
    if (blocked) blocked.textContent = navigation.blockedRoads ?? "--";
    if (status) status.textContent = navigation.safestRoute ? "Primary route active" : "Fallback route selected";

    updateNavigationRouteList();

}