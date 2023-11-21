const global = {
  currentPage: location.pathname,
};

// Bulunduğumuz sayfayı işaretleme
function markLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    } 
  });
}

// Sayfaları yönlendirme (router)
function init() {
  if (global.currentPage === "/" || global.currentPage === "/index.html") {
    console.log("Anasayfa");
  } else if (global.currentPage === "/shows.html") {
    console.log("Diziler");
  } else if (global.currentPage === "/movie-details.html") {
    console.log("Film Hakkında");
  } else if (global.currentPage === "/tv-details.html") {
    console.log("Dizi Hakkında");
  } else if (global.currentPage === "/search.html") {
    console.log("Arama");
  }

  markLink();
}

// Eventlisteners
document.addEventListener("DOMContentLoaded", init);
