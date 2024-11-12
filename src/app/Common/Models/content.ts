import { ElementInner } from './element';

export interface ElementOuter {
  contentId: number;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  type: string;
  date: string;
  designer: string;
  content: ElementInner[];
  file?: File;
}
