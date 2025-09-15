document.addEventListener('DOMContentLoaded', () => {

  // Função genérica para iniciar um carrossel
  function initCarousel(carouselSelector, intervalTime = 3000) {
    const carousel = document.querySelector(carouselSelector);
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;
    let interval = null;

    function showSlide(index) {
      slides.forEach((slide, i) => slide.style.display = i === index ? 'block' : 'none');
    }

    function nextSlide() { currentIndex = (currentIndex + 1) % slides.length; showSlide(currentIndex); }
    function prevSlide() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; showSlide(currentIndex); }

    function startInterval() { interval = setInterval(nextSlide, intervalTime); }
    function resetInterval() { clearInterval(interval); startInterval(); }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

    showSlide(currentIndex);
    startInterval();
  }

  // Inicializa carrosséis individualmente
  initCarousel('.header-carousel', 3000); // header
  initCarousel('.band-carousel', 4000);   // bandas
});
