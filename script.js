document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.band-track').forEach(track => {
        // Duplica conteúdo para loop infinito
        track.innerHTML += track.innerHTML;

        let position = 0;
        const speed = 4; // pixels por frame, aumente para mais rápido
        let paused = false;

        function animate() {
            if(!paused){
                position += speed;
                if(position >= track.scrollWidth / 2) position = 0;
                track.style.transform = `translateX(-${position}px)`;
            }
            requestAnimationFrame(animate);
        }

        animate();

        // Pausa ao passar o mouse
        track.parentElement.addEventListener('mouseenter', () => paused = true);
        track.parentElement.addEventListener('mouseleave', () => paused = false);
    });
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
