// Função para criar carrossel infinito
function makeCarouselInfinite(trackId, speed) {
    const track = document.getElementById(trackId);
    // Duplica os slides automaticamente
    track.innerHTML += track.innerHTML; 
    let scrollAmount = 0;

    function animate() {
        scrollAmount += speed;
        // Quando chegar na metade, reinicia o scroll
        if(scrollAmount >= track.scrollWidth / 2) scrollAmount = 0;
        track.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(animate);
    }

    animate();
}

// Inicia os carrosséis
makeCarouselInfinite('bandTrack', 1);   // Carrossel de bandas icônicas
makeCarouselInfinite('modernTrack', 1); // Carrossel de bandas modernas


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
