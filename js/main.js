// js/main.js

document.addEventListener("DOMContentLoaded", function () {
  // Animations for the home page
  const image07 = document.querySelector(".image07");
  const image08 = document.querySelector(".image08");

  setTimeout(() => {
    image07.classList.add("visible");
  }, 2800); // 2.8 seconds for image07

  setTimeout(() => {
    image08.classList.add("visible");
  }, 3500); // 3.5 seconds for image08
});
