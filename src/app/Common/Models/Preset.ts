export interface Preset {
  imgsrc: string;
  title: string;
  subtitle: string;
  designer: string;
  date: Date;
  type?: PRESET_TYPE;
}

export enum PRESET_TYPE {
  VISTING_CARD = 'visiting-card',
  BANNER = 'banner',
  LOGO = 'logo',
  FLYER = 'flyer',
  POST = 'post',
}
