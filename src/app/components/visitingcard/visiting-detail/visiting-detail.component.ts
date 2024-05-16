import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { SessionData } from 'src/app/Common/Data/Session';

import { GenElement } from 'src/app/Common/Models/element';
import { ToastService } from 'src/app/Common/services/toast-service';
import { EditorTabComponent } from '../../Common/editor-tab/editor-tab.component';
import { FRONTCONTENT, BACKCONTENT } from 'src/app/Common/Models/content';
import { FONTSCOLLECTION } from 'src/app/Common/Models/font';

@Component({
  selector: 'gen-visiting-detail',
  templateUrl: `./visiting-detail.component.html`,
  styleUrls: ['./visiting-detail.component.css'],
})
export class VisitingDetailComponent implements OnInit, OnDestroy {
  @ViewChild(EditorTabComponent) editorComp!: EditorTabComponent;
  // Editor Tab Properties

  // Properties as required
  selectedElementId = 0;
  frontSideSelected = true;
  itemHeight = 300;
  itemWidth = 525;

  // Right click related properties
  showRightClickPanel = 'none';
  rightClickPanelX = 0;
  rightClickPanelY = 0;
  positionX = 0;
  positionY = 0;

  // Required Constants
  fonts = FONTSCOLLECTION;
  cardFrontContent = FRONTCONTENT;
  cardBackContent = BACKCONTENT;

  constructor(
    private _route: ActivatedRoute,
    private session: SessionData,
    public toastService: ToastService
  ) {
    session.setMenuBar(false);
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
    var cardFrontContent = this.cardFrontContent;
    var cardBackContent = this.cardBackContent;
    $(() => {
      cardFrontContent.forEach((item: GenElement) => {
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
            var attributeIndex = this.cardFrontContent.findIndex(
              (x) => x.id == attributeDetail.Id
            );
            var attribute = this.cardFrontContent[attributeIndex];
            attribute.top = attributeDetail.PositionY;
            attribute.left = attributeDetail.PositionX;
            this.cardFrontContent[attributeIndex] = attribute;
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
  detectMouseClick(mouseEvent: any) {
    var event = mouseEvent.event ? mouseEvent.event : mouseEvent;
    var id = mouseEvent.id ? mouseEvent.id : '';
    if (event.which == 3) {
      this.showRightClickPanel = 'block';
      this.selectedElementId = id != '' ? id : this.selectedElementId;
      this.rightClickPanelX = event.clientX;
      this.rightClickPanelY = event.clientY;
      this.positionX = event.offsetX;
      this.positionY = event.offsetY;
    }
    if (event.which == 1 && id !== '') {
      this.selectElement(id);
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
  selectElement(Id: any) {
    this.selectedElementId = Id;
    this.editorComp.selectElement(this.selectedElementId);
  }
  //#endregion

  callBackFromChildSideNav(Id: number) {
    this.selectedElementId = Id;
    this.toastService.showSuccess('Element added successfully');
    this.loadDrops();
    this.selectElement(this.selectedElementId);
  }

  callBackFromChildRightClick(Id: number) {
    this.selectedElementId = Id;
    this.toastService.showSuccess('Right Click Detected');
    this.loadDrops();
    this.closeContextMenu();
    this.selectElement(this.selectedElementId);
  }
}
