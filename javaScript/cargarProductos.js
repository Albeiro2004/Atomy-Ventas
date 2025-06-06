function cargarProd(){

const productos = [
  {
    nombre: "Pasta Dental 200g (x1)",
    precio: 27000,
    imagen: "images/atomy15.jpg",
    descripcion: "Contine efectos antiplaca, antibacterial y antiinflamatorio",
    categoria: "Salud"
  },
  {
    nombre: "Pasta Dental Sensitive (x 3 Unidades)",
    precio: 80000,
    imagen: "images/imagen5.jpg",
    descripcion: "Contine efectos antiplaca, antibacterial y antiinflamatorio",
    categoria: "Salud"
  },
  {
    nombre: "Cuidado Facial Piel 4 Pasos Ato",
    precio: 284000,
    imagen: "images/atomy3.jpg",
    descripcion: "Contine efectos antiplaca, antibacterial y antiinflamatorio",
    categoria: "Facial"
  },
  {
    nombre: "Protector Solar Beige",
    precio: 70000,
    imagen: "images/atomy4.jpg",
    descripcion: "Contine efectos antiplaca, antibacterial y antiinflamatorio",
    categoria: "Facial"
  },
  {
    nombre: "Bb Cream Atomy",
    precio: 60000,
    imagen: "images/atomy5.jpg",
    descripcion: "Contine efectos antiplaca, antibacterial y antiinflamatorio",
    categoria: "Salud"
  },
  {
    nombre: "Brillo Labial Atomy, SPF 15",
    precio: 76000,
    imagen: "images/atomy6.jpg",
    descripcion: "Tratamiento labial hidratante, enriquecido con bálsamo de rosas. 3,3g/0,11 oz",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel The Fame",
    precio: 468000,
    imagen: "images/fame.jpg",
    descripcion: "Limpieza profunda, hidratación, nutrición y elasticidad para tu piel.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Absolute",
    precio: 930000,
    imagen: "images/absolute.jpg",
    descripcion: "Regeneración celular, hidratación profunda y efecto antienvejecimiento.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Salud"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Moda"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Moda"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Moda"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/hydra.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Moda"
  }
];

const contenedor = document.getElementById("productosContainer");
const filtros = document.getElementById("filtrosCategorias");

// 1. Contar productos por categoría
const contarCategorias = () => {
  const conteos = {};
  productos.forEach(p => {
    conteos[p.categoria] = (conteos[p.categoria] || 0) + 1;
  });
  return conteos;
};

// 2. Generar botones de filtro
const generarBotonesFiltro = () => {
  const conteos = contarCategorias();
  const categorias = ["Todos", ...Object.keys(conteos)];
  
  filtros.innerHTML = "";
  
  categorias.forEach(cat => {
    const cantidad = cat === "Todos"
      ? productos.length
      : conteos[cat];

    const btn = document.createElement("button");
    btn.className = `btn ${cat === "Todos" ? "active" : ""}`;
    btn.textContent = cat === "Todos" ? "Todos" : cat;
    btn.dataset.categoria = cat;

    const badge = document.createElement("span");
    badge.className = "badge-categoria";
    badge.textContent = cantidad;

    btn.appendChild(badge);
    filtros.appendChild(btn);
  });
};

// 3. Mostrar productos
const mostrarProductos = (lista) => {
  contenedor.innerHTML = "";
  if (lista.length === 0) {
    contenedor.innerHTML = `<div class="col-12"><p class="text-center">No hay productos en esta categoría.</p></div>`;
    return;
  }

  lista.forEach(producto => {
    const card = `
      <div class="col">
        <div class="card product-card h-100 overflow-hidden">
        
          <img src="${producto.imagen}" class="card-img-top product-img" alt="${producto.nombre}"
            data-bs-toggle="modal"
            data-bs-target="#productoModal"
            data-name="${producto.nombre}"
            data-price="$ ${producto.precio.toLocaleString()}"
            data-img="${producto.imagen}"
            data-text="${producto.descripcion}">
          <div class="card-body"
            data-bs-toggle="modal"
            data-bs-target="#productoModal"
            data-name="${producto.nombre}"
            data-price="$ ${producto.precio.toLocaleString()}"
            data-img="${producto.imagen}"
            data-text="${producto.descripcion}">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text text-success fw-bold">$ ${producto.precio.toLocaleString()}</p>
              <p class="text-muted categoria"><i class="bi bi-tag-fill"></i> ${producto.categoria}</p>
          </div>
          <div class="card-footer bg-transparent">
            <button class="btn btn-success w-100 mt-2 agregar-carrito-btn"
              data-name="${producto.nombre}"
              data-price="$ ${producto.precio.toLocaleString()}"
              data-img="${producto.imagen}">
              Agregar al carrito <i class="fas fa-cart-plus ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    contenedor.innerHTML += card;
  });
};

// 4. Eventos de filtrado
filtros.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON" || e.target.parentElement.tagName === "BUTTON") {
    const btn = e.target.tagName === "BUTTON" ? e.target : e.target.parentElement;
    const categoria = btn.dataset.categoria;

    document.querySelectorAll(".filtros button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const lista = categoria === "Todos"
      ? productos
      : productos.filter(p => p.categoria === categoria);
    
    mostrarProductos(lista);
  }
});

// Inicialización
generarBotonesFiltro();
mostrarProductos(productos);



}

