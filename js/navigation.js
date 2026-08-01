/* =====================================================
   ENTERPRISE PAGE NAVIGATION
===================================================== */

function showWorkspacePage(pageId) {

    document
        .querySelectorAll(".workspace-page")
        .forEach(page => {

            page.classList.remove("active-page");

        });

    const page = document.getElementById(pageId);

    if (page) {

        page.classList.add("active-page");

    }

    document
        .querySelectorAll("#navLinks li")
        .forEach(item => {

            item.classList.remove("active");

        });

    const active = document.querySelector(
        `[data-page="${pageId}"]`
    );

    if (active) {

        active.classList.add("active");

    }

}

function initializeNavigation() {

    document
        .querySelectorAll("#navLinks li")
        .forEach(item => {

            item.addEventListener("click", () => {

                showWorkspacePage(
                    item.dataset.page
                );

            });

        });

}