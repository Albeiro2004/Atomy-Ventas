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
  }

  // Cierra automáticamente el navbar al hacer clic en cualquier enlace del menú
  // Solo en dispositivos móviles y tablets (viewport width < 992px)
  document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    link.addEventListener("click", () => {
      // Verificar si el viewport es menor que 992px (breakpoint lg de Bootstrap)
      if (window.innerWidth < 992) {
        const navbarCollapse = document.getElementById("navbarSupportedContent");
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || 
                    new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // Mostrar el botón cuando el usuario baja (solo si existe)
  if (btnInicio) {
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
  }

  const navLinks = document.querySelectorAll(".nav-link");

  // Verificar si hay un enlace activo almacenado y lo aplica
  const activeLink = localStorage.getItem("activeNavLink");
  if (activeLink) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
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

let map;

  function iniciarMapa() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Tu navegador no soporta geolocalización.");
    }

    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      if (map !== undefined) {
        map.remove();
      }

      map = L.map("map").setView([lat, lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Punto de destino: ATOMY VENTAS
      const destino = [8.950829, -75.445915];

      // Mostrar ruta desde ubicación hasta el destino
      L.Routing.control({
        waypoints: [
          L.latLng(lat, lon),      // Origen: ubicación actual del usuario
          L.latLng(destino[0], destino[1])  // Destino
        ],
        language: 'es',
        routeWhileDragging: false,
        showAlternatives: true,
        createMarker: function(i, wp, nWps) {
          if (i === 0) {
            return L.marker(wp.latLng).bindPopup("Tu ubicación").openPopup();
          } else if (i === nWps - 1) {
            return L.marker(wp.latLng).bindPopup("Destino: Atomy Ventas");
          } else {
            return L.marker(wp.latLng);
          }
        }
      }).addTo(map);
    }

    function error() {
      alert("No se pudo obtener tu ubicación.");
    }
  }

  iniciarMapa();

  function iniciarCalendario() {

  let currentDate = new Date();
        
        // Eventos de ejemplo
        const events = {
            '2025-06-05': ['congreso'],
            '2025-06-12': ['reunion'],
            '2025-06-18': ['reunion'],
            '2025-06-25': ['capacitacion', 'reunion'],
            '2025-07-03': ['capacitacion'],
            '2025-07-10': ['reunion'],
            '2025-07-17': ['congreso'],
            '2025-07-24': ['capacitacion'],
            '2025-05-28': ['congreso'],
            '2025-05-15': ['reunion'],
        };
        
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        
        function generateCalendar(year, month) {
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const today = new Date();
            
            // Actualizar el título
            document.getElementById('monthYear').textContent = 
                `${monthNames[month]} ${year}`;
            
            // Limpiar el calendario
            const calendarBody = document.getElementById('calendarBody');
            calendarBody.innerHTML = '';
            
            // Obtener el primer día de la semana (0 = domingo)
            let startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());
            
            // Generar 5 semanas
            for (let week = 0; week < 5; week++) {
                const row = document.createElement('tr');
                
                for (let day = 0; day < 7; day++) {
                    const cell = document.createElement('td');
                    const currentDay = new Date(startDate);
                    currentDay.setDate(startDate.getDate() + (week * 7) + day);
                    
                    const button = document.createElement('button');
                    button.className = 'day-cell';
                    button.textContent = currentDay.getDate();
                    
                    // Verificar si es el día actual
                    if (currentDay.toDateString() === today.toDateString()) {
                        button.classList.add('today');
                    }
                    
                    // Verificar si es de otro mes
                    if (currentDay.getMonth() !== month) {
                        button.classList.add('other-month');
                    }
                    
                    // Agregar eventos
                    const dateKey = currentDay.toISOString().split('T')[0];
                    if (events[dateKey]) {
                        events[dateKey].forEach(eventType => {
                            const dot = document.createElement('div');
                            dot.className = `event-dot ${eventType}`;
                            button.appendChild(dot);
                        });
                    }
                    
                    // Agregar evento de click
                    button.addEventListener('click', () => {
                        const dayEvents = events[dateKey] || [];
                        if (dayEvents.length > 0) {
                            const eventNames = dayEvents.map(type => {
                                switch(type) {
                                    case 'congreso': return 'CONGRESO';
                                    case 'reunion': return 'REUNIÓN';
                                    case 'capacitacion': return 'CAPACITACIÓN';
                                    default: return type;
                                }
                            });
                            alert(`Eventos del ${currentDay.getDate()}/${currentDay.getMonth() + 1}/${currentDay.getFullYear()}:\n\n• ${eventNames.join('\n• ')}`);
                        }
                    });
                    
                    cell.appendChild(button);
                    row.appendChild(cell);
                }
                
                calendarBody.appendChild(row);
            }
        }
        
        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        }
        
        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        }      

        window.previousMonth = previousMonth;
        window.nextMonth = nextMonth;

            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

} 

function modalMisionVision() {

        const misionBtn = document.getElementById('misionBtn');
        const visionBtn = document.getElementById('visionBtn');
        const misionModal = document.getElementById('misionModal');
        const visionModal = document.getElementById('visionModal');
        const closeBtns = document.querySelectorAll('.close-btn');
        
        // Open modals
        misionBtn.addEventListener('click', () => {
            misionModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        visionBtn.addEventListener('click', () => {
            visionModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close modals
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                misionModal.classList.remove('active');
                visionModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close when clicking outside modal content
        window.addEventListener('click', (e) => {
            if (e.target === misionModal) {
                misionModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (e.target === visionModal) {
                visionModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                misionModal.classList.remove('active');
                visionModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
}