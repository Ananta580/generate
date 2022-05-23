import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gen-visiting-preset',
  templateUrl: './visiting-preset.component.html',
  styleUrls: ['./visiting-preset.component.css']
})
export class VisitingPresetComponent implements OnInit {

  isFront = true;
  cards = [1, 2, 3, 4, 5, 6, 7, 8]
  constructor() { }

  ngOnInit(): void {
  }
  onMouseOver() {
    this.isFront = false;
  }
  onMouseOut() {
    this.isFront = true;
  }

}
