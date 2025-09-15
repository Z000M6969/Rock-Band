// ================== CARROSSEL HEADER ==================
let slideIndex = 0;
const slides = document.querySelectorAll("header .carousel img");

function showSlides() {
  slides.forEach((slide, i) => {
    slide.style.display = i === slideIndex ? "block" : "none";
  });
  slideIndex = (slideIndex + 1) % slides.length;
}

document.addEventListener("DOMContentLoaded", () => {
  showSlides();
  setInterval(showSlides, 3000);
});

// ================== CARROSSEL BANDAS ==================
const track = document.querySelector("#groupCarousel");
const slidesBand = document.querySelectorAll("#groupCarousel .band-slide");
const prevBtn = document.getElementById("prevGroup");
const nextBtn = document.getElementById("nextGroup");
let current = 0;

function updateCarousel() {
  if (!slidesBand.length) return;
  const slideWidth = slidesBand[0].offsetWidth;
  track.style.transform = `translateX(-${current * slideWidth}px)`;
  track.style.transition = "transform 0.5s ease";
}

prevBtn.addEventListener("click", () => {
  current = (current - 1 + slidesBand.length) % slidesBand.length;
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  current = (current + 1) % slidesBand.length;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);
updateCarousel();
