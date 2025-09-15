
// ===== CARROSSEL =====
window.addEventListener('load', () => {
  const headerTrack = document.querySelector('.carousel');
  if(headerTrack){
    headerTrack.innerHTML += headerTrack.innerHTML; // duplica imagens
    let posHeader = 0;
    const speedHeader = 1;

    function animateHeader() {
      posHeader += speedHeader;
      if (posHeader >= headerTrack.scrollWidth / 2) posHeader = 0;
      headerTrack.style.transform = `translateX(-${posHeader}px)`;
      requestAnimationFrame(animateHeader);
    }
    animateHeader();
  }
});

