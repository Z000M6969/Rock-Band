// Carrossel de bandas com JS
document.querySelectorAll('.band-track').forEach(track => {
    // Duplica slides para looping infinito
    track.innerHTML += track.innerHTML;

    let position = 0;
    const speed = 1; // pixels por frame, ajuste para mais rápido ou mais lento

    function animate() {
        position += speed;
        if(position >= track.scrollWidth / 2) position = 0;
        track.style.transform = `translateX(-${position}px)`;
        requestAnimationFrame(animate);
    }

    animate();

    // Pausa ao passar o mouse
    track.parentElement.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    track.parentElement.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
});
