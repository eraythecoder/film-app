const global = {
  currentPage: location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1
  },
  api: {
    apiKey: "",
    apiUrl: "https://api.themoviedb.org/3/",
  }
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

// Film detayları Sayfası
async function displayMovieDetails(){

  // Soru işaretinden sonraki kısmı gösterir 
  const movieId = location.search.split("=")[1];

  const movie = await fetchAPIData(`movie/${movieId}`)

  // Arkaplan yükle
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
      <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(2)} / 10
            </p>
            <p class="text-muted">Çıkış Tarihi: ${movie.release_date}</p>
            <p>
              ${movie.overview ? movie.overview : "Bu filme dair Türkçe bir açıklama bulunmuyor"}
            </p>
            <h5>Kategoriler</h5>
            <ul class="list-group">
              ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Film Sayfasını Ziyaret Et</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>FİLM HAKKINDA</h2>
          <ul>
            <li><span class="text-secondary">Bütçe:</span> $${addCommasToMoney(movie.budget)}</li>
            <li><span class="text-secondary">Gelir:</span> $${addCommasToMoney(movie.revenue)}</li>
            <li><span class="text-secondary">Film Süresi:</span> ${movie.runtime} dakika</li>
            <li><span class="text-secondary">Durum:</span> ${
              movie.status === "Released" ?  
                "Yayınlandı" :
                "Yayınlanmadı"
            }</li>
          </ul>
          <h4>Yapımcılar</h4>
          ${movie.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}
        </div>
  `

  document.getElementById("movie-details").appendChild(div);
}

// Dizi detayları Sayfası
async function displayShowDetails(){

  // Soru işaretinden sonraki kısmı gösterir 
  const showId = location.search.split("=")[1];

  const show = await fetchAPIData(`tv/${showId}`)

  // Arkaplan yükle
  displayBackgroundImage('show', show.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
      <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(2)} / 10
            </p>
            <p class="text-muted">Çıkış Tarihi: ${show.first_air_date}</p>
            <p>
              ${show.overview ? show.overview : "Bu diziye dair Türkçe bir açıklama bulunmuyor"}
            </p>
            <h5>Kategoriler</h5>
            <ul class="list-group">
              ${show.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Dizi Sayfasını Ziyaret Et</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>DİZİ HAKKINDA</h2>
          <ul>
            <li><span class="text-secondary">Bölüm Sayısı:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Yayınlanan Son Bölüm:</span> ${show.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Sezon Sayısı:</span> ${show.number_of_seasons}</li>
          </ul>
          <h4>Yayıncı Şirketler</h4>
          <div class="list-group">
            ${show.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}
          </div>
        </div>
  `

  document.getElementById("show-details").appendChild(div);
}


// Detaylar sayfalarının arkaplanı görüntüle
function displayBackgroundImage(type, backgroundPath){
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
  overlayDiv.style.backgroundSize = "cover" 
  overlayDiv.style.backgroundPosition = "center" 
  overlayDiv.style.backgroundRepeat = "no-repeat"
  overlayDiv.style.height = "100vh"
  overlayDiv.style.width = "100vw"
  overlayDiv.style.position = "absolute" 
  overlayDiv.style.top = "0"
  overlayDiv.style.left = "0" 
  overlayDiv.style.zIndex = "-1"
  overlayDiv.style.opacity = "0.1"
  
  if(type === "movie"){
    document.querySelector("#movie-details").appendChild(overlayDiv);
  }else if(type === "show"){
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// Arama butonu 
async function search(){
  const queryString = location.search;
  
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");

  if(global.search.term !== "" && global.search.term !== null){
    const results = await searchAPIData();
    console.log(results);
  }else{
    showAlert("Lütfen bir içerik ismi giriniz")
  }
}

function showAlert(message, className){
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() =>alertEl.remove(), 3000)
}

// Slider 
async function displaySlider(){
  const { results } = await fetchAPIData("movie/now_playing")

  results.forEach(movie =>{
    const div = document.createElement("div");
    div.classList.add("swiper-slide")

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(2)} / 10
      </h4>
    `
    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper()
  })
}

function initSwiper(){
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnIntereaction: false
    },
    breakpoints:{
      500:{
        slidesPerView: 2
      },
      700:{
        slidesPerView: 3
      },
      1200:{
        slidesPerView: 4
      }
    } 
  })
}

// TMDB api'den data fetchleme
async function fetchAPIData(endpoint){
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=tr-TR`)

  const data = response.json();

  hideSpinner();

  return data;
}
// Search kısmı için API'dan veri çekme
async function searchAPIData(){
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=tr-TR&query=${global.search.term}`)

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

// Para değerine ',' ekleme
function addCommasToMoney(number){
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Sayfaları yönlendirme (router)
function init() {
  if (global.currentPage === "/" || global.currentPage === "/index.html") {
    displaySlider();
    displayPopularMovies();
  } else if (global.currentPage === "/shows.html") {
    displayPopularShows();
  } else if (global.currentPage === "/movie-details.html") {
    displayMovieDetails();
  } else if (global.currentPage === "/tv-details.html") {
    displayShowDetails();
  } else if (global.currentPage === "/search.html") {
    search();
  }

  markLink();
}

// Eventlisteners
document.addEventListener("DOMContentLoaded", init);
