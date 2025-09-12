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
    const feedUrl = "https://whiplash.net/feeds/news.xml";
    const proxyUrl = "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(feedUrl);
    try {
      const resposta = await fetch(proxyUrl);
      const dados = await resposta.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(dados, "text/xml");
      const items = xml.querySelectorAll("item");
      const container = document.getElementById("feed");
      container.innerHTML = "";
      items.forEach((item, i) => {
        if(i < 5){
          const titulo = item.querySelector("title").textContent;
          const link = item.querySelector("link").textContent;
          const descricao = item.querySelector("description").textContent;
          container.innerHTML += `
            <article>
              <h3><a href="${link}" target="_blank">${titulo}</a></h3>
              <p>${descricao}</p>
            </article>
          `;
        }
      });
    } catch (erro) {
      document.getElementById("feed").innerHTML = "<p>Erro ao carregar notícias 😢</p>";
      console.error(erro);
    }
  }

  carregarNoticias();
};
