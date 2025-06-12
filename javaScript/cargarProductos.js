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
    nombre: "Atomy Cepillo Dental (x1)",
    precio: 12000,
    imagen: "images/atomy16.jpg",
    descripcion: "Las cerdas son suaves y flexibles con un grosor de 0,18mm y una punta de 0,03mm. Dientes y encías se sentirán frescos al remover todos los residuos y la placa.",
    categoria: "Salud"
  },
  {
    nombre: "HemoHIM (X60 sobres)",
    precio: 500000,
    imagen: "images/imagen7.jpg",
    descripcion: "HemoHIM es un suplemento alimenticio que ayuda a fortalecer el sistema inmunológico y mejorar la salud en general.",
    categoria: "Salud"
  },
  {
    nombre: "Mascarilla de Oro de 24K",
    precio: 80000,
    imagen: "images/atomy17.png",
    descripcion: "Revitaliza tu piel cansada durante el día entregándole oro 24K para revelar una piel transformada en la mañana.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/atomy1.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Salud"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/atomy2.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Moda"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/atomy7.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Moda"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/atomy8.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/atomy9.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/atomy10.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/atomy11.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Moda"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/atomy12.png",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/atomy13.jfif",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/atomy14.jfif",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Facial"
  },
  {
    nombre: "Set cuidado de la piel Hydra Brightening",
    precio: 320000,
    imagen: "images/imagen6.jpg",
    descripcion: "Hidratación intensa, luminosidad y frescura para tu rostro.",
    categoria: "Moda"
  }
];

const contenedor = document.getElementById("productosContainer");
const filtros = document.getElementById("filtrosCategorias");

const contarCategorias = () => {
  const conteos = {};
  productos.forEach(p => {
    conteos[p.categoria] = (conteos[p.categoria] || 0) + 1;
  });
  return conteos;
};

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

