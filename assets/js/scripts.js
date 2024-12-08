// const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDE2ZjMzMGUzZTZjMzg3YTJlZWE2MjM1N2Y5MTIxNiIsIm5iZiI6MTczMzQxNTQxNi4xNTIsInN1YiI6IjY3NTFkMWY4ZjA0M2JkOGE2MDI3MmIzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lXjO1t9uJrridiWmF01vwOkpVX0hAuWMFE9Fs979dBs=pt-BR';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGVkODlkM2YxOTg3MTczYmIzZjM4MDk2NmRkZjlkOSIsIm5iZiI6MTY1NTM0NjE5My43Niwic3ViIjoiNjJhYTk0MTE3ZWI1ZjIwMDY2OWQzNTZiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.8xpgMwT4wOcErEEQ3WQ7be8SuLaW7Kf3l46RQBwbU4Q'

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


function displayPopularSeries(series) {
    const carouselContent = document.getElementById('carousel-content');
    carouselContent.innerHTML = ''; 

    series.forEach((serie, index) => {
        const isActive = index === 0 ? 'active' : ''; 
        const carouselItem = `
            <div class="carousel-item ${isActive}">
                <img src="${IMG_BASE_URL + serie.backdrop_path}" class="d-block w-100" alt="${serie.name}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${serie.name}</h5>
                    <p>${serie.overview}</p>
                </div>
            </div>
        `;
        carouselContent.innerHTML += carouselItem;
    });
}


async function getRecentSeries() {
    try {
        const response = await fetch(`${BASE_URL}/tv/on_the_air`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        displayRecentSeries(data.results);
    } catch (error) {
        console.error("Erro ao buscar séries novas:", error);
        document.getElementById('recent-series').innerHTML = `<p>Erro ao carregar séries novas. Tente novamente mais tarde.</p>`;
    }
}


function displayRecentSeries(series) {
    const seriesContainer = document.getElementById('recent-series-container');
    seriesContainer.innerHTML = ''; 

    series.forEach(serie => {
        const seriesCard = document.createElement('div');
        seriesCard.classList.add('col-md-4', 'd-flex', 'justify-content-center', 'mb-4');

     
        seriesCard.innerHTML = `
            <div class="card">
                <a href="serie.html?id=${serie.id}">
                    <img src="${IMG_BASE_URL + serie.poster_path}" class="card-img-top" alt="${serie.name}">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${serie.name}</h5>
                    <div class="card-text-container">
                        <p class="card-text">${serie.overview || 'Descrição indisponível.'}</p>
                    </div>
                    <button class="btn btn-link toggle-text">Leia mais</button>
                </div>
            </div>
        `;

        seriesContainer.appendChild(seriesCard);
    });

    
    const toggleButtons = seriesContainer.querySelectorAll('.toggle-text');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textContainer = button.previousElementSibling; 

            if (textContainer.classList.contains('expanded')) {
                textContainer.classList.remove('expanded');
                button.textContent = 'Leia mais';
            } else {
                textContainer.classList.add('expanded');
                button.textContent = 'Leia menos';
            }
        });
    });
}



async function searchSeries(query) {
    try {
        const response = await fetch(`${BASE_URL}/search/tv?query=${query}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        displaySearchResults(data.results);
    } catch (error) {
        console.error("Erro ao buscar séries:", error);
        document.getElementById('search-results').innerHTML = `<p>Erro ao carregar séries. Tente novamente mais tarde.</p>`;
    }
}


function displaySearchResults(series) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; 

    if (series.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhuma série encontrada.</p>';
        return;
    }

    series.forEach(serie => {
        const seriesCard = `
            <div class="col">
                <div class="card h-100">
                    <img src="${IMG_BASE_URL + serie.poster_path}" class="card-img-top" alt="${serie.name}">
                    <div class="card-body">
                        <h5 class="card-title">${serie.name}</h5>
                        <p class="card-text">${serie.overview}</p>
                    </div>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += seriesCard;
    });
}


async function getSeriesDetails(seriesId) {
    try {
        const response = await fetch(`${BASE_URL}/tv/${seriesId}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        displaySeriesDetails(data);
    } catch (error) {
        console.error("Erro ao buscar detalhes da série:", error);
        document.getElementById('series-details').innerHTML = `<p>Erro ao carregar detalhes da série. Tente novamente mais tarde.</p>`;
    }
}


function displaySeriesDetails(serie) {
    const detailsContainer = document.getElementById('series-details');
    detailsContainer.innerHTML = `
        <h3>${serie.name}</h3>
        <img src="${IMG_BASE_URL + serie.poster_path}" alt="${serie.name}">
        <p>${serie.overview}</p>
        <p><strong>Status:</strong> ${serie.status}</p>
        <p><strong>Primeira Exibição:</strong> ${serie.first_air_date}</p>
    `;
}


const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        searchSeries(query);
    });
}


window.onload = () => {
    getPopularSeries();
    getRecentSeries(); 
};
