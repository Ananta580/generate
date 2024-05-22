import { Preset, PRESET_TYPE } from 'src/app/common/Models/preset';

export const DB_PRESETS: Preset[] = [
  {
    imgsrc: 'assets/visitingcard/visitingcard1.png',
    designer: 'Ananta Poudel',
    date: new Date(),
    title: 'Dummy Visiting card for Adidas',
    subtitle: 'You can use this to make other type of cards',
    type: PRESET_TYPE.VISTING_CARD,
  },
  {
    imgsrc: 'assets/banner/banner1.jpg',
    designer: 'Ananta Poudel',
    date: new Date(),
    title: 'Made for Leo club',
    subtitle: 'You can use this to congratulate anyone with 2 person at a time',
    type: PRESET_TYPE.BANNER,
  },
  {
    imgsrc: 'src/assets/images/Front.jpg',
    designer: 'Ananta Poudel',
    date: new Date(),
    title: 'Made for Leo club',
    subtitle: 'You can use this to congratulate anyone with 2 person at a time',
    type: PRESET_TYPE.LOGO,
  },
  {
    imgsrc: 'assets/flyer/flyer1.png',
    designer: 'Ananta Poudel',
    date: new Date(),
    title: 'Royal Real Estate Flyer',
    subtitle:
      'This can be used for several puroposes to showcase different things.',
    type: PRESET_TYPE.FLYER,
  },
  {
    imgsrc: 'src/assets/images/Front.jpg',
    designer: 'Ananta Poudel',
    date: new Date(),
    title: 'Made for Leo club',
    subtitle: 'You can use this to congratulate anyone with 2 person at a time',
    type: PRESET_TYPE.POST,
  },
];
