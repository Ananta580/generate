import { ElementInner } from './element';

export interface ElementOuter {
  contentId: number;
  width: number;
  height: number;
  content: ElementInner[];
  file?: File;
}
