import type {Filter, ViewMode} from '../types';
import { useRef } from 'react';

type ToolbarProps = {
  filter: Filter;
  view: ViewMode;
  onFilterChange: (f: Filter) => void;
  onViewChange: (v: ViewMode) => void;
  onSearch: (query: string) => void;
};

export default function Toolbar({ filter, view, onFilterChange, onViewChange, onSearch }: ToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    onSearch(inputRef.current?.value ?? '');
  };

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onFilterChange('all')}
          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: filter === 'all' ? '#eef2ff' : '#fff' }}
        >
          Все
        </button>
        <button
          onClick={() => onFilterChange('fav')}
          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: filter === 'fav' ? '#eef2ff' : '#fff' }}
        >
          Только избранные
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input ref={inputRef} placeholder="Поиск по названию" style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db' }} />
        <button onClick={handleSearch} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}>
          Найти
        </button>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <button
          onClick={() => onViewChange('grid')}
          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: view === 'grid' ? '#ecfeff' : '#fff' }}
        >
          Плитка
        </button>
        <button
          onClick={() => onViewChange('list')}
          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: view === 'list' ? '#ecfeff' : '#fff' }}
        >
          Список
        </button>
      </div>
    </div>
  );
}