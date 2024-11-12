import { Component, OnInit } from '@angular/core';
import { DB_PRESETS } from 'src/app/pages/preset/preset.data';

@Component({
  selector: 'gen-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  presets: any = undefined;

  items = ['I 1', 'I 2', 'I 3', 'O'];

  blocks = [
    {
      id: 1,
      name: 'Something else',
      items: ['I 1'],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.presets = [...DB_PRESETS, ...DB_PRESETS];
    }, 500);
  }

  changed(event: any) {
    console.log('changed', event);
  }
}
