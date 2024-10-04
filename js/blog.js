// // js/blog.js

// document.addEventListener("DOMContentLoaded", function () {
//   const blogContainer = document.getElementById("blog-container");

//   fetch("resources/articles.json")
//     .then((response) => response.json())
//     .then((data) => {
//       const articlesData = data.articles;

//       blogContainer.innerHTML = articlesData
//         .map(
//           (article) => `
//                 <div class="blog-article-container">
//                     <h2>${article.title}</h2>
//                     ${
//                       article.imageUrls && article.imageUrls.length > 0
//                         ? `
//                     <div class="article-images">
//                         ${article.imageUrls
//                           .map(
//                             (url, index) => `
//                             <img src="resources/${url}" alt="${article.altTexts[index]}" class="article-image">
//                         `
//                           )
//                           .join("")}
//                     </div>`
//                         : ""
//                     }
//                     <div class="article-content">
//                         ${article.content
//                           .split("\n")
//                           .map((paragraph) =>
//                             paragraph.trim() ? `<p>${paragraph}</p>` : ""
//                           )
//                           .join("")}
//                     </div>
//                 </div>
//             `
//         )
//         .join("");
//     });
// });

// js/blog.js

document.addEventListener("DOMContentLoaded", function () {
  const blogContainer = document.getElementById("blog-container");

  fetch("resources/articles.json")
    .then((response) => response.json())
    .then((data) => {
      const articlesData = data.articles;

      blogContainer.innerHTML = articlesData
        .map((article) => {
          // Check if there are any images
          const hasImages = article.imageUrls && article.imageUrls.length > 0;

          // Use the first image if available
          const firstImage = hasImages
            ? `
                  <div class="article-image-container">
                    <img src="resources/${article.imageUrls[0]}" alt="${
                article.altTexts ? article.altTexts[0] : "Article Image"
              }" class="article-image">
                  </div>
                `
            : "";

          return `
              <div class="blog-article-container">
                <h2>${article.title}</h2>
                ${firstImage}
                <div class="article-content">
                  ${article.content
                    .split("\n")
                    .map((paragraph) =>
                      paragraph.trim() ? `<p>${paragraph}</p>` : ""
                    )
                    .join("")}
                </div>
              </div>
            `;
        })
        .join("");
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
      blogContainer.innerHTML =
        '<p class="error-message">Възникна грешка при зареждането на статиите.</p>';
    });
});
