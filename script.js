/* =====================
   CARROSSEL
===================== */
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;
    let interval = null;
    const slideCount = slides.length;

    // Função para mostrar o slide correto
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
      });
    }

    // Próximo slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      showSlide(currentIndex);
    }

    // Slide anterior
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      showSlide(currentIndex);
    }

    // Inicializa o carrossel
    showSlide(currentIndex);

    // Eventos dos botões
    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });

    // Avanço automático
    function startInterval() {
      interval = setInterval(nextSlide, 5000); // muda a cada 5s
    }

    function resetInterval() {
      if (interval) clearInterval(interval);
      startInterval();
    }

    startInterval();
  });
});

/* =====================
   FUTURAS FUNÇÕES
===================== */
// Aqui você pode adicionar funções de login, modais, navegação, etc
