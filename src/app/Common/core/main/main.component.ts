import { Component, OnInit } from '@angular/core';
import { DB_PRESETS } from 'src/app/pages/preset/preset.data';

@Component({
  selector: 'gen-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  presets: any = undefined;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.presets = [...DB_PRESETS, ...DB_PRESETS];
    }, 1000);
  }
}
