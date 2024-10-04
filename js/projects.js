// js/projects.js

document.addEventListener("DOMContentLoaded", function () {
  const projectsContainer = document.getElementById("projects-container");

  if (!projectsContainer) {
    console.error(
      "Error: Element with id 'projects-container' not found in the DOM."
    );
    return;
  }

  // Function to load and display projects based on the current hash
  function loadProjects() {
    // Clear the container and show a loading message/spinner if desired
    projectsContainer.innerHTML =
      '<p class="loading">Зареждане на проекти...</p>';

    fetch("resources/projects.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok (${response.status} ${response.statusText})`
          );
        }
        return response.json();
      })
      .then((data) => {
        if (!data.projects || !Array.isArray(data.projects)) {
          throw new Error(
            "Invalid JSON structure: 'projects' array is missing."
          );
        }

        const projectsData = data.projects;

        // Get filter from URL hash (e.g., #interior or #exterior)
        const filter = window.location.hash.substring(1).toLowerCase();

        console.log("Loading projects with filter:", filter);

        // Filter projects if needed
        const filteredProjects = filter
          ? projectsData.filter(
              (project) =>
                project.projectType &&
                project.projectType.toLowerCase() === filter
            )
          : projectsData;

        console.log(
          `Filtered Projects Count: ${filteredProjects.length} (Filter: '${filter}')`
        );

        if (filteredProjects.length === 0) {
          projectsContainer.innerHTML =
            '<p class="no-projects">Няма намерени проекти за избрания тип.</p>';
          return;
        }

        // Build the HTML for all filtered projects
        const projectsHTML = filteredProjects
          .map((project) => {
            // Validate required fields
            if (
              !project.id ||
              !project.name ||
              !project.location ||
              !project.projectThumbnail
            ) {
              console.warn(
                `Project with id ${project.id} is missing required fields. Skipping.`
              );
              return "";
            }

            return `
                <div class="project-card" data-id="${project.id}">
                    <div class="project-image">
                        <img src="resources/${project.projectThumbnail}" alt="${project.name}" loading="lazy" />
                        <div class="overlay">
                            <div class="overlay-text">
                                <h2>${project.name}</h2>
                                <p>${project.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
              `;
          })
          .join("");

        // Insert the projects into the container
        projectsContainer.innerHTML = projectsHTML;

        // Add event listeners to project cards
        const projectCards = document.querySelectorAll(".project-card");
        if (projectCards.length === 0) {
          console.warn("No valid project cards were generated.");
        }

        projectCards.forEach((card) => {
          card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-id");
            if (projectId) {
              console.log(`Navigating to project-detail.html?id=${projectId}`);
              // Redirect to project-detail.html with projectId as query parameter
              window.location.href = `project-detail.html?id=${projectId}`;
            } else {
              console.error("Project ID is missing for this card.");
            }
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching or processing projects:", error);
        projectsContainer.innerHTML =
          '<p class="no-projects">Възникна грешка при зареждането на проектите.</p>';
      });
  }

  // Initial load
  loadProjects();

  // Listen for hash changes to re-filter projects
  window.addEventListener("hashchange", loadProjects);
});
