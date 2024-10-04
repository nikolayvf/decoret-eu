// js/project-detail.js

document.addEventListener("DOMContentLoaded", function () {
  const projectDetailContainer = document.getElementById(
    "project-detail-container"
  );

  // Get project ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  if (!projectId) {
    projectDetailContainer.innerHTML =
      "<p>Няма посочен проект. Моля, изберете проект от <a href='projects.html'>тут</a>.</p>";
    return;
  }

  fetch("resources/projects.json")
    .then((response) => response.json())
    .then((data) => {
      const project = data.projects.find((p) => p.id == projectId);

      if (!project) {
        projectDetailContainer.innerHTML =
          "<p>Проектът не е намерен. Моля, изберете друг проект от <a href='projects.html'>тут</a>.</p>";
        return;
      }

      // Display project details
      projectDetailContainer.innerHTML = `
          <h1>${project.name}</h1>
          <div class="carousel">
            <div class="carousel-main">
              <button class="carousel-arrow left-arrow" aria-label="Предишна снимка">◀</button>
              <div class="image-container">
                <img src="resources/${project.projectImages[0]}" alt="${
        project.name
      }" class="main-image" id="main-image">
              </div>
              <button class="carousel-arrow right-arrow" aria-label="Следваща снимка">▶</button>
            </div>
            <div class="carousel-thumbnails">
              ${project.projectImages
                .map(
                  (img, index) => `
                    <img src="resources/${img}" alt="Thumbnail ${
                    index + 1
                  }" class="thumbnail ${
                    index === 0 ? "active" : ""
                  }" data-index="${index}">
                  `
                )
                .join("")}
            </div>
          </div>
          <div class="project-info">
            <p><strong>Локация:</strong> ${project.location}</p>
            ${
              project.client
                ? `<p><strong>Клиент:</strong> ${project.client}</p>`
                : ""
            }
            ${
              project.architect
                ? `<p><strong>Архитект:</strong> ${project.architect}</p>`
                : ""
            }
            ${
              project.visualizer
                ? `<p><strong>Визуализатор:</strong> ${project.visualizer}</p>`
                : ""
            }
            ${
              project.investor
                ? `<p><strong>Инвеститор:</strong> ${project.investor}</p>`
                : ""
            }
            <p><strong>Тип:</strong> ${project.projectType}</p>
            <div class="project-description">
              <p>${project.projectInfo.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
        `;

      // Carousel functionality
      let currentIndex = 0;
      const mainImage = document.getElementById("main-image");
      const thumbnails = document.querySelectorAll(".thumbnail");

      function updateMainImage(index) {
        mainImage.src = `resources/${project.projectImages[index]}`;
        thumbnails.forEach((thumb, idx) => {
          thumb.classList.toggle("active", idx === index);
        });
        currentIndex = index;
      }

      document.querySelector(".left-arrow").addEventListener("click", () => {
        const newIndex =
          currentIndex === 0
            ? project.projectImages.length - 1
            : currentIndex - 1;
        updateMainImage(newIndex);
      });

      document.querySelector(".right-arrow").addEventListener("click", () => {
        const newIndex =
          currentIndex === project.projectImages.length - 1
            ? 0
            : currentIndex + 1;
        updateMainImage(newIndex);
      });

      thumbnails.forEach((thumb, idx) => {
        thumb.addEventListener("click", () => {
          updateMainImage(idx);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
      projectDetailContainer.innerHTML =
        '<p class="error-message">Възникна грешка при зареждането на проекта. Моля, опитайте отново по-късно.</p>';
    });
});
