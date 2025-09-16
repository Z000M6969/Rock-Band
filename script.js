/* =========================
   CARROSSEIS
   ========================= */
document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       CARROSSEL DAS BANDAS
       ========================= */
    document.querySelectorAll('.band-track').forEach(track => {
        const slides = Array.from(track.children);
        const gap = parseInt(getComputedStyle(track).gap) || 20;
        track.innerHTML += track.innerHTML; // duplica para loop infinito

        const totalWidth = slides.reduce((sum, slide) => 
            sum + slide.offsetWidth + gap, 0);

        let position = 0;
        const speed = 2.5; // <<< velocidade ideal (mais rápido que 1, mas sem travar)
        let paused = false;

        function animate() {
            if (!paused) {
                position += speed;
                if (position >= totalWidth) position = 0;
                track.style.transform = `translate3d(-${position}px, 0, 0)`; 
                // translate3d força aceleração por GPU → mais fluido
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
        headerTrack.innerHTML += headerTrack.innerHTML;

        let headerPos = 0;
        const headerSpeed = 0.6; // mais lento, mas suave
        let headerPaused = false;

        function animateHeader() {
            if (!headerPaused) {
                headerPos += headerSpeed;
                if (headerPos >= headerTrack.scrollWidth / 2) headerPos = 0;
                headerTrack.style.transform = `translate3d(-${headerPos}px, 0, 0)`;
            }
            requestAnimationFrame(animateHeader);
        }

        animateHeader();

        headerTrack.parentElement.addEventListener('mouseenter', () => headerPaused = true);
        headerTrack.parentElement.addEventListener('mouseleave', () => headerPaused = false);
    }
});
