document.addEventListener("DOMContentLoaded", () => {

    fetch("partials/header.html")
        .then(res => res.text())
        .then(data => {
            const header = document.getElementById("header");
            if (header) header.innerHTML = data;
        });

    fetch("partials/footer.html")
        .then(res => res.text())
        .then(data => {
            const footer = document.getElementById("footer");
            if (footer) footer.innerHTML = data;
        });
document.addEventListener("DOMContentLoaded", () => {
    // Obtener todos los enlaces del menú
    const menuLinks = document.querySelectorAll(".menu a");

    // Obtener el path de la página actual
    const currentPath = window.location.pathname.split("/").pop();

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute("href");

        // Si coincide la página, marcamos el enlace
        if (linkPath === currentPath || (linkPath === "index.html" && currentPath === "")) {
            link.classList.add("active");
        }

        // Opcional: cuando se hace clic, también se activa inmediatamente
        link.addEventListener("click", () => {
            menuLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });
});

const menuLinks = document.querySelectorAll(".menu a");
window.addEventListener("scroll", () => {
    const fromTop = window.scrollY + 120; // +120 para compensar el header fijo

    menuLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute("href"));
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
            });
});

// Función para menú activo
window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + window.innerHeight / 2; // centro de la pantalla
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.menu a[href="#${id}"]`);
    if (scrollPos >= top && scrollPos < bottom) {
      menuLinks.forEach(l => l.classList.remove("active"));
      if (link) link.classList.add("active");
    }
  });
});


});

const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// scroll suave al hacer clic
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// -----------------------------
// Fade-in de secciones
// -----------------------------
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible"); // se oculta al salir (subiendo)
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

const menuLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + window.innerHeight / 2; // centro de pantalla
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.menu a[href="#${id}"]`);
    if (scrollPos >= top && scrollPos < bottom) {
      menuLinks.forEach(l => l.classList.remove("active"));
      if (link) link.classList.add("active");
    }
  });
});