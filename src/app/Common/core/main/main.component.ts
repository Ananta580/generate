import { Component, OnInit } from '@angular/core';
import { DB_PRESETS } from 'src/app/pages/preset/preset.data';

@Component({
  selector: 'gen-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  presets: any = undefined;

  items = ['Item 1', 'Item 2', 'Item 3'];

  blocks = [
    {
      id: 1,
      name: 'Item 4',
      items: ['Item 1', 'Item 2', 'Item 3'],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.presets = [...DB_PRESETS, ...DB_PRESETS];
    }, 500);
  }

  get getitems() {
    return [...this.items, 'New Item'];
  }

  changed(event: any) {
    console.log('changed', event);
  }
}
