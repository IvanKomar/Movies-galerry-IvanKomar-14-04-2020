import MovieCard from "./MovieCard";
import { toggleModal } from './Modal';
import storage from './storage';
import { RenderFav } from './FavoriteList'
const fetchData = (callback) => {
  fetch('http://my-json-server.typicode.com/moviedb-tech/movies/list')
    .then(res => res.json()).then(res => {
      storage.setData('list', res);
      callback();
    })
}

const template = (movie, target) => {
  const node = document.createElement('div');
  const viewController = document.getElementById('list-view').classList.contains('view-active')
  node.innerHTML = viewController ?
    `
  <div class="col-lg-11 mb-3">
  <div class="row" style="display: flex; justify-content: space-around; background-color: lightgray; border-radius: 15px;">
    <div class="col-md-4">
      <img style="max-height: 400px; max-width: 350px;" src="${movie.img}" alt="${movie.name}">
      <div class="row" style="display: flex; justify-content: flex-start; margin-left: 25px;"> 
        <div 
          id=${movie.id} 
          data-id="${movie.id}"
          style="margin-right: 10px;"
        ></div> 
      </div>
    </div>
    <div class="col-sm-6">
      <h4>${movie.name}  (${movie.year})</h4>
      <p>${movie.description}</p>
      <div class="row pl-5">
        ${movie.genres.map(genre => `<div class="badge badge-secondary mr-1">${genre}</div>`).join('')}
      </div>
      <button class="col btn btn-secondary mt-5  _movie" data-id="${movie.id}">movie details</button> 
    </div>
    </div>
    <div 
      class="${localStorage.getItem('favorites').indexOf(movie.id) > 0 ? 'fav fav-active' : 'fav'}" 
      id=${movie.id} 
      data-id="${movie.id}"
    ></div> 
    </div>
  </div>
</div>
          `
    : `
  <div class="col mb-3">
  <div class="card" style="width: 15rem; background-color: lightgray;" id="modal-${movie.id}" >
  <div class="img-overlay">
  <figure class="cardImg" style="background-image: url(${movie.img});"></figure>
  </div>
  <div class="card-body" style="min-height: 170px; text-align: center; display: flex; flex-direction: column; justify-content: space-around;">
  <h6 class="card-title">${movie.name}</h6>
  <p class="card-text">${movie.year}</p>
  <div 
  class="${localStorage.getItem('favorites').indexOf(movie.id) > 0 ? 'fav fav-active' : 'fav'}" 
  id=${movie.id} 
  data-id="${movie.id}"
  ></div> 
  </div> 
  <button 
    class="btn btn-secondary _movie"  
    data-id="${movie.id}"
  >
  movie details
  </button>
  </div>
  </div>
  `
  node.querySelector('._movie').addEventListener('click', (event) => {
    const id = +event.target.dataset.id
    MovieCard(id);
    toggleModal();
  });
  node.querySelector('.fav').addEventListener('click', (e) => {

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const id = +e.target.dataset.id
    const item = e.target
    const index = favorites.indexOf(id)

    if (!id) return;

    if (index == -1) {
      favorites.push(id);
      item.className = 'fav-active';

    } else {
      favorites.splice(index, 1);
      item.className = 'fav';
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    RenderFav()
  });


  target.appendChild(node)
}

document.getElementById('filter').addEventListener('change', (e) => {
  const value = e.target.value
  const data = storage.getData('list');
  const sortedData = data.filter(film => film.genres.some(genre => genre.toLowerCase() === value))
  storage.setData('list', sortedData)
  renderList()
  fetchData(() => null)
})

document.getElementById('grid-view').addEventListener('click', (e) => {
  e.target.classList.toggle('view-active')
  if (document.getElementById('list-view').classList.contains('view-active')) {
    document.getElementById('list-view').classList.toggle('view-active')
  }
  renderList()
})
document.getElementById('list-view').addEventListener('click', (e) => {
  e.target.classList.toggle('view-active')
  if (document.getElementById('grid-view').classList.contains('view-active')) {
    document.getElementById('grid-view').classList.toggle('view-active')
  }
  renderList()
})
export const renderList = () => {
  const movieRoot = document.getElementById('movies');
  movieRoot.innerHTML = null
  const data = storage.getData('list');
  data.map(movie => template(movie, movieRoot))
}

const MovieList = () => {
  fetchData(renderList)
}

export default MovieList