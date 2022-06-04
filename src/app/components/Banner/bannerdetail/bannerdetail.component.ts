import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { SessionData } from 'src/app/Common/Data/Session';
import { BANNERCONTENT } from 'src/app/Common/Models/DummyBannerContent';
import { GenElement } from 'src/app/Common/Models/Element';
import { FONTSCOLLECTION } from 'src/app/Common/Models/FontCollection';
import { ToastService } from 'src/app/Common/services/toast-service';
import { EditorTabComponent } from '../../Common/editor-tab/editor-tab.component';

@Component({
  selector: 'gen-bannerdetail',
  templateUrl: './bannerdetail.component.html',
  styleUrls: ['./bannerdetail.component.css'],
})
export class BannerdetailComponent implements OnInit {
  @ViewChild(EditorTabComponent) editorComp!: EditorTabComponent;

  // Properties as required
  selectedElementId = 0;
  selectedElementType = 0;
  itemHeight = 630;
  itemWidth = 930;

  // Right click related properties
  showRightClickPanel = 'none';
  rightClickPanelX = 0;
  rightClickPanelY = 0;
  positionX = 0;
  positionY = 0;

  fonts = FONTSCOLLECTION;
  bannerContent = BANNERCONTENT;

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
  downloadJpg() {
    this.selectedElementId = 0;
    var node: any = document.getElementById('image-section');
    htmlToImage.toJpeg(node).then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'Banner.jpg';
      link.href = dataUrl;
      link.click();
    });
  }
  downloadSvg() {
    this.selectedElementId = 0;
    var node: any = document.getElementById('image-section');
    htmlToImage.toSvg(node).then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'Banner.svg';
      link.href = dataUrl;
      link.click();
    });
  }
  //#endregion

  //#region Drag and Drops event
  loadDrops() {
    var attributeDetail: { Id: any; PositionY: any; PositionX: any };
    var bannerContent = this.bannerContent;
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

      (<any>$('#image-section')).droppable({
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

  selectElement(Id: any) {
    this.selectedElementId = Id;
    this.editorComp.selectElement(this.selectedElementId);
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

  callBackFromChild(Id: number) {
    this.selectedElementId = Id;
    this.showSuccess('Element added successfully');
    this.loadDrops();
    this.selectElement(this.selectedElementId);
  }
  callBackFromChildRightClick(Id: number) {
    this.loadDrops();
    this.selectedElementId = Id;
    this.showSuccess('Right Click Detected');
    this.closeContextMenu();
    this.selectElement(this.selectedElementId);
  }
}
