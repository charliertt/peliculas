(function () {
  const formatRuntime = (minutes) => {
    if (!minutes || Number.isNaN(Number(minutes))) {
      return '—';
    }
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (!hrs) {
      return `${mins} min`;
    }
    if (!mins) {
      return `${hrs} h`;
    }
    return `${hrs} h ${mins} min`;
  };

  const createBadge = (text) => `<span class="badge rounded-pill text-bg-light text-dark me-2 mb-2">${text}</span>`;

  const createHighlightCard = ({ title, description }) => `
    <article class="col-md-4">
      <div class="movie-highlight h-100 p-4 rounded-4 shadow-sm">
        <h3 class="h5 fw-semibold mb-2">${title}</h3>
        <p class="mb-0 text-body-secondary">${description}</p>
      </div>
    </article>
  `;

  const createFactRow = ([label, value]) => `
    <li class="d-flex justify-content-between border-bottom py-2">
      <span class="fw-semibold text-body-secondary">${label}</span>
      <span class="text-end">${value}</span>
    </li>
  `;

  const createRecommendationCard = (movie) => `
    <div class="col-12 col-sm-6 col-lg-4">
      <article class="movie-recommendation card h-100 border-0 shadow-sm">
        <img src="${movie.poster}" class="card-img-top" alt="Poster de ${movie.title}">
        <div class="card-body">
          <h3 class="h5 fw-semibold">${movie.title}</h3>
          <p class="mb-2 text-body-secondary">${movie.genres.slice(0, 2).join(' • ')}</p>
          <a class="stretched-link" href="single.html?id=${movie.id}" aria-label="Abrir la ficha de ${movie.title}"></a>
        </div>
      </article>
    </div>
  `;

  const renderMovie = (movie) => {
    const container = document.getElementById('movie-detail');
    if (!container) {
      return;
    }

    container.innerHTML = '';

    const heroSection = document.createElement('section');
    heroSection.className = 'movie-hero p-4 p-md-5 mb-5 rounded-4 position-relative overflow-hidden';
    heroSection.style.setProperty('--movie-backdrop', `url("${movie.backdrop || movie.poster}")`);
    const releaseDate = (() => {
      if (!movie.releaseDate) {
        return 'Próximamente';
      }
      const date = new Date(`${movie.releaseDate}T00:00:00`);
      if (Number.isNaN(date.getTime())) {
        return movie.releaseDate;
      }
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    })();

    heroSection.innerHTML = `
      <div class="movie-hero__overlay rounded-4"></div>
      <div class="position-relative">
        <div class="row g-4 align-items-center">
          <div class="col-12 col-lg-4">
            <div class="ratio ratio-2x3 rounded-4 overflow-hidden shadow-lg movie-hero__poster">
              <img src="${movie.poster}" alt="Póster de ${movie.title}" class="w-100 h-100 object-fit-cover">
            </div>
          </div>
          <div class="col-12 col-lg-8 text-white text-center text-lg-start">
            <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2 mb-3">
              ${createBadge(`Estreno: ${releaseDate}`)}
              ${createBadge(formatRuntime(movie.runtime))}
              ${createBadge(movie.classification)}
            </div>
            <h1 class="display-5 fw-bold mb-2">${movie.title}</h1>
            <p class="lead text-white-50 mb-4">${movie.tagline}</p>
            <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2 mb-4">
              ${movie.genres.map(createBadge).join('')}
            </div>
            <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
              <a class="btn btn-primary btn-lg px-4" href="${movie.trailer}" target="_blank" rel="noopener noreferrer">Ver tráiler</a>
              <a class="btn btn-outline-light btn-lg px-4" href="index.html">Volver al inicio</a>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(heroSection);

    const synopsisSection = document.createElement('section');
    synopsisSection.className = 'row g-4 align-items-start mb-5';
    synopsisSection.innerHTML = `
      <div class="col-12 col-lg-8">
        <h2 class="h3 fw-bold mb-3">Sinopsis</h2>
        <p class="fs-5 text-body-secondary">${movie.synopsis}</p>
        <div class="d-flex flex-wrap gap-2 mt-4">
          ${movie.keywords.map((keyword) => `<span class="badge text-bg-dark-subtle text-dark fw-semibold">${keyword}</span>`).join('')}
        </div>
      </div>
      <aside class="col-12 col-lg-4">
        <div class="movie-meta card border-0 shadow-sm rounded-4 p-4">
          <h3 class="h5 fw-semibold mb-3">Ficha técnica</h3>
          <ul class="list-unstyled small mb-0">
            ${createFactRow(['Director', movie.director])}
            ${createFactRow(['Puntuación', `${movie.score.toFixed(1)} / 5`])}
            ${createFactRow(['Elenco', movie.cast.join(', ')])}
            ${Object.entries(movie.facts || {}).map(createFactRow).join('')}
          </ul>
        </div>
      </aside>
    `;
    container.appendChild(synopsisSection);

    const highlightSection = document.createElement('section');
    highlightSection.className = 'mb-5';
    highlightSection.innerHTML = `
      <div class="d-flex align-items-center gap-3 mb-3">
        <span class="badge text-bg-primary rounded-pill px-3 py-2">Lo imperdible</span>
        <h2 class="h4 fw-bold mb-0">Por qué debes verla</h2>
      </div>
      <div class="row g-3">
        ${movie.highlights.map(createHighlightCard).join('')}
      </div>
    `;
    container.appendChild(highlightSection);

    const recommendationSection = document.createElement('section');
    recommendationSection.innerHTML = `
      <div class="d-flex flex-wrap align-items-center gap-3 mb-3">
        <h2 class="h4 fw-bold mb-0">También te puede interesar</h2>
        <p class="mb-0 text-body-secondary">Explora más películas destacadas</p>
      </div>
      <div class="row g-4" id="movie-recommendations"></div>
    `;
    container.appendChild(recommendationSection);

    const recommendationsContainer = recommendationSection.querySelector('#movie-recommendations');
    const recommendations = window.moviesData
      .filter((item) => item.id !== movie.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    recommendationsContainer.innerHTML = recommendations.map(createRecommendationCard).join('');
  };

  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const fallbackId = window.moviesData && window.moviesData.length ? window.moviesData[0].id : '';
    const movieId = params.get('id') || fallbackId;
    const movie = window.moviesById ? window.moviesById[movieId] : undefined;
    const container = document.getElementById('movie-detail');

    if (!container) {
      return;
    }

    if (!movie) {
      container.innerHTML = `
        <section class="text-center py-5">
          <h1 class="display-6 fw-bold mb-3">No encontramos la película solicitada</h1>
          <p class="text-body-secondary mb-4">Selecciona una película desde el menú o regresa al inicio para descubrir el catálogo completo.</p>
          <a class="btn btn-primary btn-lg" href="index.html">Volver al inicio</a>
        </section>
      `;
      return;
    }

    document.title = `${movie.title} | ARAIC`;
    renderMovie(movie);
  });
})();
