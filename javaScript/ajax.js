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
    .then((response) => {
      if (!response.ok) throw new Error("No encontrado");
      return response.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newContent = doc.querySelector("main").innerHTML;
      document.querySelector("main").innerHTML = newContent;

      // Volver a insertar scripts
      const scripts = doc.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        document.body.appendChild(newScript);
      });

      setupInternalLinks(); // Volver a activar los enlaces internos
    })
    .catch((err) => {
      console.error("Error al cargar:", err);
      loadContent("404.html"); // cargar tu página 404 si falla
    });
}

// Cargar el contenido basado en hash actual
function loadFromHash() {
  const hash = location.hash ? location.hash.substring(1) : "index.html"; // por defecto
  const css = document.querySelector(`a[href="#${hash}"]`)?.getAttribute("data-css") || null;
  loadContent(hash, css);
}

// Enlaces tipo <a href="#contacto.html" data-css="css/contacto.css">
function setupInternalLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href").substring(1);
      const css = link.getAttribute("data-css");
      location.hash = `#${target}`; // Cambiar el hash (dispara hashchange)
      loadContent(target, css);
    });
  });
}

// Escuchar cambios de hash (navegación adelante/atrás)
window.addEventListener("hashchange", loadFromHash);

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  loadFromHash();
});
