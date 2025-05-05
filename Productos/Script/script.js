
        document.addEventListener('DOMContentLoaded', function() {
        
            // Configurar modal con datos del producto
            const productoModal = document.getElementById('productoModal');
            if (productoModal) {
                productoModal.addEventListener('show.bs.modal', function(event) {
                    const button = event.relatedTarget;
                    const name = button.getAttribute('data-name');
                    const price = button.getAttribute('data-price');
                    const img = button.getAttribute('data-img');
                    
                    const modalTitle = productoModal.querySelector('.modal-title');
                    const modalBodyTitle = productoModal.querySelector('#modal-title');
                    const modalPrice = productoModal.querySelector('#modal-price');
                    const modalImg = productoModal.querySelector('#modal-image');
                    
                    modalTitle.textContent = name;
                    modalBodyTitle.textContent = name;
                    modalPrice.textContent = price;
                    modalImg.src = img;
                    modalImg.alt = name;
                });
            }
                
            //Funcionalidad de buscar y mostrar con límites (Juntas)
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
                const term = this.ariaValueMax.toLowerCase();
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
  
          // Mostrar inicial
          actualizarVista();

          }

        });
    
//funciones del carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
  const carritoLista = document.getElementById('carrito-lista');
  const carritoTotal = document.getElementById('carrito-total');
  const carritoContador = document.getElementById('carrito-contador');

  document.querySelectorAll('.agregar-carrito-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nombre = btn.dataset.name;
      const precio = parseFloat(btn.dataset.price.replace('$', '').replace(',', ''));
      const img = btn.dataset.img;

      carrito.push({ nombre, precio, img });
      actualizarCarrito();
    });
  });

  function actualizarCarrito() {
    carritoLista.innerHTML = '';
    let total = 0;
  
    carrito.forEach((item, index) => {
      total += item.precio;
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${item.img}" width="50" class="me-3">
          <div>
            <h6 class="mb-0">${item.nombre}</h6>
            <small class="text-muted">$${item.precio.toFixed(2)}</small>
          </div>
        </div>
        <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">&times;</button>
      `;
      carritoLista.appendChild(li);
    });
  
    carritoTotal.textContent = total.toFixed(2);
    carritoContador.textContent = carrito.length;
    guardarCarrito();
  }
  
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }
  
  //Simular compra
  document.querySelector('#carritoModal .btn-success').addEventListener('click', () => {
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
    }
  });
  
