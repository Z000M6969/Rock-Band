// Função para criar carrossel infinito
function makeCarouselInfinite(trackId, speed) {
    const track = document.getElementById(trackId);
    // Duplica os slides automaticamente
    track.innerHTML += track.innerHTML; 
    let scrollAmount = 0;

    function animate() {
        scrollAmount += speed;
        // Quando chegar na metade, reinicia o scroll
        if(scrollAmount >= track.scrollWidth / 2) scrollAmount = 0;
        track.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(animate);
    }

    animate();
}

// Inicia os carrosséis
makeCarouselInfinite('bandTrack', 1);   // Carrossel de bandas icônicas
makeCarouselInfinite('modernTrack', 1); // Carrossel de bandas modernas
