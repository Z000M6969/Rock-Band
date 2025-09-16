// ============================
// CARROSSEL HEADER
// ============================
function startHeaderCarousel(){
  const track = document.querySelector('.header-carousel .carousel-track');
  if(!track) return;

  track.innerHTML += track.innerHTML; // duplica slides
  let pos = 0;
  const speed = 4;

  function animate(){
    pos += speed;
    if(pos >= track.scrollWidth / 2) pos = 0;
    track.style.transform = `translateX(-${pos}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}

window.addEventListener('load', startHeaderCarousel);



// ============================
// CARROSSEL BANDAS ICÔNICAS
// ============================
function startIconicasCarousel(){
  const track = document.querySelector('#bandas .band-carousel:nth-of-type(1) .band-track');
  if(!track) return;

  track.innerHTML += track.innerHTML;
  let pos = 0;
  let speed = 1;

  function animate(){
    pos += speed;
    if(pos >= track.scrollWidth / 2) pos = 0;
    track.style.transform = `translateX(-${pos}px)`;
    requestAnimationFrame(animate);
  }

  animate();

  // pausa ao passar o mouse
  track.parentElement.addEventListener('mouseenter', () => speed = 0);
  track.parentElement.addEventListener('mouseleave', () => speed = 1);
}

window.addEventListener('load', startIconicasCarousel);



// ============================
// CARROSSEL BANDAS ATUAIS
// ============================
function startAtuaisCarousel(){
  const track = document.querySelector('#bandas .band-carousel:nth-of-type(2) .band-track');
  if(!track) return;

  track.innerHTML += track.innerHTML;
  let pos = 0;
  let speed = 1;

  function animate(){
    pos += speed;
    if(pos >= track.scrollWidth / 2) pos = 0;
    track.style.transform = `translateX(-${pos}px)`;
    requestAnimationFrame(animate);
  }

  animate();

  // pausa ao passar o mouse
  track.parentElement.addEventListener('mouseenter', () => speed = 0);
  track.parentElement.addEventListener('mouseleave', () => speed = 1);
}

window.addEventListener('load', startAtuaisCarousel);



// ============================
// NOTÍCIAS FALSAS - 1
// ============================
window.addEventListener('load', () => {
  const container = document.getElementById("feed");
  if(container){
    container.innerHTML += `
      <article>
        <h3><a href="https://www.whiplash.net/news/12345.html" target="_blank">
          Banda X lança novo álbum
        </a></h3>
        <p>Riffs pesados e letras marcantes.</p>
      </article>
    `;
  }
});


// ============================
// NOTÍCIAS FALSAS - 2
// ============================
window.addEventListener('load', () => {
  const container = document.getElementById("feed");
  if(container){
    container.innerHTML += `
      <article>
        <h3><a href="https://www.whiplash.net/news/67890.html" target="_blank">
          Festival Rock Y confirmado para 2025
        </a></h3>
        <p>Grandes nomes do cenário nacional.</p>
      </article>
    `;
  }
});


// ============================
// NOTÍCIAS FALSAS - 3
// ============================
window.addEventListener('load', () => {
  const container = document.getElementById("feed");
  if(container){
    container.innerHTML += `
      <article>
        <h3><a href="https://www.whiplash.net/news/11223.html" target="_blank">
          Banda Z anuncia turnê pelo Brasil
        </a></h3>
        <p>Shows memoráveis em várias cidades.</p>
      </article>
    `;
  }
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
