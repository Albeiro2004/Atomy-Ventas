
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

