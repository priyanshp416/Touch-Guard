// main.js — Touch Guard site behavior

// 1) Set footer year automatically (safe)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


// 2) Cursor-following background light (safe)
const cursorLight = document.querySelector(".cursor-light");
if (cursorLight) {
  window.addEventListener("pointermove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    cursorLight.style.setProperty("--mx", x + "%");
    cursorLight.style.setProperty("--my", y + "%");
  });
}


// 3) Navigation between views + hash routing
// Each nav link: <a data-route="home">...</a>
// Each view:     <section class="view" data-view="home">...</section>

const navLinks = Array.from(document.querySelectorAll("nav a[data-route]"));
const views = Array.from(document.querySelectorAll(".view[data-view]"));

// Build a quick lookup of valid routes
const validRoutes = new Set(views.map(v => v.dataset.view));

// Show a route and optionally update URL hash
function show(route, { updateHash = true } = {}) {
  if (!validRoutes.has(route)) route = "home";

  // Highlight active nav
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.dataset.route === route);
  });

  // Show only the matching view
  views.forEach((v) => {
    v.classList.toggle("active", v.dataset.view === route);
  });

  // Update URL hash so you can share / bookmark
  if (updateHash) {
    const newHash = "#" + route;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
  }
}

// Get route from URL hash
function routeFromHash() {
  const h = (window.location.hash || "").replace("#", "").trim();
  return validRoutes.has(h) ? h : "home";
}


// Click on navbar switches view
navLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    show(a.dataset.route);
  });
});

// Click on any element with data-route-link="features" etc.
document.querySelectorAll("[data-route-link]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const route = a.dataset.routeLink;
    show(route);
  });
});

// Handle back/forward navigation
window.addEventListener("hashchange", () => {
  show(routeFromHash(), { updateHash: false });
});

// Initial load: show route from hash (or home)
show(routeFromHash(), { updateHash: false });
