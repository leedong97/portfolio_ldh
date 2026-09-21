const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll('.site-nav a[href*="#"]');
const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const setNavOpen = (open) => {
  if (!nav || !toggle) return;
  nav.classList.toggle("is-open", open);
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
};

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    setNavOpen(!nav.classList.contains("is-open"));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => setNavOpen(false));
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
});

const sections = document.querySelectorAll("section[id]");

const highlightNav = () => {
  if (!sections.length) return;

  const offset = window.scrollY + 120;
  let current = "";

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const hash = href.includes("#") ? `#${href.split("#")[1]}` : href;
    link.classList.toggle("is-active", hash === `#${current}`);
  });
};

window.addEventListener("scroll", highlightNav);
highlightNav();
