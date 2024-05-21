import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementInner } from 'src/app/common/Models/element';

@Component({
  selector: 'gen-right-click-container',
  templateUrl: './right-click-container.component.html',
  styleUrls: ['./right-click-container.component.css'],
})
export class RightClickContainerComponent implements OnInit {
  @Input() showRightClickPanel: string | undefined;
  @Input() rightClickPanelY: number | undefined;
  @Input() rightClickPanelX: number | undefined;
  @Input() positionX: number | undefined;
  @Input() positionY: number | undefined;
  @Input() cardFrontContent!: ElementInner[];
  @Input() cardBackContent!: ElementInner[];
  @Input() content!: ElementInner[];
  @Input() frontSideSelected!: boolean;
  @Input() twoSides!: boolean;
  @Input() selectedElementId!: number;

  @Output() loadDrops = new EventEmitter<any>();
  copiedElement: any;
  isElementCopied = false;
  selectedElementType!: number;
  constructor() {}

  ngOnInit(): void {}
  pasteElement() {
    if (this.isElementCopied) {
      var selectedId = 0;
      var tempContent = this.twoSides
        ? this.frontSideSelected
          ? this.cardFrontContent
          : this.cardBackContent
        : this.content;
      var copiedContent = JSON.parse(JSON.stringify(this.copiedElement));
      copiedContent.id = selectedId = tempContent.length + 1;
      copiedContent.left = this.positionX;
      copiedContent.top = this.positionY;
      copiedContent.position = tempContent.length + 1;
      tempContent.push(copiedContent);
      this.selectedElementId = selectedId;
      this.callParentBack();
    }
  }
  pasteProperty() {
    // Copy property except: Top, Left, Position, Type, Id
    if (this.isElementCopied) {
      console.log(this.copiedElement.type, this.selectedElementType);
      var tempContent = this.twoSides
        ? this.frontSideSelected
          ? this.cardFrontContent
          : this.cardBackContent
        : this.content;
      var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
      if (this.copiedElement.type == tempContent[index].type) {
        switch (tempContent[index].type) {
          case 1: {
            tempContent[index].svgFillColor = this.copiedElement.svgFillColor;
            break;
          }
          case 2: {
            tempContent[index].src = this.copiedElement.src;
            break;
          }
          case 3: {
            tempContent[index].bold = this.copiedElement.bold;
            tempContent[index].fontColor = this.copiedElement.fontColor;
            tempContent[index].fontFamily = this.copiedElement.fontFamily;
            tempContent[index].fontSize = this.copiedElement.fontSize;
            tempContent[index].bold = this.copiedElement.bold;
            tempContent[index].italic = this.copiedElement.italic;
            tempContent[index].underline = this.copiedElement.underline;
            break;
          }
          case 4: {
            break;
          }
        }
      }
      this.callParentBack();
    }
  }
  copyElementOrProperty(
    type: number
  ) /* If type=0, copy element */ /* If type=1, copy property */ {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    this.copiedElement = tempContent[index];
    this.isElementCopied = true;
    console.log(this.selectedElementType);
    this.callParentBack();
  }
  sendElementBack() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    var backPosition = tempContent[index - 1].position;
    var orgPosition = tempContent[index].position;
    tempContent[index].position = backPosition;
    tempContent[index - 1].position = orgPosition;
    tempContent = tempContent.sort((a, b) => a.position - b.position);
    this.callParentBack();
  }
  bringElementForward() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    var backPosition = tempContent[index + 1].position;
    var orgPosition = tempContent[index].position;
    tempContent[index].position = backPosition;
    tempContent[index + 1].position = orgPosition;
    tempContent = tempContent.sort((a, b) => a.position - b.position);
    this.callParentBack();
  }
  deleteElement() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent.splice(index, 1);
    this.callParentBack();
  }

  callParentBack() {
    this.loadDrops.emit(this.selectedElementId);
  }
}
