// Carrossel de bandas
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.band-track').forEach(track => {
        // Duplica o conteúdo para loop infinito
        track.innerHTML += track.innerHTML;

        // Pausa animação ao passar o mouse
        track.parentElement.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        track.parentElement.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
});
