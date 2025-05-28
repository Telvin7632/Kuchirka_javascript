// Гамбургер-меню
document.getElementById("hamburger").onclick = () => {
  document.getElementById("menu").classList.toggle("show");
};

// Карусель
const slidesContainer = document.querySelector(".slides");
const dots = Array.from(document.querySelectorAll(".dot"));
let currentIndex = 0;
const total = slidesContainer.children.length;

function updateCarousel() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
}

document.getElementById("prev").onclick = () => {
  currentIndex = (currentIndex - 1 + total) % total;
  updateCarousel();
};
document.getElementById("next").onclick = () => {
  currentIndex = (currentIndex + 1) % total;
  updateCarousel();
};
dots.forEach((dot, i) => dot.onclick = () => {
  currentIndex = i;
  updateCarousel();
});

// Автопрокрутка
setInterval(() => {
  currentIndex = (currentIndex + 1) % total;
  updateCarousel();
}, 4000);

// Ініціалізація
updateCarousel();
