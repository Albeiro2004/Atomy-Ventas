
function loadContent(url, cssPath = null) {
  if (cssPath) {
    const existingLink = document.querySelector(`link[href="${cssPath}"]`);
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath;
      document.head.appendChild(link);
    }
  }

  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newContent = doc.querySelector("main").innerHTML;
      document.querySelector("main").innerHTML = newContent;

      // Reinsertar scripts (inline y externos)
      const scripts = doc.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.onload = () => {
            if (url.includes("articulos.html") && typeof inicializarArticulos === "function") {
              inicializarArticulos(); // ⚡ Ejecutar función cuando cargue el script
            }
          };
        } else {
          newScript.textContent = oldScript.textContent;
        }
        document.body.appendChild(newScript);
      });

      setupInternalLinks();
      history.pushState({}, "", url);
    })
    .catch((err) => console.error("Error al cargar:", err));
}

function setupInternalLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

document.querySelectorAll('#menu-nav a:not([target="_blank"])').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const css = link.getAttribute("data-css");
    loadContent(link.href, css);
  });
});

window.addEventListener("popstate", () => {
  // Redirige siempre a index.html
  window.location.href = "/index.html";
});


document.addEventListener("DOMContentLoaded", () => {
  setupInternalLinks();
});
