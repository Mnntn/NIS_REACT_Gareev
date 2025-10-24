import type {Movie} from '../types';

export const MOVIES: Movie[] = [
  { id: 1, title: 'The Matrix', year: 1999, posterUrl: '/matrix.png', isFavorite: false },
  { id: 2, title: 'Inception', year: 2010, posterUrl: '/inception.png', isFavorite: true },
  { id: 3, title: 'Interstellar', year: 2014, posterUrl: '/interstellar.png', isFavorite: false },
  { id: 4, title: 'The Godfather', year: 1972, posterUrl: '/the-god-father.png', isFavorite: false },
  { id: 5, title: 'The Dark Knight', year: 2008, posterUrl: '/the-dark-knight.png', isFavorite: true },
];