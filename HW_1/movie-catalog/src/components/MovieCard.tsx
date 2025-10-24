import type {Movie} from '../types';

type MovieCardProps = {
  movie: Movie;
  onToggleFavorite: (id: number) => void;
  view?: 'grid' | 'list';
};

export default function MovieCard({ movie, onToggleFavorite, view = 'grid' }: MovieCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        ...(view === 'grid' ? { flexDirection: 'column', width: 220 } : { flexDirection: 'row', width: '100%' }),
      }}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        style={{ width: view === 'grid' ? 200 : 90, height: view === 'grid' ? 300 : 135, objectFit: 'cover', borderRadius: 6 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{movie.title}</div>
        <div style={{ color: '#6b7280' }}>{movie.year}</div>
        <button
          aria-label="toggle-favorite"
          onClick={() => onToggleFavorite(movie.id)}
          style={{
            alignSelf: view === 'grid' ? 'stretch' : 'flex-start',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            padding: '6px 10px',
            background: movie.isFavorite ? '#fff7ed' : '#ffffff',
            cursor: 'pointer',
          }}
        >
          ⭐ {movie.isFavorite ? 'Убрать из избранного' : 'В избранное'}
        </button>
      </div>
    </div>
  );
}