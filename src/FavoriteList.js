import storage from './storage';
import { toggleModal } from './Modal';
import MovieCard from "./MovieCard";
import {renderList} from './MoviesList'

const reinitData = (callback) => {
  fetch('http://my-json-server.typicode.com/moviedb-tech/movies/list')
  .then(res => res.json()).then( res => {
    storage.setData('favoriteList', res );
    callback();
  })
}

const template = (movie, target) => {
  const node = document.createElement('li')
  node.innerHTML = `   
      <span data-id=${movie.id} class="_fav_movie">${movie.name}</span>
      <span data-id=${movie.id} class="_fav_list_item">&times;</span>
    `
    node.querySelector('._fav_movie').addEventListener('click', (e) => {
      const id = +e.target.dataset.id
      MovieCard(id);
      toggleModal();
    })
    node.querySelector('._fav_list_item').addEventListener('click', (e) => {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
        const id = +e.target.dataset.id
        const index = favorites.indexOf(id)
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        target.removeChild(node)
        renderList()
    });

  target.appendChild(node)
}

export const RenderFav = () => {
  const favRoot = document.getElementById('favorite-list');
  favRoot.innerHTML = null
  const data = storage.getData('favoriteList')
  .filter(movie => JSON.parse(localStorage.getItem('favorites'))
  .some(id => id === movie.id));
  
  data.map(movie => template(movie, favRoot))
}

const FavoriteList = () => {
  reinitData(RenderFav)
}

export default FavoriteList