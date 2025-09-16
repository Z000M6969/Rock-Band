// Função para carrossel infinito
function setupCarousel(trackSelector, speed = 1) {
    const track = document.querySelector(trackSelector);
    let scrollAmount = 0;

    function animate() {
        scrollAmount += speed;
        if (scrollAmount >= track.scrollWidth / 2) {
            scrollAmount = 0;
        }
        track.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(animate);
    }

    // Duplicar conteúdo para efeito infinito
    track.innerHTML += track.innerHTML;
    animate();
}

// Carrossel do header
setupCarousel('.carousel', 0.5); // ajuste a velocidade (menor = mais lento)

// Carrosséis das bandas
document.querySelectorAll('.band-track').forEach(track => {
    setupCarousel('.band-track', 0.3); // velocidade menor para bandas
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
