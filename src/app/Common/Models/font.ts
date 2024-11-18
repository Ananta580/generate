export interface FontCollection {
  id: number;
  name: string;
  display: string;
}

export const FONTSCOLLECTION: FontCollection[] = [
  { id: 1, name: "'Roboto', sans-serif", display: 'Roboto' },
  { id: 2, name: "'Courier Prime', monospace", display: 'Courier Prime' },
  { id: 3, name: "'Dancing Script', cursive", display: 'Dancing Script' },
  { id: 4, name: "'Libre Franklin', sans-serif", display: 'Libre Franklin' },
  { id: 5, name: "'Merriweather', serif", display: 'Merriweather' },
  { id: 6, name: "'Noto Sans', sans-serif", display: 'Noto Sans' },
  { id: 7, name: "'Nunito Sans', sans-serif", display: 'Nunito Sans' },
  { id: 8, name: "'Open Sans', sans-serif", display: 'Open Sans' },
  {
    id: 9,
    name: "'Big Shoulders Stencil Text', cursive",
    display: 'Big Shoulders',
  },
  { id: 10, name: "'Tourney', cursive", display: 'Tourney' },
];
