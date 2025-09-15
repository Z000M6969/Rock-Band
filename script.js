document.addEventListener('DOMContentLoaded', () => {

  // CARROSSEL HEADER
  const headerCarousel = document.querySelector('.carousel-container .carousel');
  if (headerCarousel) {
    const slides = headerCarousel.querySelectorAll('img');
    const prevBtn = headerCarousel.parentElement.querySelector('.prev');
    const nextBtn = headerCarousel.parentElement.querySelector('.next');
    let index = 0;
    let interval = null;

    function showSlide() {
      slides.forEach((slide, i) => slide.style.display = i === index ? 'block' : 'none');
    }

    function next() { index = (index + 1) % slides.length; showSlide(); }
    function prev() { index = (index - 1 + slides.length) % slides.length; showSlide(); }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); reset(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); reset(); });

    function reset() { clearInterval(interval); interval = setInterval(next, 5000); }

    showSlide();
    interval = setInterval(next, 5000);
  }

  // CARROSSEIS DE BANDAS / FOTOS EM GRUPO
  const bandCarousels = document.querySelectorAll('.band-carousel');
  bandCarousels.forEach(carousel => {
    const track = carousel.querySelector('.band-track');
    const slides = carousel.querySelectorAll('.band-slide');
    const prevBtn = carousel.querySelector('#prevGroup, .prev');
    const nextBtn = carousel.querySelector('#nextGroup, .next');
    let index = 0;

    function updateTrack() {
      const slideWidth = slides[0].offsetWidth + 20; // gap: 20px
      track.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    function next() { index = (index + 1) % slides.length; updateTrack(); }
    function prev() { index = (index - 1 + slides.length) % slides.length; updateTrack(); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Auto slide a cada 4s
    setInterval(next, 4000);

    window.addEventListener('resize', updateTrack);
    updateTrack();
  });

});
