import { ImageElement } from './ImageElement';
import { LineElement } from './LineElement';
import { SvgElement } from './SvgElement';
import { TextElement } from './TextElement';

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
