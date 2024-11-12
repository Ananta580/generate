import { Component, OnInit } from '@angular/core';
import { DB_PRESETS } from 'src/app/pages/preset/preset.data';

@Component({
  selector: 'gen-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  presets: any = undefined;

  renameValues = ['BAD', 'GOOD'];
  leadOptions = ['Any', 'LD1', 'LD2'];

  renameOtherValue = {
    label: 'Others',
    key: 'Others',
  };

  renameWithOtherValues = [...this.renameValues, 'Others'];

  blocks = [
    {
      id: 1,
      newName: 'New',
      name: 'Something else',
      leadOptions: ['Any'],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.presets = [...DB_PRESETS, ...DB_PRESETS];
    }, 500);
  }

  changed(block: any, event: any) {
    if (event === 'Others') {
      block.newName = '';
      return;
    }
    block.newName = event;
    console.log('changed', event);
  }
}
