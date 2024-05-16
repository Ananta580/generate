export interface FontCollection {
  id: number;
  name: string;
  display: string;
}

export interface FontSize {
  id: number;
  name: string;
}

export const FONTSCOLLECTION: FontCollection[] = [
  { id: 1, name: "'Courier New', Courier, monospace", display: 'Courier' },
  {
    id: 2,
    name: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
    display: 'Franklin',
  },
  {
    id: 3,
    name: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
    display: 'Gill Sans',
  },
  {
    id: 4,
    name: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    display: 'Lucida Sans',
  },
  {
    id: 5,
    name: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'Segoe UI',
  },
  {
    id: 6,
    name: "'Times New Roman', Times, serif",
    display: 'Times',
  },
  {
    id: 7,
    name: "'Tourney', cursive",
    display: 'Tourney',
  },
  {
    id: 8,
    name: "'Big Shoulders Stencil Text', cursive",
    display: 'Big Shoulders',
  },
  { id: 9, name: "'Open Sans', sans-serif", display: 'Open Sans' },
  { id: 10, name: "'Dancing Script', cursive", display: 'Dancing Script' },
];

export const FONTSIZES: FontSize[] = [
  { id: 1, name: '12' },
  { id: 2, name: '14' },
  { id: 3, name: '16' },
  { id: 4, name: '18' },
];
