window.onload = () => {
  // ------------------------
  // HEADER - Carrossel Principal
  // ------------------------
  const headerTrack = document.querySelector('.carousel');
  headerTrack.innerHTML += headerTrack.innerHTML; // Duplica imagens
  let posHeader = 0;
  const speedHeader = 1; // pixels por frame

  function animateHeader() {
    posHeader += speedHeader;
    if (posHeader >= headerTrack.scrollWidth / 2) posHeader = 0;
    headerTrack.style.transform = `translateX(-${posHeader}px)`;
    requestAnimationFrame(animateHeader);
  }
  animateHeader();

  // ------------------------
  // BANDAS - Carrossel de Bandas
  // ------------------------
  document.querySelectorAll('.band-track').forEach(track => {
    track.innerHTML += track.innerHTML; // Duplica para loop
    let posBand = 0;
    const speedBand = 2;
    let paused = false;

    function animateBand() {
      if(!paused) {
        posBand += speedBand;
        if(posBand >= track.scrollWidth / 2) posBand = 0;
        track.style.transform = `translateX(-${posBand}px)`;
      }
      requestAnimationFrame(animateBand);
    }
    animateBand();

    track.parentElement.addEventListener('mouseenter', () => paused = true);
    track.parentElement.addEventListener('mouseleave', () => paused = false);
  });

// ------------------------
// NOTÍCIAS FALSAS COM LINKS REAIS
// ------------------------
function carregarNoticias() {
  const container = document.getElementById("feed");
  container.innerHTML = "";

  const noticias = [
    {
      title: "Banda X lança novo álbum",
      link: "https://www.whiplash.net/news/12345.html",
      description: "Riffs pesados e letras marcantes prometem agitar os fãs."
    },
    {
      title: "Festival Rock Y confirmado para 2025",
      link: "https://www.whiplash.net/news/67890.html",
      description: "Grandes nomes do cenário nacional se apresentarão no festival."
    },
    {
      title: "Banda Z anuncia turnê pelo Brasil",
      link: "https://www.whiplash.net/news/11223.html",
      description: "Shows memoráveis em várias cidades pelo país."
    },
    {
      title: "Entrevista exclusiva com Banda W",
      link: "https://www.whiplash.net/news/44556.html",
      description: "A banda fala sobre seu novo projeto e bastidores das gravações."
    },
    {
      title: "Documentário sobre Rock Nacional",
      link: "https://www.whiplash.net/news/77889.html",
      description: "História do rock nacional contada em vídeo, com depoimentos inéditos."
    }
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

// Chama a função
carregarNoticias();
