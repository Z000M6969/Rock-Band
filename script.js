document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.band-track').forEach(track => {
        // Duplica conteúdo para loop infinito
        track.innerHTML += track.innerHTML;

        let position = 0;
        const speed = 4; // pixels por frame, aumente para mais rápido
        let paused = false;

        function animate() {
            if(!paused){
                position += speed;
                if(position >= track.scrollWidth / 2) position = 0;
                track.style.transform = `translateX(-${position}px)`;
            }
            requestAnimationFrame(animate);
        }

        animate();

        // Pausa ao passar o mouse
        track.parentElement.addEventListener('mouseenter', () => paused = true);
        track.parentElement.addEventListener('mouseleave', () => paused = false);
    });
});
