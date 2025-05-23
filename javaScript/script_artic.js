function inicializarArticulos() {
  // Configurar modal con datos del producto
  const productoModal = document.getElementById("productoModal");
  if (productoModal) {
    productoModal.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;
      const name = button.getAttribute("data-name");
      const price = button.getAttribute("data-price");
      const img = button.getAttribute("data-img");
      const des = button.getAttribute("data-text");

      const modalHeaderTitle = productoModal.querySelector("#modalTitle"); // <--- ID correcto
      const modalBodyTitle = productoModal.querySelector("#modal-title");
      const modalPrice = productoModal.querySelector("#modal-price");
      const modalImg = productoModal.querySelector("#modal-image");
      const modalDescripcion = productoModal.querySelector("#modal-description");

      modalHeaderTitle.textContent = name;
      modalBodyTitle.textContent = name;
      modalPrice.textContent = price;
      modalImg.src = img;
      modalImg.alt = name;
      modalDescripcion.textContent = des;
    });
  }

  // Buscar y mostrar productos
  const verMasBtn = document.getElementById('verMasBtn');
  const verMenosBtn = document.getElementById('verMenosBtn');
  const productosContainer = document.getElementById('productosContainer');
  const searchBar = document.getElementById('searchBar');

  if(productosContainer && verMasBtn && verMenosBtn){
    const allProducts = Array.from(productosContainer.querySelectorAll('.col'));
    const batchSize = 12;
    let visibleCount = batchSize;
    let filteredProducts = [...allProducts];

    function actualizarVista(){
      allProducts.forEach(p => p.style.display = 'none');
      filteredProducts.forEach((product, index) => {
        product.style.display = index < visibleCount ? 'block' : 'none';
      });
      verMasBtn.style.display = (visibleCount < filteredProducts.length) ? 'inline-block' : 'none';
      verMenosBtn.style.display = (visibleCount > batchSize) ? 'inline-block' : 'none';
    }

    if(searchBar){
      searchBar.addEventListener('keyup', function(){
        const term = this.value.toLowerCase();
        filteredProducts = allProducts.filter(product => {
          const title = product.querySelector('.card-title').textContent.toLowerCase();
          return title.includes(term);
        });
        visibleCount = batchSize;
        actualizarVista();
      });
    }

    verMasBtn.addEventListener('click', () => {
      visibleCount = Math.min(visibleCount + batchSize, filteredProducts.length);
      actualizarVista();
    });

    verMenosBtn.addEventListener('click', () => {
      visibleCount = Math.max(visibleCount - batchSize, batchSize);
      actualizarVista();
    });

    actualizarVista();
  }

  // Funciones del carrito
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  const carritoLista = document.getElementById('carrito-lista');
  const carritoTotal = document.getElementById('carrito-total');
  const carritoContador = document.getElementById('carrito-contador');

  actualizarCarrito();

  document.querySelectorAll('.agregar-carrito-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nombre = btn.dataset.name;
      const precio = parseFloat(btn.dataset.price.replace('$', '').replace(',', ''));
      const img = btn.dataset.img;

      const index = carrito.findIndex(p => p.nombre === nombre);

      if (index !== -1) {
        carrito[index].cantidad += 1;
      } else {
        carrito.push({ nombre, precio, img, cantidad: 1 });
      }


      actualizarCarrito();
    });
  });

  function actualizarCarrito() {
    carritoLista.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
      total += item.precio * item.cantidad;

      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-center align-items-center';
      li.innerHTML = `
          <div class="card border-0 shadow-sm rounded-3 w-100">
            <div class="card-body d-flex justify-content-between align-items-center">

              <!-- Imagen + nombre + precios -->
              <div class="d-flex align-items-center">
                <img src="${item.img}" width="80" class="rounded me-3 border">
                <div class="ms-4">
                  <h6 class="mb-1 fw-semibold">${item.nombre}</h6>
                  <div class="text-muted small">
                    <div>Precio: $${item.precio.toFixed(2)}</div>
                    <div>Subtotal: $${(item.precio * item.cantidad).toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <!-- Controles de cantidad y eliminar -->
              <div class="text-center ms-3">
                <div class="input-group input-group-sm mb-2" style="width: 110px;">
                  <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${index}, -1)">–</button>
                  <input type="text" class="form-control text-center bg-white" value="${item.cantidad}" readonly>
                  <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${index})">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </div>

            </div>
          </div>
      `;
      carritoLista.appendChild(li);
    });

    carritoTotal.textContent = total.toFixed(2);
    carritoContador.textContent = carrito.length;
    guardarCarrito();
  }

  window.cambiarCantidad = function(index, cambio) {
  const nuevaCantidad = carrito[index].cantidad + cambio;
  if (nuevaCantidad >= 1) {
    carrito[index].cantidad = nuevaCantidad;
  } else {
    carrito.splice(index, 1); // elimina si llega a 0
  }
  actualizarCarrito();
}


  window.eliminarDelCarrito = function(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }

  function agregarAlCarrito(nombre, precio, img) {
  const index = carrito.findIndex(item => item.nombre === nombre);

  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ nombre, precio, img, cantidad: 1 });
  }

  actualizarCarrito();
}

const botonModal = document.getElementById('modal-add-cart');
if (botonModal) {
  botonModal.addEventListener('click', () => {
    const nombre = document.getElementById('modal-title').textContent;
    const precioTexto = document.getElementById('modal-price').textContent;
    const precio = parseFloat(precioTexto.replace('$', '').replace(',', ''));
    const img = document.getElementById('modal-image').src;

    agregarAlCarrito(nombre, precio, img);

    cerrarModalProducto();
  });
}

  document.querySelector('#carritoModal .btn-success')?.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    if (confirm('¿Deseas finalizar la compra?')) {
      alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
      carrito = [];
      guardarCarrito();
      actualizarCarrito();
      const modal = bootstrap.Modal.getInstance(document.getElementById('carritoModal'));
      modal.hide();
      location.reload();      
    }
  });
}

function cerrarModalProducto() {
  const modalElement = document.getElementById('productoModal');

  // Obtener instancia del modal
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }

  // Forzar cierre de clases y backdrop si no se eliminan correctamente
  modalElement.classList.remove('show');
  modalElement.setAttribute('aria-hidden', 'true');
  modalElement.style.display = 'none';

  // Eliminar backdrop manualmente
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }

  // Restaurar scroll y estilos del body
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}
