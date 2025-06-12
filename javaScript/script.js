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

function iniciarMapa() {

const empresaCoords = [8.950829, -75.445915];
const empresaNombre = "Atomy Ventas";
const empresaDireccion = "¡Aquí nos encuentras!";

// Inicializar el mapa
const map = L.map('map').setView(empresaCoords, 13);

// Agregar tiles del mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Marcador de la empresa
const empresaMarker = L.marker(empresaCoords)
    .addTo(map)
    .bindPopup(`
        <b>${empresaNombre}</b><br>
        ${empresaDireccion}<br>
        <small>Haz clic en "Cómo Llegar" para ver la ruta</small>
    `);

// Crear el botón flotante
const routeBtn = document.createElement('button');
routeBtn.id = 'routeBtn';
routeBtn.className = 'route-button';
routeBtn.innerHTML = '<i class="bi bi-geo me-2"></i> Cómo Llegar';
document.querySelector('#map').parentElement.appendChild(routeBtn);

// Crear botón limpiar
const clearBtn = document.createElement('button');
clearBtn.id = 'clearBtn';
clearBtn.className = 'route-button';
clearBtn.innerHTML = '<i class="bi bi-x-circle me-2"></i> Limpiar';
clearBtn.style.right = '140px'; // Posicionarlo a la izquierda del botón principal
clearBtn.style.background = '#6c757d';
clearBtn.style.display = 'none'; // Oculto inicialmente
document.querySelector('#map').parentElement.appendChild(clearBtn);

// Variables para el control de rutas y ubicación del usuario
let routeControl = null;
let userMarker = null;
let userLocation = null;

// Función para mostrar mensajes (sin panel de info)
function showMessage(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Mostrar mensaje como popup temporal
    const popup = L.popup()
        .setLatLng(empresaCoords)
        .setContent(`<div style="text-align: center;"><strong>${message}</strong></div>`)
        .openOn(map);
}

// Función para obtener la ubicación del usuario
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('La geolocalización no está soportada por este navegador.'));
            return;
        }
        
        showMessage('Obteniendo tu ubicación...', 'loading');
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = [position.coords.latitude, position.coords.longitude];
                resolve(coords);
            },
            (error) => {
                let errorMessage = 'No se pudo obtener tu ubicación. ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Permiso denegado.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Ubicación no disponible.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Tiempo agotado.';
                        break;
                    default:
                        errorMessage += 'Error desconocido.';
                        break;
                }
                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    });
}

// Función para mostrar la ruta
function showRoute(startCoords, endCoords) {
    // Eliminar ruta anterior si existe
    if (routeControl) {
        map.removeControl(routeControl);
    }
    
    // Crear nueva ruta
    routeControl = L.Routing.control({
        waypoints: [
            L.latLng(startCoords[0], startCoords[1]),
            L.latLng(endCoords[0], endCoords[1])
        ],
        routeWhileDragging: false,
        geocoder: false,
        addWaypoints: false,
        createMarker: function(i, waypoint, n) {
            return null; // No crear marcadores automáticos
        },
        lineOptions: {
            styles: [
                { color: 'black', weight: 7, opacity: 0.5 },     // Borde (más grueso)
                { color: '#007bff', weight: 4, opacity: 0.9 }    // Línea principal (más fina encima)
            ]
        }
    }).addTo(map);
    
    // Ajustar vista para mostrar toda la ruta
    routeControl.on('routesfound', function(e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        
        showMessage(
            `Ruta: ${(summary.totalDistance / 1000).toFixed(1)} km, ${Math.round(summary.totalTime / 60)} min`,
            'success'
        );

        clearBtn.style.display = 'block';
        
        // Ajustar vista del mapa
        map.fitBounds([startCoords, endCoords], {padding: [20, 20]});
    });
    
    routeControl.on('routingerror', function(e) {
        showMessage('Error al calcular la ruta. Inténtalo de nuevo.', 'error');
    });
}

// Función principal para manejar el clic del botón
async function handleRouteClick() {
    try {
        routeBtn.disabled = true;
        routeBtn.textContent = '🔄 Calculando...';
        
        // Obtener ubicación del usuario
        userLocation = await getUserLocation();
        
        // Agregar marcador del usuario
        if (userMarker) {
            map.removeLayer(userMarker);
        }
        
        userMarker = L.marker(userLocation, {
            icon: L.divIcon({
                html: '<div style="background: #28a745; border: 2px solid white; border-radius: 50%; width: 20px; height: 20px;"></div>',
                className: 'user-location-marker',
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            })
        }).addTo(map).bindPopup('Tu ubicación actual');
        
        // Mostrar la ruta
        showRoute(userLocation, empresaCoords);
        
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        routeBtn.disabled = false;
        routeBtn.innerHTML = '<i class="bi bi-geo me-2"></i> Cómo Llegar';
    }

    clearBtn.addEventListener('click', () => {
    if (routeControl) {
        map.removeControl(routeControl);
        routeControl = null;
    }

    if (userMarker) {
        map.removeLayer(userMarker);
        userMarker = null;
    }

    clearBtn.style.display = 'none'; // Ocultar el botón limpiar después de limpiar
    map.setView(empresaCoords, 13);  // Recentrar en la empresa si quieres
});

}

// Event listener para el botón
routeBtn.addEventListener('click', handleRouteClick);

// Mostrar popup inicial de la empresa
setTimeout(() => {
    empresaMarker.openPopup();
}, 1000);
}

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