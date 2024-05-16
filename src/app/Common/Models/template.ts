import { ImageElement, LineElement, SvgElement, TextElement } from './element';

export const IMAGETEMPLATES: ImageElement[] = [
  {
    height: 120,
    width: 200,
    src: 'https://cdn.pixabay.com/photo/2022/05/22/15/02/pizza-7213599_960_720.jpg',
  },
  {
    height: 200,
    width: 120,
    src: 'https://images.unsplash.com/photo-1529310399831-ed472b81d589?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  },
];

export const LINETEMPLATES: LineElement[] = [
  {
    lineStyle: 'solid',
    thickness: 5,
    length: 250,
    lineColor: 'gray',
  },
  { lineStyle: 'dashed', thickness: 2, length: 250, lineColor: 'green' },
];

export const SVGTEMPLATES: SvgElement[] = [
  {
    svgPath: 'M245,456.701 490,33.299 0,33.299',
    svgViewBox: '0 0 490 490',
    svgFillColor: 'black',
    height: 110,
    width: 110,
  },
  {
    svgPath: 'M384.644,0 105.356,0 105.356,210.712 384.644,490',
    svgViewBox: '0 0 490 490',
    svgFillColor: 'var(--primary)',
    height: 110,
    width: 110,
  },
];

export const TEXTTEMPLATES: TextElement[] = [
  {
    text: 'Text here',
    fontColor: '#0089D0',
    fontFamily: 2,
    fontSize: 35.77,
    fontWeight: 'bold',
    bold: true,
    italic: true,
    underline: true,
  },
  {
    text: 'Text here',
    fontColor: 'black',
    fontFamily: 2,
    fontSize: 18,
    fontWeight: 'bold',
    bold: false,
    italic: false,
    underline: false,
  },
  {
    text: 'Text here',
    fontColor: 'red',
    fontFamily: 7,
    fontSize: 30,
    fontWeight: 'bold',
    bold: true,
    italic: false,
    underline: false,
  },
  {
    text: 'Text here',
    fontColor: 'black',
    fontFamily: 8,
    fontSize: 35,
    fontWeight: 'bold',
    bold: false,
    italic: true,
    underline: false,
  },
];
