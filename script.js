// script.js — minimal (needed up to the About section)
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav    = document.getElementById("nav-menu");
  const close  = document.getElementById("menu-close");

  // --- Menu open/close (hidden + aria) ---
  function openMenu() {
    if (!nav) return;
    nav.hidden = false;
    toggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // lock body scroll
  }
  function closeMenu() {
    if (!nav) return;
    nav.hidden = true;
    toggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = ""; // release scroll lock
  }

  toggle?.addEventListener("click", () => {
    if (!nav) return;
    nav.hidden ? openMenu() : closeMenu();
  });

  close?.addEventListener("click", closeMenu);

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav || nav.hidden) return;
    const clickedOutside = !nav.contains(e.target) && !toggle?.contains(e.target);
    if (clickedOutside) closeMenu();
  });

  // Close on Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // --- Set active link (desktop + mobile nav) ---
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('nav a[href]').forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;

    // active if same page or same #anchor
    const isSamePage = href.toLowerCase() === here;
    const isSameAnchor = href.startsWith("#") && href === location.hash;
    if (isSamePage || isSameAnchor) a.classList.add("active");

    // close the menu on mobile when a link is clicked
    a.addEventListener("click", () => {
      if (href.startsWith("#")) closeMenu();
    });
  });
});
