function loadContent(url, cssPath = null) {
  // Cargar CSS si no se ha cargado aún
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

      // Invocar funciones específicas si se carga articulos.html
      if (url.includes("articulos")) {
        if (typeof inicializarArticulos === "function") {
          inicializarArticulos(); // Ejecuta tu lógica personalizada
        }
      }

      // Reiniciar scripts internos si hay
      document.querySelectorAll("main script").forEach((script) => {
        const newScript = document.createElement("script");
        newScript.textContent = script.textContent;
        script.replaceWith(newScript);
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
  if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
    const initialContent = "<div>Contenido de Inicio</div>"; // o contenido real
    document.querySelector("main").innerHTML = initialContent;
  } else {
    loadContent(window.location.pathname);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  setupInternalLinks();
});
