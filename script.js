document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('header .carousel');
  const slides = document.querySelectorAll('header .slide');
  let index = 0;

  function showNextSlide() {
    slides[index].style.display = 'none';      // Esconde o slide atual
    index = (index + 1) % slides.length;       // Próximo slide (loop infinito)
    slides[index].style.display = 'block';     // Mostra o próximo slide
  }

  // Inicializa mostrando o primeiro slide
  slides.forEach(slide => slide.style.display = 'none');
  slides[0].style.display = 'block';

  // Troca de slide a cada 3 segundos
  setInterval(showNextSlide, 3000);
});


  /* =====================
     CARROSSEL BANDAS / FOTOS
  ===================== */
  const bandCarousels = document.querySelectorAll('.band-carousel');
  bandCarousels.forEach(carousel => {
    const track = carousel.querySelector('.band-track');
    const slides = carousel.querySelectorAll('.band-slide');
    const prevBtn = carousel.querySelector('#prevGroup, .prev');
    const nextBtn = carousel.querySelector('#nextGroup, .next');
    let index = 0;

    function updateTrack() {
      if(!slides[0]) return;
      const slideWidth = slides[0].offsetWidth + 20; // gap entre slides
      track.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    function next() { index = (index + 1) % slides.length; updateTrack(); }
    function prev() { index = (index - 1 + slides.length) % slides.length; updateTrack(); }

    if(nextBtn) nextBtn.addEventListener('click', next);
    if(prevBtn) prevBtn.addEventListener('click', prev);

    // Auto-slide a cada 4s
    setInterval(next, 4000);

    window.addEventListener('resize', updateTrack);
    updateTrack();
  });

});
