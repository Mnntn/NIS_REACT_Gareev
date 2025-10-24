import { useMemo, useState } from 'react';
import type {Filter, Movie, ViewMode} from './types';
import { MOVIES } from './data/movies.mock';
import Toolbar from './components/Toolbar';
import MovieList from './components/MovieList';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(MOVIES);
  const [filter, setFilter] = useState<Filter>('all');
  const [view, setView] = useState<ViewMode>('grid');
  const [query, setQuery] = useState<string>('');

  const filtered = useMemo(() => {
    let base = movies;
    if (filter === 'fav') base = base.filter((m) => m.isFavorite);
    const q = query.trim().toLowerCase();
    if (q) base = base.filter((m) => m.title.toLowerCase().includes(q));
    return base;
  }, [movies, filter, query]);

  const toggleFavorite = (id: number) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    );
  };

  return (
    <div style={{ maxWidth: 1000, margin: '24px auto', padding: '0 16px' }}>
      <h1 style={{ marginBottom: 12 }}>Каталог фильмов</h1>
      <Toolbar
        filter={filter}
        view={view}
        onFilterChange={setFilter}
        onViewChange={setView}
        onSearch={setQuery}
      />
      <MovieList movies={filtered} view={view} onToggleFavorite={toggleFavorite} />
    </div>
  );
}