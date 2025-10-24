import type {Movie, ViewMode} from '../types';
import MovieCard from './MovieCard';

type MovieListProps = {
  movies: Movie[];
  view: ViewMode;
  onToggleFavorite: (id: number) => void;
};

export default function MovieList({ movies, view, onToggleFavorite }: MovieListProps) {
  if (movies.length === 0) {
    return <div style={{ padding: 24, color: '#6b7280' }}>Фильмов нет</div>;
  }

  const containerStyle =
    view === 'grid'
      ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }
      : { display: 'flex', flexDirection: 'column', gap: 12 };

  return (
    <div style={containerStyle as React.CSSProperties}>
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} view={view} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
}