import { Component, OnInit } from '@angular/core';
import { Preset } from 'src/app/Common/Models/Preset';

@Component({
  selector: 'gen-banner-preset',
  templateUrl: './banner-preset.component.html',
  styleUrls: ['./banner-preset.component.css'],
})
export class BannerPresetComponent implements OnInit {
  banners: Preset[] = [
    {
      imgsrc: 'src/assets/images/Front.jpg',
      designer: 'Ananta Poudel',
      date: new Date(),
      title: 'Made for Leo club',
      subtitle:
        'You can use this to congratulate anyone with 2 person at a time',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
