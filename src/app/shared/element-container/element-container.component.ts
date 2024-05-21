import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementInner } from 'src/app/common/Models/element';
import { FONTSCOLLECTION } from 'src/app/common/Models/font';

@Component({
  selector: 'gen-element-container',
  templateUrl: './element-container.component.html',
  styleUrls: ['./element-container.component.css'],
})
export class ElementContainerComponent implements OnInit {
  @Input() cardContent!: ElementInner[];
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
