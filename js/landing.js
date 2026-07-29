/* ==========================================================
STICKY HEADER
========================================================== */

function initStickyHeader() {

    const header = document.querySelector(".adc-header");

    if (!header) return;

    let headerTicking = false;

    window.addEventListener("scroll", () => {

        if (headerTicking) return;

        requestAnimationFrame(() => {

            if (window.scrollY > 60) {

                header.style.background = "rgba(5,13,24,.96)";
                header.style.backdropFilter = "blur(22px)";
                header.style.boxShadow = "0 12px 35px rgba(0,0,0,.35)";

            } else {

                header.style.background = "rgba(7,17,31,.75)";
                header.style.backdropFilter = "blur(18px)";
                header.style.boxShadow = "none";

            }

            headerTicking = false;

        });

        headerTicking = true;

    });

}

/* ==========================================================
SMOOTH SCROLL
========================================================== */

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 80,

                behavior: "smooth"

            });

        });

    });

}

/* ==========================================================
ACTIVE NAVIGATION
========================================================== */

function initActiveNavigation() {

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".adc-nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/* ==========================================================
HERO BUTTONS
========================================================== */

function initHeroButtons() {

    const buttons = document.querySelectorAll(".adc-btn");

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-3px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

}
/* ==========================================================
BUTTON RIPPLE
========================================================== */

function initRippleButtons(){

    const buttons =
        document.querySelectorAll(".adc-btn");

    buttons.forEach(button=>{

        button.addEventListener("click",e=>{

            const ripple =
                document.createElement("span");

            ripple.className =
                "adc-ripple";

            const rect =
                button.getBoundingClientRect();

            ripple.style.left =
                (e.clientX-rect.left)+"px";

            ripple.style.top =
                (e.clientY-rect.top)+"px";

            button.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },600);

        });

    });

}
/* ==========================================================
SCROLL REVEAL ANIMATION
========================================================== */

function initScrollReveal() {

    const elements = document.querySelectorAll(
        ".adc-overview-card, .adc-feature-card, .adc-step, .adc-tech-card, .adc-metric"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-in");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    elements.forEach(element => {

        observer.observe(element);

    });

}

/* ==========================================================
METRIC COUNTER ANIMATION
========================================================== */

function animateCounter(element, target) {

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 60));

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(timer);

        }

        element.textContent = current;

    }, 25);

}

function initMetricCounters() {

    const counters = document.querySelectorAll("[data-counter]");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const element = entry.target;

            const target = Number(element.dataset.counter);

            animateCounter(element, target);

            observer.unobserve(element);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => observer.observe(counter));

}

/* ==========================================================
DASHBOARD PREVIEW FLOAT EFFECT
========================================================== */

function initDashboardAnimation() {

    const dashboard = document.querySelector(".adc-dashboard-preview");

    if (!dashboard) return;

    let direction = 1;

    setInterval(() => {

        dashboard.style.transform =
            `translateY(${direction * 8}px)`;

        direction *= -1;

    }, 1800);

}

/* ==========================================================
CARD HOVER EFFECT
========================================================== */

function initCardHoverEffects() {

    const cards = document.querySelectorAll(

        ".adc-overview-card," +
        ".adc-feature-card," +
        ".adc-tech-card," +
        ".adc-step"

    );

    cards.forEach(card => {

        card.addEventListener("mousemove", () => {

            card.style.borderColor = "rgba(14,165,233,.35)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.borderColor = "";

        });

    });

}

/* ==========================================================
BACK TO TOP BUTTON
========================================================== */

function initBackToTop() {

    const button = document.createElement("button");

    button.className = "adc-back-to-top";

    button.innerHTML = '<i class="fas fa-arrow-up"></i>';

    button.setAttribute("aria-label", "Back to top");

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================================
KEYBOARD ACCESSIBILITY
========================================================== */

function initKeyboardAccessibility() {

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            document.activeElement.blur();

        }

    });

}

/* ==========================================================
LAZY IMAGE HANDLER
========================================================== */

function initLazyImages() {

    const images = document.querySelectorAll("img[data-src]");

    if (!images.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const image = entry.target;

            image.src = image.dataset.src;

            image.removeAttribute("data-src");

            observer.unobserve(image);

        });

    });

    images.forEach(image => observer.observe(image));

}

/* ==========================================================
PARALLAX HERO EFFECT
========================================================== */

function initHeroParallax() {

    const hero = document.querySelector(".adc-hero");

    if (!hero) return;

    window.addEventListener("scroll", () => {

        const offset = window.scrollY * 0.2;

        hero.style.backgroundPositionY = `${offset}px`;

    });

}

/* ==========================================================
WINDOW RESIZE HANDLER
========================================================== */

function initResizeHandler() {

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            console.log("Layout updated.");

        }, 200);

    });

}
/* ==========================================================
SCROLL PROGRESS BAR
========================================================== */

function initScrollProgress(){

    const progress =
        document.querySelector(".adc-scroll-progress-bar");

    if(!progress) return;

    let ticking = false;

    function update(){

        const scrollTop =
            window.pageYOffset;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            (scrollTop / documentHeight) * 100;

        progress.style.width =
            percentage + "%";

        ticking = false;

    }

    window.addEventListener("scroll",()=>{

        if(!ticking){

            requestAnimationFrame(update);

            ticking = true;

        }

    });

}
/* ==========================================================
INITIALISE APPLICATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initStickyHeader();

    initSmoothScroll();

    initScrollReveal();

    initActiveNavigation();

    initHeroButtons();

    initMetricCounters();

    initDashboardAnimation();

    initCardHoverEffects();

    initBackToTop();

    initKeyboardAccessibility();

    initLazyImages();

    initHeroParallax();

    initResizeHandler();

    initScrollProgress();

    initRippleButtons();

});
/* ==========================================================
END OF FILE
========================================================== */

console.log(
    "%cAI Disaster Command Center Landing Page Loaded",
    "color:#38BDF8;font-size:14px;font-weight:bold;"
);