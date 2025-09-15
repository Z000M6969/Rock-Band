// Função genérica para carrosséis infinitos
function startCarousel(trackSelector, speed=1){
  const track = document.querySelector(trackSelector);
  if(!track) return;

  // duplicar slides para loop infinito
  track.innerHTML += track.innerHTML;

  let pos = 0;
  let currentSpeed = speed;

  function animate(){
    pos += currentSpeed;
    if(pos >= track.scrollWidth / 2) pos = 0;
    track.style.transform = `translateX(-${pos}px)`;
    requestAnimationFrame(animate);
  }

  animate();

  // pausa ao passar o mouse
  track.parentElement.addEventListener('mouseenter', () => currentSpeed = 0);
  track.parentElement.addEventListener('mouseleave', () => currentSpeed = speed);
}

window.addEventListener('load', () => {

  // CARROSÉIS
  startCarousel('.header-carousel .carousel-track', 0.5);
  startCarousel('.band-carousel .carousel-track', 1);
  startCarousel('.fotos-carousel .carousel-track', 0.7);

  // NOTÍCIAS FALSAS
  const container = document.getElementById("feed");
  if(container){
    container.innerHTML = "";
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
