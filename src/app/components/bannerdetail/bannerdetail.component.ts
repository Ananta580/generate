import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import * as htmlToImage from 'html-to-image';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { SessionData } from 'src/app/Common/Data/Session';
import { BANNERCONTENT } from 'src/app/Common/Models/DummyBannerContent';
import {
  BACKCONTENT,
  FRONTCONTENT,
} from 'src/app/Common/Models/DummyVisitingCardContent';
import { GenElement } from 'src/app/Common/Models/Element';
import { ELEMENTTYPES } from 'src/app/Common/Models/ElementType';
import { FONTSCOLLECTION } from 'src/app/Common/Models/FontCollection';
import { FONTSIZES } from 'src/app/Common/Models/FontSizes';
import { IMAGETEMPLATES } from 'src/app/Common/Models/ImageTemplate';
import { LINETEMPLATES } from 'src/app/Common/Models/LineTemplate';
import { SVGTEMPLATES } from 'src/app/Common/Models/SvgTemplate';
import { TEXTTEMPLATES } from 'src/app/Common/Models/TextTemplate';
import { ToastService } from 'src/app/Common/services/toast-service';

@Component({
  selector: 'gen-bannerdetail',
  templateUrl: './bannerdetail.component.html',
  styleUrls: ['./bannerdetail.component.css'],
})
export class BannerdetailComponent implements OnInit {
  // Editor Tab Properties

  // Properties as required
  selectedElementId = 0;
  frontSideSelected = true;
  selectedElementType = 0;
  itemHeight = 630;
  itemWidth = 930;

  // Right click related properties
  showRightClickPanel = 'none';
  rightClickPanelX = 0;
  rightClickPanelY = 0;
  positionX = 0;
  positionY = 0;
  copiedElement: any;

  // Required Constants
  ContentType = ELEMENTTYPES;
  fonts = FONTSCOLLECTION;
  sizes = FONTSIZES;
  bannerContent = BANNERCONTENT;
  cardBackContent = BACKCONTENT;
  textTemplates = TEXTTEMPLATES;
  imageTemplates = IMAGETEMPLATES;
  svgTemplates = SVGTEMPLATES;
  lineTemplates = LINETEMPLATES;
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

  // Common Prperties
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

  // Off Canvas
  closeResult = '';
  addElementType = 0;

  constructor(
    private _route: ActivatedRoute,
    private session: SessionData,
    public toastService: ToastService,
    private offcanvasService: NgbOffcanvas
  ) {
    session.setMenuBar(false);
    console.log(_route.snapshot.paramMap.get('Id'));
    this.loadDrops();
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.session.setMenuBar(true);
  }

  //#region Downloading Image
  downloadJpg(side: any) {
    this.selectedElementId = 0;
    var node: any = document.getElementById(
      side == 'f' ? 'f-image-section' : 'b-image-section'
    );
    htmlToImage.toJpeg(node).then(function (dataUrl) {
      var link = document.createElement('a');
      link.download =
        side == 'f' ? 'Visiting-Card-Front.jpg' : 'Visiting-Card-Back.jpg';
      link.href = dataUrl;
      link.click();
    });
  }
  downloadSvg(side: any) {
    this.selectedElementId = 0;
    var node: any = document.getElementById(
      side == 'f' ? 'f-image-section' : 'b-image-section'
    );
    htmlToImage.toSvg(node).then(function (dataUrl) {
      var link = document.createElement('a');
      link.download =
        side == 'f' ? 'Visiting-Card-Front.svg' : 'Visiting-Card-Back.svg';
      link.href = dataUrl;
      link.click();
    });
  }
  //#endregion

  //#region Drag and Drops event
  loadDrops() {
    var attributeDetail: { Id: any; PositionY: any; PositionX: any };
    var bannerContent = this.bannerContent;
    var cardBackContent = this.cardBackContent;
    $(() => {
      bannerContent.forEach((item: GenElement) => {
        $('#' + item.id).attr('contenteditable', 'true');
        //DRAG USING GRID
        (<any>$('#' + item.id)).draggable({
          grid: [1, 1],
          drag: (event: any, ui: any) => {
            //this.dragMultipleItems(ui);
          },
        });
      });

      cardBackContent.forEach((item: GenElement) => {
        $('#' + item.id).attr('contenteditable', 'true');
        //DRAG USING GRID
        (<any>$('#' + item.id)).draggable({
          grid: [1, 1],
          drag: (event: any, ui: any) => {
            //this.dragMultipleItems(ui);
          },
        });
      });

      (<any>$('#f-image-section')).droppable({
        drop: (event: any, ui: any) => {
          attributeDetail = {
            Id: ui.draggable[0].id,
            PositionX: ui.position.left,
            PositionY: ui.position.top,
          };
          {
            var attributeIndex = this.bannerContent.findIndex(
              (x) => x.id == attributeDetail.Id
            );
            var attribute = this.bannerContent[attributeIndex];
            attribute.top = attributeDetail.PositionY;
            attribute.left = attributeDetail.PositionX;
            this.bannerContent[attributeIndex] = attribute;
            //this.dropMultipleItems();
          }
        },
      });

      (<any>$('#b-image-section')).droppable({
        drop: (event: any, ui: any) => {
          attributeDetail = {
            Id: ui.draggable[0].id,
            PositionX: ui.position.left,
            PositionY: ui.position.top,
          };
          {
            var attributeIndex = this.cardBackContent.findIndex(
              (x) => x.id == attributeDetail.Id
            );
            var attribute = this.cardBackContent[attributeIndex];
            attribute.top = attributeDetail.PositionY;
            attribute.left = attributeDetail.PositionX;
            this.cardBackContent[attributeIndex] = attribute;
            //this.dropMultipleItems();
          }
        },
      });
    });
    //DROP
  }
  //#endregion

  //#region Right Click Event
  detectMouseClick(event: any, side: any, id: any) {
    if (event.which == 3) {
      this.showRightClickPanel = 'block';
      this.selectedElementId = id != '' ? id : this.selectedElementId;
      this.rightClickPanelX = event.clientX;
      this.rightClickPanelY = event.clientY;
      this.positionX = event.offsetX;
      this.positionY = event.offsetY;
    }
    if (event.which == 1 && id !== '') {
      this.selectElement(side, id);
    }
  }
  closeContextMenu() {
    this.showRightClickPanel = 'none';
  }
  //#endregion

  //#region Select element and card
  selectFrontSide() {
    this.frontSideSelected = true;
    this.selectedElementId = 0;
    this.loadDrops();
  }
  selectBackSide() {
    this.frontSideSelected = false;
    this.selectedElementId = 0;
    this.loadDrops();
  }
  selectElement(side: any, Id: any) {
    this.selectedElementId = Id;
    if (side == 'f') {
      var index = this.bannerContent.findIndex((x) => x.id == Id);
      this.selectedFontColor = this.bannerContent[index].fontColor;
      this.selectedFont = this.bannerContent[index].fontFamily;
      this.selectedSize = this.bannerContent[index].fontSize;
      this.isFontBold = this.bannerContent[index].bold;
      this.isFontItalic = this.bannerContent[index].italic;
      this.isFontUnderline = this.bannerContent[index].underline;
      this.selectedElementType = this.bannerContent[index].type;
      this.selectedSvgColor = this.bannerContent[index].svgFillColor;
      this.selectedHeight = this.bannerContent[index].height;
      this.selectedWidth = this.bannerContent[index].width;
      this.selectedImage = this.bannerContent[index].src;
      this.selectedLineStyle = this.bannerContent[index].lineStyle;
      this.selectedLineThickness = this.bannerContent[index].thickness;
      this.selectedLineLength = this.bannerContent[index].length;
      this.selectedLineColor = this.bannerContent[index].lineColor;
    } else {
      var index = this.cardBackContent.findIndex((x) => x.id == Id);
      this.selectedFontColor = this.cardBackContent[index].fontColor;
      this.selectedFont = this.cardBackContent[index].fontFamily;
      this.selectedSize = this.cardBackContent[index].fontSize;
      this.isFontBold = this.cardBackContent[index].bold;
      this.isFontItalic = this.cardBackContent[index].italic;
      this.isFontUnderline = this.cardBackContent[index].underline;
      this.selectedElementType = this.cardBackContent[index].type;
      this.selectedSvgColor = this.cardBackContent[index].svgFillColor;
      this.selectedHeight = this.cardBackContent[index].height;
      this.selectedWidth = this.cardBackContent[index].width;
      this.selectedImage = this.cardBackContent[index].src;
      this.selectedLineStyle = this.cardBackContent[index].lineStyle;
      this.selectedLineThickness = this.cardBackContent[index].thickness;
      this.selectedLineLength = this.cardBackContent[index].length;
      this.selectedLineColor = this.cardBackContent[index].lineColor;
    }
  }
  //#endregion

  //#region Setting Text Properties
  setFontBold() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent[index].bold = !this.bannerContent[index].bold;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent[index].bold = !this.cardBackContent[index].bold;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  setFontItalic() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent[index].italic = !this.bannerContent[index].italic;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent[index].italic = !this.cardBackContent[index].italic;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  setFontUnderline() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent[index].underline =
        !this.bannerContent[index].underline;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent[index].underline =
        !this.cardBackContent[index].underline;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  setFontFamily() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent[index].fontFamily = this.selectedFont;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent[index].fontFamily = this.selectedFont;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  setFontSize(type: number) {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.bannerContent[index].fontSize = this.selectedSize)
        : type == 1
        ? this.bannerContent[index].fontSize!++
        : this.bannerContent[index].fontSize!--;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.cardBackContent[index].fontSize = this.selectedSize)
        : type == 1
        ? this.cardBackContent[index].fontSize!++
        : this.cardBackContent[index].fontSize!--;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  setFontColor() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent[index].fontColor = this.selectedFontColor;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent[index].fontColor = this.selectedFontColor;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  //#endregion

  //#region Setting Svg Properties
  setWidth(type: number) {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.bannerContent[index].width = this.selectedWidth)
        : type == 1
        ? this.bannerContent[index].width!++
        : this.bannerContent[index].width!--;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.cardBackContent[index].width = this.selectedWidth)
        : type == 1
        ? this.cardBackContent[index].width!++
        : this.cardBackContent[index].width!--;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  setHeight(type: number) {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.bannerContent[index].height = this.selectedHeight)
        : type == 1
        ? this.bannerContent[index].height!++
        : this.bannerContent[index].height!--;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.cardBackContent[index].height = this.selectedHeight)
        : type == 1
        ? this.cardBackContent[index].height!++
        : this.cardBackContent[index].height!--;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  setSvgColor() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent[index].svgFillColor = this.selectedSvgColor;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent[index].svgFillColor = this.selectedSvgColor;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  //#endregion

  //#region Setting Image Properties
  setImage() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent[index].src = this.selectedImage;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent[index].src = this.selectedImage;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
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
      console.log(this.selectedImage);
      this.selectedElementId == 0 ? this.addImage(templateNo) : this.setImage();
    };
  }
  //#endregion

  //#region Setting Line Properties
  setThickness(type: number) {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.bannerContent[index].thickness = this.selectedLineThickness)
        : type == 1
        ? this.bannerContent[index].thickness!++
        : this.bannerContent[index].thickness!--;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.cardBackContent[index].thickness = this.selectedLineThickness)
        : type == 1
        ? this.cardBackContent[index].thickness!++
        : this.cardBackContent[index].thickness!--;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  setLength(type: number) {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.bannerContent[index].length = this.selectedLineLength)
        : type == 1
        ? this.bannerContent[index].length!++
        : this.bannerContent[index].length!--;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.cardBackContent[index].length = this.selectedLineLength)
        : type == 1
        ? this.cardBackContent[index].length!++
        : this.cardBackContent[index].length!--;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  setLineColor() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent[index].lineColor = this.selectedLineColor;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent[index].lineColor = this.selectedLineColor;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  setLineStyle() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent[index].lineStyle = this.selectedLineStyle;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent[index].lineStyle = this.selectedLineStyle;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  toogleLineAlignment() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent[index].thickness = this.selectedLineLength;
      this.bannerContent[index].length = this.selectedLineThickness;
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent[index].thickness = this.selectedLineLength;
      this.cardBackContent[index].length = this.selectedLineThickness;
    }
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
  }
  //#endregion

  //#region Context Menu Functions
  pasteElement() {
    if (this.copiedElement != undefined) {
      var selectedId = 0;
      if (this.frontSideSelected) {
        var tempContent = JSON.parse(JSON.stringify(this.copiedElement));
        tempContent.id = selectedId = this.bannerContent.length + 1;
        tempContent.left = this.positionX;
        tempContent.top = this.positionY;
        tempContent.position = this.bannerContent.length + 1;
        this.bannerContent.push(tempContent);
      } else {
        var tempContent = JSON.parse(JSON.stringify(this.copiedElement));
        tempContent.id = selectedId =
          this.cardBackContent.length + this.bannerContent.length + 1;
        tempContent.left = this.positionX;
        tempContent.top = this.positionY;
        tempContent.position = this.cardBackContent.length + 1;
        this.cardBackContent.push(tempContent);
      }
      this.loadDrops();
      this.selectedElementId = selectedId;
      this.closeContextMenu();
      this.showSuccess('Element Pasted Successfully');
    }
  }
  pasteProperty() {
    // Copy property except: Top, Left, Position, Type, Id
    if (this.copiedElement != undefined) {
      if (this.frontSideSelected) {
        if (this.copiedElement.type == this.selectedElementType) {
          var index = this.bannerContent.findIndex(
            (x) => x.id == this.selectedElementId
          );
          switch (this.selectedElementType) {
            case 1: {
              this.bannerContent[index].svgFillColor =
                this.copiedElement.svgFillColor;
              break;
            }
            case 2: {
              this.bannerContent[index].src = this.copiedElement.src;
              break;
            }
            case 3: {
              this.bannerContent[index].bold = this.copiedElement.bold;
              this.bannerContent[index].fontColor =
                this.copiedElement.fontColor;
              this.bannerContent[index].fontFamily =
                this.copiedElement.fontFamily;
              this.bannerContent[index].fontSize = this.copiedElement.fontSize;
              this.bannerContent[index].bold = this.copiedElement.bold;
              this.bannerContent[index].italic = this.copiedElement.italic;
              this.bannerContent[index].underline =
                this.copiedElement.underline;
              break;
            }
            case 4: {
              break;
            }
          }
          this.selectElement('f', this.selectedElementId);
        }
      } else {
        if (this.copiedElement.type == this.selectedElementType) {
          var index = this.cardBackContent.findIndex(
            (x) => x.id == this.selectedElementId
          );
          switch (this.selectedElementType) {
            case 1: {
              this.cardBackContent[index].svgFillColor =
                this.copiedElement.svgFillColor;
              break;
            }
            case 2: {
              this.cardBackContent[index].src = this.copiedElement.src;
              break;
            }
            case 3: {
              this.cardBackContent[index].bold = this.copiedElement.bold;
              this.cardBackContent[index].fontColor =
                this.copiedElement.fontColor;
              this.cardBackContent[index].fontFamily =
                this.copiedElement.fontFamily;
              this.cardBackContent[index].fontSize =
                this.copiedElement.fontSize;
              this.cardBackContent[index].bold = this.copiedElement.bold;
              this.cardBackContent[index].italic = this.copiedElement.italic;
              this.cardBackContent[index].underline =
                this.copiedElement.underline;
              break;
            }
            case 4: {
              break;
            }
          }
          this.selectElement('b', this.selectedElementId);
        }
      }

      this.closeContextMenu();
      this.showSuccess('Element Pasted Successfully');
    }
  }
  copyElementOrProperty(type: number) {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.copiedElement = this.bannerContent[index];
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.copiedElement = this.cardBackContent[index];
    }
    this.closeContextMenu();
    this.showSuccess(
      type == 0 ? 'Copied element successfully' : 'Copied property successfully'
    );
  }
  showSuccess(message: string) {
    this.toastService.show(message, {
      classname: 'border border-success',
      delay: 1000,
    });
  }
  showError(message: string) {
    this.toastService.show(message, {
      classname: 'border border-danger',
      delay: 1000,
    });
  }
  sendElementBack() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      var backPosition = this.bannerContent[index - 1].position;
      var orgPosition = this.bannerContent[index].position;
      this.bannerContent[index].position = backPosition;
      this.bannerContent[index - 1].position = orgPosition;
      this.bannerContent = this.bannerContent.sort(
        (a, b) => a.position - b.position
      );
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      var backPosition = this.cardBackContent[index - 1].position;
      var orgPosition = this.cardBackContent[index].position;
      this.cardBackContent[index].position = backPosition;
      this.cardBackContent[index - 1].position = orgPosition;
      this.cardBackContent = this.cardBackContent.sort(
        (a, b) => a.position - b.position
      );
    }
    this.closeContextMenu();
    this.showSuccess('Element sent back');
  }
  bringElementForward() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      var backPosition = this.bannerContent[index + 1].position;
      var orgPosition = this.bannerContent[index].position;
      this.bannerContent[index].position = backPosition;
      this.bannerContent[index + 1].position = orgPosition;
      this.bannerContent = this.bannerContent.sort(
        (a, b) => a.position - b.position
      );
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      var backPosition = this.cardBackContent[index + 1].position;
      var orgPosition = this.cardBackContent[index].position;
      this.cardBackContent[index].position = backPosition;
      this.cardBackContent[index + 1].position = orgPosition;
      this.cardBackContent = this.cardBackContent.sort(
        (a, b) => a.position - b.position
      );
    }
    this.closeContextMenu();
    this.showSuccess('Element brought forward');
  }
  deleteElement() {
    if (this.frontSideSelected) {
      var index = this.bannerContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.bannerContent.splice(index, 1);
    } else {
      var index = this.cardBackContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardBackContent.splice(index, 1);
    }
    this.closeContextMenu();
    this.showError('Deleted successfully');
  }
  //#endregion

  open(content: any, type: number) {
    this.selectedElementId = 0;
    this.addElementType = type;
    this.offcanvasService.open(content, {
      ariaLabelledBy: 'offcanvas-basic-title',
    });
  }

  //#region Addition of new Element
  // For Adding Text Template
  addText(index: number) {
    if (this.frontSideSelected) {
      var selectedTemplate = JSON.parse(
        JSON.stringify(this.textTemplates[index])
      );
      var textElement: GenElement = selectedTemplate as GenElement;
      textElement.id =
        Math.max(
          ...this.bannerContent.map((o) => o.id),
          ...this.cardBackContent.map((o) => o.id)
        ) + 1;
      this.selectedElementId = textElement.id;
      textElement.type = 3;
      textElement.left = 10;
      textElement.top = 10;
      textElement.position =
        Math.max(...this.bannerContent.map((o) => o.position)) + 1;
      this.bannerContent.push(textElement);
    } else {
      var selectedTemplate = JSON.parse(
        JSON.stringify(this.textTemplates[index])
      );
      var textElement: GenElement = selectedTemplate as GenElement;
      textElement.id =
        Math.max(
          ...this.bannerContent.map((o) => o.id),
          ...this.cardBackContent.map((o) => o.id)
        ) + 1;
      this.selectedElementId = textElement.id;
      textElement.left = 0;
      textElement.top = 0;
      textElement.position =
        Math.max(...this.cardBackContent.map((o) => o.position)) + 1;
      this.cardBackContent.push(textElement);
    }
    this.loadDrops();
    this.closeContextMenu();
    this.offcanvasService.dismiss();
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
    this.showSuccess('Element Pasted Successfully');
  }
  // For Adding Image Template
  addImage(index: number) {
    if (this.frontSideSelected) {
      var selectedTemplate = JSON.parse(
        JSON.stringify(this.imageTemplates[index])
      );
      var imageElement: GenElement = selectedTemplate as GenElement;
      imageElement.id =
        Math.max(
          ...this.bannerContent.map((o) => o.id),
          ...this.cardBackContent.map((o) => o.id)
        ) + 1;
      this.selectedElementId = imageElement.id;
      imageElement.type = 2;
      imageElement.left = 10;
      imageElement.top = 10;
      imageElement.position =
        Math.max(...this.bannerContent.map((o) => o.position)) + 1;
      this.bannerContent.push(imageElement);
    } else {
      var selectedTemplate = JSON.parse(
        JSON.stringify(this.imageTemplates[index])
      );
      var imageElement: GenElement = selectedTemplate as GenElement;
      imageElement.id =
        Math.max(
          ...this.bannerContent.map((o) => o.id),
          ...this.cardBackContent.map((o) => o.id)
        ) + 1;
      this.selectedElementId = imageElement.id;
      imageElement.type = 2;
      imageElement.left = 10;
      imageElement.top = 10;
      imageElement.position =
        Math.max(...this.cardBackContent.map((o) => o.position)) + 1;
      this.cardBackContent.push(imageElement);
    }
    this.loadDrops();
    this.closeContextMenu();
    this.offcanvasService.dismiss();
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
    this.showSuccess('Element Pasted Successfully');
  }
  // For Adding Svg Template
  addSvg(index: number) {
    if (this.frontSideSelected) {
      var selectedTemplate = JSON.parse(
        JSON.stringify(this.svgTemplates[index])
      );
      var svgElement: GenElement = selectedTemplate as GenElement;
      svgElement.id =
        Math.max(
          ...this.bannerContent.map((o) => o.id),
          ...this.cardBackContent.map((o) => o.id)
        ) + 1;
      this.selectedElementId = svgElement.id;
      svgElement.type = 1;
      svgElement.left = 10;
      svgElement.top = 10;
      svgElement.position =
        Math.max(...this.bannerContent.map((o) => o.position)) + 1;
      this.bannerContent.push(svgElement);
    } else {
      var selectedTemplate = JSON.parse(
        JSON.stringify(this.svgTemplates[index])
      );
      var svgElement: GenElement = selectedTemplate as GenElement;
      svgElement.id =
        Math.max(
          ...this.bannerContent.map((o) => o.id),
          ...this.cardBackContent.map((o) => o.id)
        ) + 1;
      this.selectedElementId = svgElement.id;
      svgElement.type = 1;
      svgElement.left = 10;
      svgElement.top = 10;
      svgElement.position =
        Math.max(...this.cardBackContent.map((o) => o.position)) + 1;
      this.cardBackContent.push(svgElement);
    }
    this.loadDrops();
    this.closeContextMenu();
    this.offcanvasService.dismiss();
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
    this.showSuccess('Element Pasted Successfully');
  }
  // For adding Line Template
  addLine(style: string, index: number) {
    if (this.frontSideSelected) {
      var selectedTemplate = JSON.parse(
        JSON.stringify(this.lineTemplates[index])
      );
      var lineElement: GenElement = selectedTemplate as GenElement;
      lineElement.length =
        style == 'v'
          ? this.lineTemplates[index].thickness
          : this.lineTemplates[index].length;
      lineElement.thickness =
        style == 'v'
          ? this.lineTemplates[index].length
          : this.lineTemplates[index].thickness;
      lineElement.id =
        Math.max(
          ...this.bannerContent.map((o) => o.id),
          ...this.cardBackContent.map((o) => o.id)
        ) + 1;
      this.selectedElementId = lineElement.id;
      lineElement.type = 4;
      lineElement.left = 10;
      lineElement.top = 10;
      lineElement.position =
        Math.max(...this.bannerContent.map((o) => o.position)) + 1;
      this.bannerContent.push(lineElement);
    } else {
      var selectedTemplate = JSON.parse(
        JSON.stringify(this.lineTemplates[index])
      );
      var lineElement: GenElement = selectedTemplate as GenElement;
      lineElement.length =
        style == 'v'
          ? this.lineTemplates[index].thickness
          : this.lineTemplates[index].length;
      lineElement.thickness =
        style == 'v'
          ? this.lineTemplates[index].length
          : this.lineTemplates[index].thickness;
      lineElement.id =
        Math.max(
          ...this.bannerContent.map((o) => o.id),
          ...this.cardBackContent.map((o) => o.id)
        ) + 1;
      this.selectedElementId = lineElement.id;
      lineElement.type = 4;
      lineElement.left = 10;
      lineElement.top = 10;
      lineElement.position =
        Math.max(...this.cardBackContent.map((o) => o.position)) + 1;
      this.cardBackContent.push(lineElement);
    }
    this.loadDrops();
    this.closeContextMenu();
    this.offcanvasService.dismiss();
    this.selectElement(
      this.frontSideSelected ? 'f' : 'b',
      this.selectedElementId
    );
    this.showSuccess('Element Pasted Successfully');
  }
  //#endregion
}
