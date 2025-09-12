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

    // ------------------------
    // BANDAS - Carrossel de Bandas
    // ------------------------
    document.querySelectorAll('.band-track').forEach(track => {
        // Duplica imagens para loop infinito
        track.innerHTML += track.innerHTML;

        let posBand = 0;
        const speedBand = 2; // pixels por frame
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

        // Pausa animação ao passar o mouse
        track.parentElement.addEventListener('mouseenter', () => paused = true);
        track.parentElement.addEventListener('mouseleave', () => paused = false);
    });
};
