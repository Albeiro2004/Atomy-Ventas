function galeria() {
  const carousel = document.getElementById("mainCarousel");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const currentImageSpan = document.getElementById("currentImage");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const loadingOverlay = document.getElementById("loadingOverlay");

  // Actualizar thumbnails activos
  function updateActiveThumbnail(activeIndex) {
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle("active", index === activeIndex);
    });
    currentImageSpan.textContent = activeIndex + 1;
  }

  // Event listener para cambios de slide
  carousel.addEventListener("slide.bs.carousel", function (e) {
    updateActiveThumbnail(e.to);
  });

  // Event listeners para thumbnails
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function () {
      const carouselInstance = bootstrap.Carousel.getInstance(carousel);
      carouselInstance.to(index);
      updateActiveThumbnail(index);
    });
  });

  // Lightbox functionality
  const mainImages = document.querySelectorAll(".carousel-item img");

  mainImages.forEach((img) => {
    img.addEventListener("click", function () {
      loadingOverlay.classList.add("show");
      const fullSrc = this.getAttribute("data-full") || this.src;

      const tempImg = new Image();
      tempImg.onload = function () {
        lightboxImage.src = fullSrc;
        lightbox.classList.add("active");
        loadingOverlay.classList.remove("show");
        document.body.style.overflow = "hidden";
      };
      tempImg.src = fullSrc;
    });
  });

  // Cerrar lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      lightboxImage.src = "";
    }, 300);
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Cerrar lightbox con tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  // Precargar imágenes para mejor rendimiento
  function preloadImages() {
    mainImages.forEach((img) => {
      const fullSrc = img.getAttribute("data-full");
      if (fullSrc) {
        const preloadImg = new Image();
        preloadImg.src = fullSrc;
      }
    });
  }

  // Inicializar
  setTimeout(preloadImages, 1000);

  // Pausar carousel al hacer hover
  carousel.addEventListener("mouseenter", function () {
    bootstrap.Carousel.getInstance(carousel).pause();
  });

  carousel.addEventListener("mouseleave", function () {
    bootstrap.Carousel.getInstance(carousel).cycle();
  });

  // Animación suave para las transiciones
  carousel.addEventListener("slid.bs.carousel", function () {
    const activeImg = carousel.querySelector(".carousel-item.active img");
    activeImg.style.transform = "scale(1.02)";

    setTimeout(() => {
      activeImg.style.transform = "scale(1)";
    }, 600);
  });
}
