window.onload = () => {
    // ------------------------
    // HEADER - Carrossel Principal
    // ------------------------
    const headerTrack = document.querySelector('.carousel');
    headerTrack.innerHTML += headerTrack.innerHTML; // Loop infinito
    let posHeader = 0;
    const speedHeader = 1;

    function animateHeader() {
        posHeader += speedHeader;
        if (posHeader >= headerTrack.scrollWidth / 2) posHeader = 0;
        headerTrack.style.transform = `translateX(-${posHeader}px)`;
        requestAnimationFrame(animateHeader);
    }
    animateHeader();

    // ------------------------
    // Notícias - RSS Whiplash
    // ------------------------
    carregarNoticias();
};

async function carregarNoticias() {
    const feedUrl = "https://whiplash.net/feeds/news.xml";
    const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(feedUrl);

    try {
        const resposta = await fetch(proxyUrl);
        const dados = await resposta.json();

        // Parse XML
        const parser = new DOMParser();
        const xml = parser.parseFromString(dados.contents, "text/xml");
        const items = xml.querySelectorAll("item");

        const container = document.getElementById("feed");
        container.innerHTML = "";

        items.forEach((item, i) => {
            if (i < 5) { // pega as 5 primeiras notícias
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
        console.error("Erro ao carregar notícias:", erro);
    }
}
