(function () {
  const populateMovieMenu = () => {
    const menu = document.getElementById('movieMenu');
    if (!menu || !Array.isArray(window.moviesData)) {
      return;
    }

    const fragment = document.createDocumentFragment();
    window.moviesData.slice(0, 8).forEach((movie) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.className = 'dropdown-item';
      link.href = `single.html?id=${movie.id}`;
      link.textContent = movie.title;
      item.appendChild(link);
      fragment.appendChild(item);
    });

    const separator = document.createElement('li');
    separator.innerHTML = '<hr class="dropdown-divider">';
    fragment.appendChild(separator);

    const randomItem = document.createElement('li');
    const randomLink = document.createElement('a');
    const randomIndex = Math.floor(Math.random() * window.moviesData.length);
    randomLink.className = 'dropdown-item';
    randomLink.href = `single.html?id=${window.moviesData[randomIndex].id}`;
    randomLink.textContent = 'Abrir ficha destacada';
    randomItem.appendChild(randomLink);
    fragment.appendChild(randomItem);

    menu.appendChild(fragment);
  };

  document.addEventListener('DOMContentLoaded', populateMovieMenu);
})();
