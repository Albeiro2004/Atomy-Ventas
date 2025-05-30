
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  const btnInicio = document.getElementById("btnInicio");

  if (!btnInicio) {
    console.error("No se encontró el botón btnInicio en el DOM.");
    return;
  }

  // Cierra automáticamente el navbar al hacer clic en un enlace con data-bs-auto-close
  // Solo en dispositivos móviles y tablets (viewport width < 992px)
  document.querySelectorAll('[data-bs-auto-close="true"]').forEach((link) => {
    link.addEventListener("click", () => {
      // Verificar si el viewport es menor que 992px (breakpoint lg de Bootstrap)
      if (window.innerWidth < 992) {
        const navbarCollapse = document.getElementById(
          "navbarSupportedContent"
        );
        if (navbarCollapse) {
          const bsCollapse =
            bootstrap.Collapse.getInstance(navbarCollapse) ||
            new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // Mostrar el botón cuando el usuario baja
  window.addEventListener("scroll", function () {
    if (window.scrollY > 150) {
      btnInicio.style.display = "block";
    } else {
      btnInicio.style.display = "none";
    }
  });

  // Función para volver arriba con animación suave
  btnInicio.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const navLinks = document.querySelectorAll(".nav-link");

  // verificar si hay un enlace activo almacenado y lo aplica
  const activeLink = localStorage.getItem("activeNavLink");
  if (activeLink) {
    navLinks.forEach((link) => {
      if (link.href === activeLink) {
        link.classList.add("active");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      navLinks.forEach((l) => l.classList.remove("active"));

      this.classList.add("active");

      localStorage.setItem("activeNavLink", this.href);
    });
  });

});

function iniciarMapa() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("No es soportado por tu navegador");
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getMap(lat, lon);
  }

  function error() {
    alert("No se pudo obtener la ubicación");
  }

  function getMap(lat, lon) {
    const map = L.map("map").setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
      .bindPopup('Atomy Ventas')
      .openPopup();
  }
}



