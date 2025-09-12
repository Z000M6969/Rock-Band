// Seleciona todos os carrosséis de bandas
document.querySelectorAll('.band-track').forEach(track => {
    // Duplica o conteúdo para loop infinito
    track.innerHTML += track.innerHTML;

    let position = 0;
    const speed = 0.5; // pixels por frame (aumente para mais rápido)

    function animate() {
        position += speed;
        if(position >= track.scrollWidth / 2) position = 0; // reseta para infinito
        track.style.transform = `translateX(-${position}px)`;
        requestAnimationFrame(animate);
    }

    animate();

    // Pausa quando o mouse passa sobre o carrossel
    track.parentElement.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    track.parentElement.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
});
