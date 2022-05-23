import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {} from '@ng-bootstrap/ng-bootstrap';
import * as htmlToImage from 'html-to-image';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { SessionData } from 'src/app/Data/Session';
import { BACKCONTENT, FRONTCONTENT } from 'src/app/Modules/Models/DummyContent';
import { ELEMENTTYPES } from 'src/app/Modules/Models/ElementType';
import { FONTSCOLLECTION } from 'src/app/Modules/Models/FontCollection';
import { FONTSIZES } from 'src/app/Modules/Models/FontSizes';

@Component({
  selector: 'gen-visiting-detail',
  templateUrl: `./visiting-detail.component.html`,
  styleUrls: ['./visiting-detail.component.css'],
})
export class VisitingDetailComponent implements OnInit, OnDestroy {
  // Properties as required
  selectedElementId = 0;
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
  selectedFont: number = 1;
  selectedSize: number = 1;
  selectedFontColor: string | undefined = '';

  constructor(private _route: ActivatedRoute, private session: SessionData) {
    session.setMenuBar(false);
    console.log(_route.snapshot.paramMap.get('Id'));
    this.loadDrops();
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.session.setMenuBar(true);
  }

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

  loadDrops() {
    var cardFrontContent = this.cardFrontContent;
    var cardBackContent = this.cardBackContent;
    $(() => {
      cardFrontContent.forEach((item: any) => {
        //DRAG USING GRID
        (<any>$('#F' + item.position)).draggable({
          grid: [1, 1],
          drag: (event: any, ui: any) => {
            //this.dragMultipleItems(ui);
          },
        });
      });

      cardBackContent.forEach((item: any) => {
        //DRAG USING GRID
        (<any>$('#B' + item.position)).draggable({
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

  selectFrontSide() {
    this.selectedElementId = 0;
    this.loadDrops();
  }

  selectBackSide() {
    this.selectedElementId = 0;
    this.loadDrops();
  }

  selectElement(side: any, Id: any) {
    this.selectedElementId = Id;
    this.selectedFontColor =
      side == 'f'
        ? this.cardFrontContent[Id - 1].fontColor
        : this.cardBackContent[Id - 1].fontColor;
  }
}
