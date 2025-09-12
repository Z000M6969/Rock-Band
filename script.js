// Carrossel de bandas
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.band-track').forEach(track => {
        // Duplica o conteúdo para loop infinito
        track.innerHTML += track.innerHTML;

        let position = 0;
        const speed = 0.5; // pixels por frame (ajuste conforme desejado)
        let paused = false;

        function animate() {
            if (!paused) {
                position += speed;
                if (position >= track.scrollWidth / 2) position = 0;
                track.style.transform = `translateX(-${position}px)`;
            }
            requestAnimationFrame(animate);
        }

        animate();

        // Pausa quando o mouse passa sobre o carrossel
        track.parentElement.addEventListener('mouseenter', () => paused = true);
        track.parentElement.addEventListener('mouseleave', () => paused = false);
    });
});
