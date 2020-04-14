import Modal from'./Modal';
import {RenderFav} from './FavoriteList'
import {renderList} from './MoviesList'

  const template = (movie) => {
    const node = document.createElement('div')
    node.innerHTML = `
    <div class="row" style="display: flex; justify-content: space-around;">
      <div class="col-md-5">
        <img style="max-height: 400px; max-width: 350px;" src="${movie.img}" alt="${movie.name}">
        <div class="row" style="display: flex; justify-content: flex-start; margin-left: 25px;"> 
        <div 
          class="${localStorage.getItem('favorites').indexOf(movie.id) > 0 
          ? 'fav-year fav-year-active' 
          : 'fav-year fav-year' }" 
          id=${movie.id} 
          data-id="${movie.id}"
          style="margin-right: 10px;"
        ></div> 
          <p style="font-size: 32px;">${movie.year}</p>
      </div>
          <div class="row pl-5">
            ${movie.genres.map(genre => `<div class="badge badge-secondary mr-1">${genre}</div>`).join('')}
          </div>
        </div>
        <div class="col-sm-4">
          <h4>${movie.name}</h4>
          <p class="mb-5">${movie.description}</p>
          <p>Director: ${movie.director}</p>
          <p>Starring: ${movie.starring.map(star => `<span class="ml-1" >${star}</span>`)}</p>
        </div>
    </div>
    `
    node.querySelector('.fav-year').addEventListener('click', (e) => {

      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const id = +e.target.dataset.id
      const item = e.target
      const index = favorites.indexOf(id)
     
      if (!id) return;
     
      if (index == -1) {
        favorites.push(id);
        item.className = 'fav-year-active';
      
      } else {
        favorites.splice(index, 1);
        item.className = 'fav-year';
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      RenderFav()
      renderList()
    });
    return node;
}
const MovieCard = (id) => {
  
  const fetchData = (callback) => {
    fetch(`http://my-json-server.typicode.com/moviedb-tech/movies/list/${id}`)
    .then(res => res.json()).then(callback)
  }

  const renderList = (data) => {
    const node = template(data)

    Modal( data.name, node );
  }
   fetchData(renderList)
}


export default MovieCard