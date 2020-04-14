import MovieList from './MoviesList';
import FavList from './FavoriteList';
import BaseHandlers from './BaseHandlers';

document.addEventListener('DOMContentLoaded', () => {

  MovieList();
  BaseHandlers();
  FavList();

})