// js/navbar.js

document.addEventListener("DOMContentLoaded", function () {
  // Dropdown functionality
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdown.addEventListener("mouseenter", function () {
    dropdownContent.style.display = "block";
  });

  dropdown.addEventListener("mouseleave", function () {
    dropdownContent.style.display = "none";
  });
});
