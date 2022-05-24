import { ImageElement } from './ImageElement';
import { SvgElement } from './SvgElement';
import { TextElement } from './TextElement';

export interface GenElement extends TextElement, ImageElement, SvgElement {
  id: number;
  type: number;
  position: number;
  top: number;
  left: number;
  height?: number;
  width?: number;
}
