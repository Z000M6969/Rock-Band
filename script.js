/* =========================
   CARROSSEIS
   ========================= */
document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       CARROSSEL DAS BANDAS
       ========================= */
    document.querySelectorAll('.band-track').forEach(track => {
        const slides = Array.from(track.children);
        const gap = parseInt(getComputedStyle(track).gap) || 20; // pega gap do CSS
        track.innerHTML += track.innerHTML; // duplica para loop infinito

        const totalWidth = slides.reduce((sum, slide) => sum + slide.getBoundingClientRect().width + gap, 0);

        let position = 0;
        const speed = 4;
        let paused = false;

        function animate() {
            if (!paused) {
                position += speed;
                if (position >= totalWidth) position = 0;
                track.style.transform = `translateX(-${position}px)`;
            }
            requestAnimationFrame(animate);
        }

        animate();

        track.parentElement.addEventListener('mouseenter', () => paused = true);
        track.parentElement.addEventListener('mouseleave', () => paused = false);
    });

    /* =========================
       CARROSSEL DO HEADER
       ========================= */
    const headerTrack = document.querySelector('.carousel');
    if (headerTrack) {
        headerTrack.innerHTML += headerTrack.innerHTML; // Loop infinito

        let headerPos = 0;
        const headerSpeed = 1; // mais lento que o das bandas
        let headerPaused = false;

        function animateHeader() {
            if (!headerPaused) {
                headerPos += headerSpeed;
                if (headerPos >= headerTrack.scrollWidth / 2) headerPos = 0;
                headerTrack.style.transform = `translateX(-${headerPos}px)`;
            }
            requestAnimationFrame(animateHeader);
        }

        animateHeader();

        headerTrack.parentElement.addEventListener('mouseenter', () => headerPaused = true);
        headerTrack.parentElement.addEventListener('mouseleave', () => headerPaused = false);
    }
});

/* =========================
   FEED DE NOTÍCIAS (FAKE NEWS)
   ========================= */
window.addEventListener('load', () => {
    const container = document.getElementById("feed");
    if (!container) return;

    // Notícia 4
    container.innerHTML += `
        <article>
            <h3>
                <a href="https://www.whiplash.net/news/44556.html" target="_blank">
                    Entrevista exclusiva com Banda W
                </a>
            </h3>
            <p>Banda fala sobre novo projeto.</p>
        </article>
    `;

    // Notícia 5
    container.innerHTML += `
        <article>
            <h3>
                <a href="https://www.whiplash.net/news/77889.html" target="_blank">
                    Documentário sobre Rock Nacional
                </a>
            </h3>
            <p>História do rock nacional em vídeo.</p>
        </article>
    `;
});


/* =========================
   FEED DE NOTÍCIAS (FAKE NEWS)
   ========================= */
window.addEventListener('load', () => {
    const container = document.getElementById("feed");
    if (!container) return;

    // Notícia 4
    container.innerHTML += `
        <article>
            <h3>
                <a href="https://www.whiplash.net/news/44556.html" target="_blank">
                    Entrevista exclusiva com Banda W
                </a>
            </h3>
            <p>Banda fala sobre novo projeto.</p>
        </article>
    `;

    // Notícia 5
    container.innerHTML += `
        <article>
            <h3>
                <a href="https://www.whiplash.net/news/77889.html" target="_blank">
                    Documentário sobre Rock Nacional
                </a>
            </h3>
            <p>História do rock nacional em vídeo.</p>
        </article>
    `;
});
