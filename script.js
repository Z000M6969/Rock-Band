document.addEventListener('DOMContentLoaded', () => {
    // Header
    const headerTrack = document.querySelector('.carousel');
    let posHeader = 0;
    const speedHeader = 0.5; // pixels por frame
    function animateHeader() {
        posHeader += speedHeader;
        if(posHeader >= headerTrack.scrollWidth / 2) posHeader = 0;
        headerTrack.style.transform = `translateX(-${posHeader}px)`;
        requestAnimationFrame(animateHeader);
    }
    animateHeader();

    // Bandas (seu código atual)
    document.querySelectorAll('.band-track').forEach(track => {
        track.innerHTML += track.innerHTML;
        let position = 4;
        let paused = false;
        function animate() {
            if(!paused){
                position += 4;
                if(position >= track.scrollWidth / 2) position = 0;
                track.style.transform = `translateX(-${position}px)`;
            }
            requestAnimationFrame(animate);
        }
        animate();
        track.parentElement.addEventListener('mouseenter', () => paused = true);
        track.parentElement.addEventListener('mouseleave', () => paused = false);
    });
});
