const global = {
  currentPage: location.pathname,
};

// Popüler filmleri görüntüle
async function displayPopularMovies(){
  const { results } = await fetchAPIData("movie/popular")
  
  results.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("card")

    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
                  movie.poster_path ? 
                    `
                      <img
                      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                      class="card-img-top"
                      alt="${movie.title}"
                      />
                    `
                    :
                    `
                      <img
                      src="../images/no-image.jpg"
                      class="card-img-top"
                      alt="${movie.title}"
                      />
                   `

            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Çıkış Tarihi: ${movie.release_date}</small>
            </p>
          </div>
    `

    document.querySelector("#popular-movies").appendChild(div);       
  })
}

// Popüler dizileri görüntüle
async function displayPopularShows(){
  const { results } = await fetchAPIData("tv/popular")
  
  results.forEach(show => {
    const div = document.createElement("div");
    div.classList.add("card")

    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
                  show.poster_path ? 
                    `
                      <img
                      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                      class="card-img-top"
                      alt="${show.name}"
                      />
                    `
                    :
                    `
                      <img
                      src="../images/no-image.jpg"
                      class="card-img-top"
                      alt="${show.name}"
                      />
                   `

            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Çıkış Tarihi: ${show.first_air_date}</small>
            </p>
          </div>
    `

    document.querySelector("#popular-shows").appendChild(div);       
  })
}


// TMDB api'den data fetchleme
async function fetchAPIData(endpoint){
  const API_KEY = "";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=tr-TR`)

  const data = response.json();

  hideSpinner();

  return data;
}

// Yükleniyor simgesi göster
function showSpinner(){
  document.querySelector(".spinner").classList.add("show")
}

// Yükleniyor simgesi gizle
function hideSpinner(){
  document.querySelector(".spinner").classList.remove("show")
}

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
    displayPopularMovies();
  } else if (global.currentPage === "/shows.html") {
    displayPopularShows();
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
