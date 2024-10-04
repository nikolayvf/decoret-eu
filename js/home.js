// js/home.js

const homeHTML = `
<div class="hero-container">
    <!-- Image 01 -->
    <div class="image-container image01 visible">
        <img src="resources/images/01_position.png" alt="Position 01" class="hero-image" />
    </div>
    <!-- Image 02 -->
    <div class="image-container image02 visible">
        <img src="resources/images/02_position.png" alt="Position 02" class="hero-image" />
    </div>
    <!-- Image 03 -->
    <div class="image-container image03 visible">
        <img src="resources/images/03_position.png" alt="Position 03" class="hero-image" />
    </div>
    <!-- Image 04 -->
    <div class="image-container image04 visible">
        <img src="resources/images/04_position.png" alt="Position 04" class="hero-image" />
    </div>
    <!-- Image 05 -->
    <div class="image-container image05 visible">
        <img src="resources/images/05_position.png" alt="Position 05" class="hero-image" />
    </div>
    <!-- Image 06 -->
    <div class="image-container image06 visible">
        <img src="resources/images/06_position.png" alt="Position 06" class="hero-image" />
    </div>
    <!-- Image 07 -->
    <div class="image-container image07">
        <img src="resources/images/07_position_final.png" alt="Position Final" class="hero-image" />
    </div>
    <!-- Logo -->
    <div class="image-container image08">
        <img src="resources/images/DECORET_LOGO.png" alt="Logo" class="hero-logo" />
    </div>
</div>
`;

function homeScript() {
  // Handle animations
  setTimeout(() => {
    document.querySelector(".image07").classList.add("visible");
  }, 2800);

  setTimeout(() => {
    document.querySelector(".image08").classList.add("visible");
  }, 3500);
}
