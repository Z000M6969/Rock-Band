document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os slides
  const slides = document.querySelectorAll('.carousel .slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;
  let interval = null;

  // Mostra o slide atual
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  }

  // Próximo slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Slide anterior
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  // Inicia o avanço automático
  function startInterval() {
    interval = setInterval(nextSlide, 3000); // muda a cada 3s
  }

  // Reseta o intervalo quando clica nos botões
  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  // Eventos dos botões
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

  // Inicializa
  showSlide(currentIndex);
  startInterval();
});
