window.onload = () => {
  // ------------------------
  // HEADER - Carrossel Principal
  // ------------------------
  const headerTrack = document.querySelector('.carousel');
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

  // ------------------------
  // BANDAS - Carrossel de Bandas
  // ------------------------
  document.querySelectorAll('.band-track').forEach(track => {
    track.innerHTML += track.innerHTML;
    let posBand = 0;
    const speedBand = 2;
    let paused = false;
    function animateBand() {
      if (!paused) {
        posBand += speedBand;
        if (posBand >= track.scrollWidth / 2) posBand = 0;
        track.style.transform = `translateX(-${posBand}px)`;
      }
      requestAnimationFrame(animateBand);
    }
    animateBand();
    track.parentElement.addEventListener('mouseenter', () => paused = true);
    track.parentElement.addEventListener('mouseleave', () => paused = false);
  });

  // ------------------------
  // CARROSSEL DE GRUPO - botões
  // ------------------------
  const trackGroup = document.getElementById('groupCarousel');
  const prevBtn = document.getElementById('prevGroup');
  const nextBtn = document.getElementById('nextGroup');
  let scrollAmount = 0;

  if(trackGroup && prevBtn && nextBtn){
    prevBtn.addEventListener('click', () => {
      scrollAmount -= 220;
      if(scrollAmount < 0) scrollAmount = 0;
      trackGroup.style.transform = `translateX(-${scrollAmount}px)`;
    });
    nextBtn.addEventListener('click', () => {
      scrollAmount += 220;
      const maxScroll = trackGroup.scrollWidth - trackGroup.clientWidth;
      if(scrollAmount > maxScroll) scrollAmount = maxScroll;
      trackGroup.style.transform = `translateX(-${scrollAmount}px)`;
    });
  }

  // ------------------------
  // Notícias do Whiplash
  // ------------------------
async function carregarNoticias() {
  const container = document.getElementById("feed");
  container.innerHTML = "";
  const noticias = [
    {title: "Banda X lança novo álbum", link:"#", description:"Riffs pesados e letras marcantes."},
    {title: "Festival Rock Y confirmado para 2025", link:"#", description:"Grandes nomes do cenário nacional."},
    {title: "Banda Z anuncia turnê pelo Brasil", link:"#", description:"Shows memoráveis em várias cidades."},
    {title: "Entrevista exclusiva com Banda W", link:"#", description:"Banda fala sobre novo projeto."},
    {title: "Lançamento de documentário sobre Rock", link:"#", description:"História do rock nacional em vídeo."}
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

};
