import { Component, OnInit } from '@angular/core';
import { Preset } from 'src/app/common/Models/preset';

@Component({
  selector: 'gen-logo-preset',
  templateUrl: './logo-preset.component.html',
  styleUrls: ['./logo-preset.component.css'],
})
export class LogoPresetComponent implements OnInit {
  logos: Preset[] = [
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
