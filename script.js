window.addEventListener('DOMContentLoaded', () => {
  // ===== CARROSSEL HEADER =====
  const headerTrack = document.querySelector('.carousel');
  headerTrack.innerHTML += headerTrack.innerHTML; // duplica imagens
  let posHeader = 0;
  const speedHeader = 1;
  function animateHeader() {
    posHeader += speedHeader;
    if (posHeader >= headerTrack.scrollWidth / 2) posHeader = 0;
    headerTrack.style.transform = `translateX(-${posHeader}px)`;
    requestAnimationFrame(animateHeader);
  }
  animateHeader();

  // ===== CARROSSEL BANDAS (opcional) =====
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

  // ===== PUXAR NOTÍCIAS =====
  async function carregarNoticias() {
    const url = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://whiplash.net/rss");
    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      const parser = new DOMParser();
      const xml = parser.parseFromString(dados.contents, "text/xml");

      const items = xml.querySelectorAll("item");
      const container = document.getElementById("feed");
      container.innerHTML = "";

      items.forEach((item, i) => {
        if (i < 5) {
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
      console.error("Erro ao puxar RSS:", erro);
    }
  }

  carregarNoticias();
});
