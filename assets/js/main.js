// NAV - toggle robusto y accessible
(function () {
  const toggle = document.querySelector(".nav__toggle");
  const navList = document.getElementById("nav-list");

  if (!toggle || !navList) return;

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    navList.classList.add("open");
    navList.setAttribute("data-visible", "true");
    // opcional: bloquear scroll al abrir
    document.documentElement.style.overflow = "hidden";
  };

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    navList.classList.remove("open");
    navList.setAttribute("data-visible", "false");
    document.documentElement.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  // cerrar al clicar un enlace (mobile)
  navList.addEventListener("click", (e) => {
    if (e.target.matches(".nav__link")) closeMenu();
  });

  // cerrar con Escape y mantener foco accesible
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navList.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });

  // si redimensionas a desktop, aseguramos que el menú esté cerrado
  window.addEventListener("resize", () => {
    if (window.innerWidth > 880 && navList.classList.contains("open")) {
      closeMenu();
    }
  });

  // OPTIONAL: marcar link activo según scroll (pequeño helper)
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const links = Array.from(document.querySelectorAll(".nav__link"));
  const onScroll = () => {
    const scrollPos = window.scrollY + 80;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute("id");
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", onScroll);
  // init
  onScroll();
})();
const circle = document.getElementById("cursorCircle");

// Seguimiento del cursor
document.addEventListener("mousemove", (e) => {
  circle.style.top = e.clientY + "px";
  circle.style.left = e.clientX + "px";
});

// Detectar hover sobre los elementos
const targets = document.querySelectorAll(".hover-target");
targets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    circle.classList.add("hovered");
  });
  target.addEventListener("mouseleave", () => {
    circle.classList.remove("hovered");
  });
});
