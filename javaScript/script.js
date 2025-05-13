
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
      const navbarCollapse = document.getElementById("navbarSupportedContent");
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
});

