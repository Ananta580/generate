import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {} from '@ng-bootstrap/ng-bootstrap';
import * as htmlToImage from 'html-to-image';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { SessionData } from 'src/app/Data/Session';
import { BACKCONTENT, FRONTCONTENT } from 'src/app/Modules/Models/DummyContent';
import { GenElement } from 'src/app/Modules/Models/Element';
import { ELEMENTTYPES } from 'src/app/Modules/Models/ElementType';
import { FONTSCOLLECTION } from 'src/app/Modules/Models/FontCollection';
import { FONTSIZES } from 'src/app/Modules/Models/FontSizes';

@Component({
  selector: 'gen-visiting-detail',
  templateUrl: `./visiting-detail.component.html`,
  styleUrls: ['./visiting-detail.component.css'],
})
export class VisitingDetailComponent implements OnInit, OnDestroy {
  // Editor Tab Properties
  showEditorTab = false;

  // Properties as required
  selectedElementId = 0;
  frontSideSelected = true;
  itemHeight = 300;
  itemWidth = 525;

  // Right click related properties
  showRightClickPanel = 'none';
  rightClickPanelX = 0;
  rightClickPanelY = 0;

  // Required Constants
  ContentType = ELEMENTTYPES;
  fonts = FONTSCOLLECTION;
  sizes = FONTSIZES;
  cardFrontContent = FRONTCONTENT;
  cardBackContent = BACKCONTENT;

  // Text Properties that are used to populate top bar
  selectedFont: number | undefined = 1;
  selectedSize: number | undefined = 1;
  selectedFontColor: string | undefined = 'red';
  isFontBold: boolean | undefined = false;
  isFontItalic: boolean | undefined = false;
  isFontUnderline: boolean | undefined = false;

  constructor(private _route: ActivatedRoute, private session: SessionData) {
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
    var cardFrontContent = this.cardFrontContent;
    var cardBackContent = this.cardBackContent;
    $(() => {
      cardFrontContent.forEach((item: GenElement) => {
        //DRAG USING GRID
        (<any>$('#' + item.id)).draggable({
          grid: [1, 1],
          drag: (event: any, ui: any) => {
            //this.dragMultipleItems(ui);
          },
        });
      });

      cardBackContent.forEach((item: GenElement) => {
        //DRAG USING GRID
        (<any>$('#' + item.id)).draggable({
          grid: [1, 1],
          drag: (event: any, ui: any) => {
            //this.dragMultipleItems(ui);
          },
        });
      });
    });
    //DROP
    // $('#droppable').droppable({
    //   drop: (event, ui) => {
    //     attributeDetail = {
    //       Id: ui.draggable[0].id,
    //       PositionX: Math.round(ui.position.left),
    //       PositionY: Math.round(ui.position.top),
    //     };
    //     if (ui.draggable[0].id == 'header') {
    //       this.headerEnd = Math.trunc(ui.position.top);
    //       this.templateForm.controls.headerEnd.setValue(ui.position.top);
    //     }
    //     if (ui.draggable[0].id == 'footer') {
    //       this.footerStart = Math.trunc(ui.position.top);
    //       this.templateForm.controls.footerStart.setValue(ui.position.top);
    //     }
    //     if (ui.draggable[0].id == 'pageno') {
    //       this.pageNumberY = Math.trunc(ui.position.top);
    //       this.pageNumberX = Math.trunc(ui.position.left);
    //     }
    //     if (
    //       attributeDetail.Id != 'header' &&
    //       attributeDetail.Id != 'footer' &&
    //       attributeDetail.Id != 'pageno'
    //     ) {
    //       var attributeIndex = this.attributeList.findIndex(
    //         (x) => x.Id == attributeDetail.Id
    //       );
    //       var attribute = this.attributeList[attributeIndex];
    //       attribute.PositionY = attributeDetail.PositionY;
    //       attribute.PositionX = attributeDetail.PositionX;
    //       this.attributeList[attributeIndex] = attribute;
    //       //this.dropMultipleItems();
    //     }
    //   },
    // });
  }
  //#endregion

  //#region Right Click Event
  detectRightClick(event: any, side: any, id: any) {
    if (event.which == 3) {
      this.showRightClickPanel = 'block';
      this.selectedElementId = id != '' ? id : this.selectedElementId;
      this.rightClickPanelX = event.clientX;
      this.rightClickPanelY = event.clientY;
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
      var index = this.cardFrontContent.findIndex((x) => x.id == Id);
      this.selectedFontColor = this.cardFrontContent[index].fontColor;
      this.selectedFont = this.cardFrontContent[index].fontFamily;
      this.selectedSize = this.cardFrontContent[index].fontSize;
      this.isFontBold = this.cardFrontContent[index].bold;
      this.isFontItalic = this.cardFrontContent[index].italic;
      this.isFontUnderline = this.cardFrontContent[index].underline;
    } else {
      var index = this.cardBackContent.findIndex((x) => x.id == Id);
      this.selectedFontColor = this.cardBackContent[index].fontColor;
      this.selectedFont = this.cardBackContent[index].fontFamily;
      this.selectedSize = this.cardBackContent[index].fontSize;
      this.isFontBold = this.cardBackContent[index].bold;
      this.isFontItalic = this.cardBackContent[index].italic;
      this.isFontUnderline = this.cardBackContent[index].underline;
    }
    this.showEditorTab = true;
  }
  //#endregion

  //#region Setting Text Properties
  setFontBold() {
    if (this.frontSideSelected) {
      var index = this.cardFrontContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardFrontContent[index].bold = !this.cardFrontContent[index].bold;
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
      var index = this.cardFrontContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardFrontContent[index].italic =
        !this.cardFrontContent[index].italic;
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
      var index = this.cardFrontContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardFrontContent[index].underline =
        !this.cardFrontContent[index].underline;
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
      var index = this.cardFrontContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardFrontContent[index].fontFamily = this.selectedFont;
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
      var index = this.cardFrontContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      type == 0
        ? (this.cardFrontContent[index].fontSize = this.selectedSize)
        : this.cardFrontContent[index].fontSize!++;
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
      var index = this.cardFrontContent.findIndex(
        (x) => x.id == this.selectedElementId
      );
      this.cardFrontContent[index].fontColor = this.selectedFontColor;
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
}
