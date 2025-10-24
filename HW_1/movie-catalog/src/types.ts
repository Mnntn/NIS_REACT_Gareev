export type Movie = {
    id: number;
    title: string;
    year: number;
    posterUrl: string;
    isFavorite: boolean;
  };
  
  export type Filter = 'all' | 'fav';
  export type ViewMode = 'grid' | 'list';