import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenElement } from 'src/app/Common/Models/element';
import { FONTSCOLLECTION } from 'src/app/Common/Models/font';

@Component({
  selector: 'gen-element-container',
  templateUrl: './element-container.component.html',
  styleUrls: ['./element-container.component.css'],
})
export class ElementContainerComponent implements OnInit {
  @Input() cardContent!: GenElement[];
  @Input() selectedElementId!: number;
  fonts = FONTSCOLLECTION;

  @Output() elementSelectorFunction = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  detectMouseClick(event: any, id: any) {
    this.selectedElementId = id;
    this.elementSelectorFunction.emit({ event, id });
  }
}
