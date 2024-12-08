const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDE2ZjMzMGUzZTZjMzg3YTJlZWE2MjM1N2Y5MTIxNiIsIm5iZiI6MTczMzQxNTQxNi4xNTIsInN1YiI6IjY3NTFkMWY4ZjA0M2JkOGE2MDI3MmIzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lXjO1t9uJrridiWmF01vwOkpVX0hAuWMFE9Fs979dBs=pt-BR';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function getPopularSeries() {
    try {
        const response = await fetch(`${BASE_URL}/tv/popular`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        displayPopularSeries(data.results);
    } catch (error) {
        console.error("Erro ao buscar séries populares:", error);
        document.getElementById('popular-series').innerHTML = `<p>Erro ao carregar séries populares. Tente novamente mais tarde.</p>`;
    }
}





function displayCarousel(series) {
    const carouselContent = document.getElementById('carousel-content');
    carouselContent.innerHTML = ''; 

    series.forEach((serie, index) => {
        const isActive = index === 0 ? 'active' : ''; 
        const carouselItem = `
            <div class="carousel-item ${isActive}">
                <img src="${serie.image}" class="d-block w-100" alt="${serie.name}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${serie.name}</h5>
                    <p>${serie.description}</p>
                </div>
            </div>
        `;
        carouselContent.innerHTML += carouselItem;
    });
}


const popularSeries = [
    {
        name: "Grey's Anatomy",
        description: "Acompanhe o drama da vida de médicos residentes e cirurgiões em um hospital movimentado.",
        image: "https://image.tmdb.org/t/p/original/ym20NYY99jNH0OzSg4TgLLGsQF9.jpg"
    },
    {
        name: "The Vampire Diaries",
        description: "A estudante Elena se apaixona por um vampiro enquanto dois irmãos vampiros disputam sua atenção.",
        image: "https://image.tmdb.org/t/p/original/cJYLon9ejKJV7ua03ab8Tj9u067.jpg"
        

    },
    {
        name: "Lucifer",
        description: "Entediado com a vida nas trevas, o diabo se muda para Los Angeles e ajuda em investigações de assassinatos.",
        image: "https://image.tmdb.org/t/p/original/ccaZ3yyyC6rcMAQrlLZ51FpahNO.jpg"
    },
    {
        name: "Supernatural",
        description: "Os irmãos Dean e Sam caçam fantasmas, demônios e outros seres sobrenaturais pelos Estados Unidos.",
        image: "https://image.tmdb.org/t/p/original/uEYKe7kt3ngFFK2guXLRf2F3yLB.jpg"
    }
];



//series
async function getRecentSeries() {
try {
    const response = await fetch(`${TMDB_BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}&language=pt-BR`);
    if (!response.ok) throw new Error('Erro ao buscar séries recentes');
    const data = await response.json();
    displayCards(data.results, '#recent-series-container');
} catch (error) {
    console.error('Erro em getRecentSeries:', error);
}
}






async function getAuthorInfo() {
try {
    const response = await fetch(`${JSON_SERVER_URL}/autor`);
    if (!response.ok) throw new Error('Erro ao buscar informações do autor');
    const author = await response.json();
    document.getElementById('author-details').innerHTML = `
        <p><strong>Nome:</strong> ${author.nome}</p>
        <p><strong>Matrícula:</strong> 8888 ${author.matricula}</p>
        <p><strong>Curso:</strong> ${author.curso}</p>
        <p><strong>Redes Sociais:</strong> 
            <a href="${author.redes.github}" target="_blank">GitHub</a>, 
            <a href="${author.redes.linkedin}" target="_blank">LinkedIn</a>
        </p>
    `;
} catch (error) {
    console.error('Erro em getAuthorInfo:', error);
}
}

async function getFavoriteSeries() {
try {
    const response = await fetch(`${JSON_SERVER_URL}/favoritas`);
    if (!response.ok) throw new Error('Erro ao buscar séries favoritas');
    const data = await response.json();
    displayCards(data, '#favorites-container');
} catch (error) {
    console.error('Erro em getFavoriteSeries:', error);
}
}


function displayCards(series, containerSelector) {
const container = document.querySelector(containerSelector);
container.innerHTML = '';
series.forEach((serie) => {
  
    if (!serie.poster_path) return;


});

fixedSeries.forEach((serie) => {
    container.innerHTML += `
        <div class="col-md-3">
            <div class="card">
                <a href="https://www.themoviedb.org/tv/${serie.id}" target="_blank">
                    <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" class="card-img-top" alt="${serie.name}">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${serie.name}</h5>
                    <p class="card-text">${serie.overview.slice(0, 100)}...</p>
                </div>
            </div>
        </div>
    `;
});
}



(async function initializePage() {
await getPopularSeries();
await getRecentSeries();
await getAuthorInfo();
await getFavoriteSeries();
})();

  
  


getPopularSeries();
getRecentSeries();
