export interface ElementType {
  id: number;
  name: string;
}
export const ELEMENTTYPES: ElementType[] = [
  { id: 1, name: 'svg' },
  { id: 2, name: 'img' },
  { id: 3, name: 'txt' },
  { id: 4, name: 'line' },
];

export interface GenElement
  extends TextElement,
    ImageElement,
    SvgElement,
    LineElement {
  id: number;
  type: number;
  position: number;
  top: number;
  left: number;
}

export interface ImageElement {
  src?: string;
  height?: number;
  width?: number;
}

export interface SvgElement {
  svgPath?: string;
  svgViewBox?: string;
  svgFillColor?: string;
  height?: number;
  width?: number;
}

export interface TextElement {
  text?: string;
  fontColor?: string;
  fontSize?: number;
  fontFamily?: number;
  fontWeight?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface LineElement {
  lineStyle?: string;
  thickness?: number;
  length?: number;
  lineColor?: string;
}
