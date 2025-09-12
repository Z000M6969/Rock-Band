window.onload = () => {
  // ------------------------
  // HEADER - Carrossel Principal
  // ------------------------
  const headerTrack = document.querySelector('.carousel');

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
};

// ------------------------
// Notícias do Whiplash
// ------------------------
async function carregarNoticias() {
  const feedUrl = "https://whiplash.net/feeds/news.xml";
  const proxyUrl = "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(feedUrl);

  try {
    const resposta = await fetch(proxyUrl);
    const dados = await resposta.text(); // retorna XML
    const parser = new DOMParser();
    const xml = parser.parseFromString(dados, "text/xml");

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
    console.error(erro);
  }
}

carregarNoticias();



