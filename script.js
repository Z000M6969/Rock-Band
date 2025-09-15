window.addEventListener('load', () => {
  const track = document.querySelector('.carousel');
  const slides = Array.from(track.children);
  
  // Duplicar slides para loop infinito
  track.innerHTML += track.innerHTML;

  let position = 0;
  const speed = 1; // pixels por frame

  function animate() {
    position -= speed;

    // Quando passar metade da largura total, reinicia
    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();

  // Botões
  const prevBtn = document.querySelector('.carousel-controls .prev');
  const nextBtn = document.querySelector('.carousel-controls .next');

  prevBtn.addEventListener('click', () => {
    position += 200; // move para trás
  });

  nextBtn.addEventListener('click', () => {
    position -= 200; // move para frente
  });
});


  // ------------------------
  // BANDAS - Carrossel de Bandas
  // ------------------------
  document.querySelectorAll('.band-track').forEach(track => {
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
      animateBand();

      track.parentElement.addEventListener('mouseenter', () => paused = true);
      track.parentElement.addEventListener('mouseleave', () => paused = false);
    }
  });

  // ------------------------
  // NOTÍCIAS FALSAS COM LINKS REAIS
  // ------------------------
  const container = document.getElementById("feed");
  if(container){
    container.innerHTML = ""; // Limpa conteúdo inicial

    const noticias = [
      {title: "Banda X lança novo álbum", link:"https://www.whiplash.net/news/12345.html", description:"Riffs pesados e letras marcantes."},
      {title: "Festival Rock Y confirmado para 2025", link:"https://www.whiplash.net/news/67890.html", description:"Grandes nomes do cenário nacional."},
      {title: "Banda Z anuncia turnê pelo Brasil", link:"https://www.whiplash.net/news/11223.html", description:"Shows memoráveis em várias cidades."},
      {title: "Entrevista exclusiva com Banda W", link:"https://www.whiplash.net/news/44556.html", description:"Banda fala sobre novo projeto."},
      {title: "Documentário sobre Rock Nacional", link:"https://www.whiplash.net/news/77889.html", description:"História do rock nacional em vídeo."}
    ];

    noticias.forEach(noticia => {
      container.innerHTML += `
        <article>
          <h3><a href="${noticia.link}" target="_blank">${noticia.title}</a></h3>
          <p>${noticia.description}</p>
        </article>
      `;
    });
  }
});
