import { Component, OnInit } from '@angular/core';
import { Preset } from 'src/app/Common/Models/Preset';

@Component({
  selector: 'gen-flyers-preset',
  templateUrl: './flyers-preset.component.html',
  styleUrls: ['./flyers-preset.component.css'],
})
export class FlyersPresetComponent implements OnInit {
  flyers: Preset[] = [
    {
      imgsrc: 'assets/flyer/flyer1.png',
      designer: 'Ananta Poudel',
      date: new Date(),
      title: 'Royal Real Estate Flyer',
      subtitle:
        'This can be used for several puroposes to showcase different things.',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
