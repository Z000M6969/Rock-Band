// =================================================
// CARROSSEL HEADER
// =================================================
window.addEventListener('load', () => {
  const headerTrack = document.querySelector('.carousel');
  if (headerTrack) {
    // Duplica imagens para loop infinito
    headerTrack.innerHTML += headerTrack.innerHTML;

    let posHeader = 0;
    const speedHeader = 1; // pixels por frame

    function animateHeader() {
      posHeader += speedHeader;
      if (posHeader >= headerTrack.scrollWidth / 2) posHeader = 0;
      headerTrack.style.transform = `translateX(-${posHeader}px)`;
      requestAnimationFrame(animateHeader);
    }

    animateHeader();
  }
   // BANDAS - Carrossel de Bandas
  // ------------------------
  document.querySelectorAll('.band-track').forEach(track => {
    track.innerHTML += track.innerHTML; // Duplica para loop
    let posBand = 0;
    const speedBand = 2;
    let paused = false;
    if(track){
      track.innerHTML += track.innerHTML; // Duplica imagens para loop
      let posBand = 0;
      const speedBand = 2;
      let paused = false;

      function animateBand() {
        if(!paused){
          posBand += speedBand;
          if(posBand >= track.scrollWidth / 2) posBand = 0;
          track.style.transform = `translateX(-${posBand}px)`;
        }
        requestAnimationFrame(animateBand);
      }
      requestAnimationFrame(animateBand);
    }
    animateBand();
      animateBand();

    track.parentElement.addEventListener('mouseenter', () => paused = true);
    track.parentElement.addEventListener('mouseleave', () => paused = false);
      track.parentElement.addEventListener('mouseenter', () => paused = true);
      track.parentElement.addEventListener('mouseleave', () => paused = false);
    }
  });


// ============================
// NOTÍCIAS FALSAS - 4
// ============================
window.addEventListener('load', () => {
  const container = document.getElementById("feed");
  if(container){
    container.innerHTML += `
      <article>
        <h3><a href="https://www.whiplash.net/news/44556.html" target="_blank">
          Entrevista exclusiva com Banda W
        </a></h3>
        <p>Banda fala sobre novo projeto.</p>
      </article>
    `;
  }
});


// ============================
// NOTÍCIAS FALSAS - 5
// ============================
window.addEventListener('load', () => {
  const container = document.getElementById("feed");
  if(container){
    container.innerHTML += `
      <article>
        <h3><a href="https://www.whiplash.net/news/77889.html" target="_blank">
          Documentário sobre Rock Nacional
        </a></h3>
        <p>História do rock nacional em vídeo.</p>
      </article>
    `;
  }
});
