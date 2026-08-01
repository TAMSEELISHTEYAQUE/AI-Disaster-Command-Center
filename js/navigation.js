/* =====================================================
   ENTERPRISE PAGE NAVIGATION
===================================================== */

function showWorkspacePage(pageId) {

    const safeId = pageId || "dashboardPage";

    document
        .querySelectorAll(".workspace-page")
        .forEach(page => {
            page.classList.remove("active-page");
        });

    const page = document.getElementById(safeId);

    if (page) {
        page.classList.add("active-page");
    }

    document
        .querySelectorAll("#navLinks li")
        .forEach(item => {
            item.classList.toggle("active", item.dataset.page === safeId);
        });

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

    const firstPage = document.querySelector(".workspace-page")?.id || "dashboardPage";
    showWorkspacePage(firstPage);

}