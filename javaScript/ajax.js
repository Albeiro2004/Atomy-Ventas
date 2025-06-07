function loadContent(url) {

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

      if (html.includes('id="map"')) {
        iniciarMapa();
      }

      if (html.includes('id="mainProductos"')) {
        cargarProd();
        inicializarArticulos(); // Inicializar los artículos después de cargar el nuevo contenido
      }

      if (html.includes('id="mainCalendario"')) {
        iniciarCalendario();
      }

      if (html.includes('id="main-contacto"')) {
        iniform();
      }

      if (html.includes('id="main-noso"')) {
        galeria();
        modalMisionVision();
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth", // Efecto suave (opcional)
      });
      
      setupInternalLinks(); // Volver a activar los enlaces internos
    })
    .catch((err) => {
      console.error("Error al cargar:", err);
    });
}

// Cargar el contenido basado en hash actual
function loadFromHash() {
  const hash = location.hash ? location.hash.substring(1) : "index.html"; // por defecto
  loadContent(hash);
}

// Enlaces tipo <a href="#contacto.html"
function setupInternalLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href").substring(1);
      location.hash = `#${target}`; // Cambiar el hash (dispara hashchange)
      loadContent(target);
    });
  });
}

// Escuchar cambios de hash (navegación adelante/atrás)
window.addEventListener("hashchange", loadFromHash);

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  loadFromHash();
});
