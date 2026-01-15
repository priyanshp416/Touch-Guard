// 1) Set footer year automatically
document.getElementById("year").textContent = new Date().getFullYear();


// 2) Cursor-following background light
// This updates CSS variables --mx and --my as the mouse moves.
const cursorLight = document.querySelector(".cursor-light");

window.addEventListener("pointermove", (e) => {
  const x = (e.clientX / innerWidth) * 100;
  const y = (e.clientY / innerHeight) * 100;

  cursorLight.style.setProperty("--mx", x + "%");
  cursorLight.style.setProperty("--my", y + "%");
});


// 3) Simple navigation between sections (views)
// Each section has: <section class="view" data-view="home"> ... </section>
// Each nav link has: <a data-route="home">...</a>
const navLinks = document.querySelectorAll("nav a");
const views = document.querySelectorAll(".view");

function show(route) {
  // Highlight active nav
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.dataset.route === route);
  });

  // Show only the matching view
  views.forEach((v) => {
    v.classList.toggle("active", v.dataset.view === route);
  });
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
    show(a.dataset.routeLink);
  });
});
