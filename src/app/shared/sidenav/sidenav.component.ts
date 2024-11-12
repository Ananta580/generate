import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ElementInner } from 'src/app/common/Models/element';
import { FONTSCOLLECTION } from 'src/app/common/Models/font';
import {
  TEXTTEMPLATES,
  IMAGETEMPLATES,
  SVGTEMPLATES,
  LINETEMPLATES,
} from 'src/app/common/Models/template';

@Component({
  selector: 'gen-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  @Output() loadDrops = new EventEmitter<any>();

  @Input() cardFrontContent!: ElementInner[];
  @Input() cardBackContent!: ElementInner[];
  @Input() content!: ElementInner[];
  @Input() frontSideSelected!: boolean;
  @Input() twoSides!: boolean;

  selectedElementId!: number;

  @Output() downloadJpg = new EventEmitter<any>();

  @Output() downloadSvg = new EventEmitter<any>();

  @Output() addNewContent = new EventEmitter<any>();

  @Output() updateExistingContent = new EventEmitter<any>();
  isAdminLoggedIn = JSON.parse(
    localStorage.getItem('isAdminLoggedIn') || 'false'
  );

  constructor(
    private offcanvasService: NgbOffcanvas,
    private location: Location
  ) {}

  textTemplates = TEXTTEMPLATES;
  imageTemplates = IMAGETEMPLATES;
  svgTemplates = SVGTEMPLATES;
  lineTemplates = LINETEMPLATES;
  fonts = FONTSCOLLECTION;
  addElementType = 0;
  ngOnInit(): void {}

  goback() {
    this.location.back();
  }

  open(content: any, type: number) {
    this.selectedElementId = 0;
    this.addElementType = type;
    this.offcanvasService.open(content, {
      ariaLabelledBy: 'offcanvas-basic-title',
    });
  }

  //#region
  //Addition of new Element
  addElement(type: number, index: number, lineOrientation: string = '') {
    var selectedTemplate = JSON.parse(
      JSON.stringify(
        type == 1
          ? this.svgTemplates[index]
          : type == 2
          ? this.imageTemplates[index]
          : type == 3
          ? this.textTemplates[index]
          : this.lineTemplates[index]
      )
    );
    var addElement: ElementInner = selectedTemplate as ElementInner;
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    addElement.length =
      lineOrientation == 'v'
        ? this.lineTemplates[index].thickness
        : lineOrientation !== ''
        ? this.lineTemplates[index].length
        : 0;
    addElement.thickness =
      lineOrientation == 'v'
        ? this.lineTemplates[index].length
        : lineOrientation !== ''
        ? this.lineTemplates[index].thickness
        : 0;
    addElement.id = this.twoSides
      ? Math.max(
          ...this.cardFrontContent.map((o) => o.id),
          ...this.cardBackContent.map((o) => o.id)
        ) + 1
      : Math.max(...this.content.map((o) => o.id)) + 1;
    this.selectedElementId = addElement.id;
    addElement.type = type;
    addElement.left = 10;
    addElement.top = 10;
    addElement.position = Math.max(...tempContent.map((o) => o.position)) + 1;
    tempContent.push(addElement);
    this.callParentBack();
    this.offcanvasService.dismiss();
  }
  // For Adding Text Template
  addText(index: number) {
    this.addElement(3, index);
  }
  // For Adding Image Template
  addImage(index: number) {
    this.addElement(2, index);
  }
  // For Adding Svg Template
  addSvg(index: number) {
    this.addElement(1, index);
  }
  // For adding Line Template
  addLine(style: string, index: number) {
    this.addElement(4, index, style);
  }
  //#endregion

  callParentBack() {
    this.loadDrops.emit(this.selectedElementId);
  }
}
