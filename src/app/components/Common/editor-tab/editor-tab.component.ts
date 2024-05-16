import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenElement } from 'src/app/Common/Models/element';
import { FONTSCOLLECTION } from 'src/app/Common/Models/font';

@Component({
  selector: 'gen-editor-tab',
  templateUrl: './editor-tab.component.html',
  styleUrls: ['./editor-tab.component.css'],
})
export class EditorTabComponent implements OnInit {
  @Input() cardFrontContent!: GenElement[];
  @Input() cardBackContent!: GenElement[];
  @Input() content!: GenElement[];
  @Input() frontSideSelected!: boolean;
  @Input() selectedElementId!: number;
  @Input() twoSides!: boolean;

  // Elments Properties
  // Common Prperties
  selectedElementType!: number;
  selectedHeight: number | undefined = 1;
  selectedWidth: number | undefined = 1;

  // Text Properties that are used to populate top bar
  selectedFont: number | undefined = 1;
  selectedSize: number | undefined = 1;
  selectedFontColor: string | undefined = 'red';
  isFontBold: boolean | undefined = false;
  isFontItalic: boolean | undefined = false;
  isFontUnderline: boolean | undefined = false;

  // Svg Properties that are used to populate top bar
  selectedSvgColor: string | undefined = 'red';

  // Image related properties
  msg: string = '';
  selectedImage: string | undefined = '';

  // Line realted properties
  selectedLineStyle: string | undefined = '';
  selectedLineThickness: number | undefined = 0;
  selectedLineLength: number | undefined = 0;
  selectedLineColor: string | undefined = '';

  fonts = FONTSCOLLECTION;
  lineStyles = [
    'solid',
    'dashed',
    'dotted',
    'double',
    'groove',
    'inset',
    'outset',
    'ridge',
  ];
  constructor() {}

  ngOnInit(): void {}

  selectElement(Id: any) {
    this.selectedElementId = Id;
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == Id);
    this.selectedFontColor = tempContent[index].fontColor;
    this.selectedFont = tempContent[index].fontFamily;
    this.selectedSize = tempContent[index].fontSize;
    this.isFontBold = tempContent[index].bold;
    this.isFontItalic = tempContent[index].italic;
    this.isFontUnderline = tempContent[index].underline;
    this.selectedElementType = tempContent[index].type;
    this.selectedSvgColor = tempContent[index].svgFillColor;
    this.selectedHeight = tempContent[index].height;
    this.selectedWidth = tempContent[index].width;
    this.selectedImage = tempContent[index].src;
    this.selectedLineStyle = tempContent[index].lineStyle;
    this.selectedLineThickness = tempContent[index].thickness;
    this.selectedLineLength = tempContent[index].length;
    this.selectedLineColor = tempContent[index].lineColor;
  }
  //#region Setting Text Properties
  setFontBold() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent[index].bold = !tempContent[index].bold;

    this.selectElement(this.selectedElementId);
  }
  setFontItalic() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent[index].italic = !tempContent[index].italic;

    this.selectElement(this.selectedElementId);
  }
  setFontUnderline() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent[index].underline = !tempContent[index].underline;

    this.selectElement(this.selectedElementId);
  }
  setFontFamily() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent[index].fontFamily = this.selectedFont;

    this.selectElement(this.selectedElementId);
  }
  setFontSize(type: number) {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    type == 0
      ? (tempContent[index].fontSize = this.selectedSize)
      : type == 1
      ? tempContent[index].fontSize!++
      : tempContent[index].fontSize!--;
    this.selectElement(this.selectedElementId);
  }
  setFontColor() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent[index].fontColor = this.selectedFontColor;

    this.selectElement(this.selectedElementId);
  }
  //#endregion

  //#region Setting Svg Properties
  setWidth(type: number) {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    type == 0
      ? (tempContent[index].width = this.selectedWidth)
      : type == 1
      ? tempContent[index].width!++
      : tempContent[index].width!--;
    this.selectElement(this.selectedElementId);
  }
  setHeight(type: number) {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    type == 0
      ? (tempContent[index].width = this.selectedHeight)
      : type == 1
      ? tempContent[index].width!++
      : tempContent[index].width!--;
    this.selectElement(this.selectedElementId);
  }
  setSvgColor() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent[index].svgFillColor = this.selectedSvgColor;

    this.selectElement(this.selectedElementId);
  }
  //#endregion

  //#region Setting Image Properties
  setImage() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent[index].src = this.selectedImage;

    this.selectElement(this.selectedElementId);
  }

  selectFile(event: any, templateNo: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.msg = '';
      this.selectedImage = reader.result?.toString();
      this.setImage();
    };
  }

  //#endregion

  //#region Setting Line Properties
  setThickness(type: number) {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    type == 0
      ? (tempContent[index].thickness = this.selectedLineThickness)
      : type == 1
      ? tempContent[index].thickness!++
      : tempContent[index].thickness!--;
    this.selectElement(this.selectedElementId);
  }
  setLength(type: number) {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    type == 0
      ? (tempContent[index].length = this.selectedLineLength)
      : type == 1
      ? tempContent[index].length!++
      : tempContent[index].length!--;
    this.selectElement(this.selectedElementId);
  }
  setLineColor() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent[index].lineColor = this.selectedLineColor;

    this.selectElement(this.selectedElementId);
  }
  setLineStyle() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent[index].lineStyle = this.selectedLineStyle;

    this.selectElement(this.selectedElementId);
  }
  toogleLineAlignment() {
    var tempContent = this.twoSides
      ? this.frontSideSelected
        ? this.cardFrontContent
        : this.cardBackContent
      : this.content;
    var index = tempContent.findIndex((x) => x.id == this.selectedElementId);
    tempContent[index].thickness = this.selectedLineLength;
    tempContent[index].length = this.selectedLineThickness;
    this.selectElement(this.selectedElementId);
  }
  //#endregion
}
