import { Component, OnInit } from '@angular/core';
import { Preset } from 'src/app/Common/Models/Preset';

@Component({
  selector: 'gen-visiting-preset',
  templateUrl: './visiting-preset.component.html',
  styleUrls: ['./visiting-preset.component.css'],
})
export class VisitingPresetComponent implements OnInit {
  visitingCards: Preset[] = [
    {
      imgsrc: 'assets/visitingcard/visitingcard1.png',
      designer: 'Ananta Poudel',
      date: new Date(),
      title: 'Dummy Visiting card for Adidas',
      subtitle: 'You can use this to make other type of cards',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
