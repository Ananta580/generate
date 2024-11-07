import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { SessionData } from 'src/app/common/Data/Session';
import {
  BANNERCONTENT,
  FLYERCONTENT,
  FRONTCONTENT,
  LOGOCONTENT,
} from 'src/app/common/Models/content';
import { FONTSCOLLECTION } from 'src/app/common/Models/font';
import { ToastService } from 'src/app/common/services/toast-service';
import { EditorTabComponent } from 'src/app/shared/editor-tab/editor-tab.component';
import * as htmlToImage from 'html-to-image';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { PRESET_TYPE } from 'src/app/common/Models/preset';
import { ElementInner } from 'src/app/common/Models/element';
import { CONTENT_ID_PRETAG } from 'src/app/common/Models/constant';

@Component({
  selector: 'gen-editor',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  @ViewChild(EditorTabComponent) editorComp!: EditorTabComponent;

  // Properties as required
  selectedElementId = 0;
  selectedElementType = 0;

  // Right click related properties
  showRightClickPanel = 'none';
  rightClickPanelX = 0;
  rightClickPanelY = 0;
  positionX = 0;
  positionY = 0;

  fonts = FONTSCOLLECTION;
  content = BANNERCONTENT.content;
  height = BANNERCONTENT.height;
  width = BANNERCONTENT.width;

  contentPreTag = CONTENT_ID_PRETAG;

  constructor(
    private _route: ActivatedRoute,
    private session: SessionData,
    public toastService: ToastService
  ) {
    session.setMenuBar(false);
  }

  ngOnInit(): void {
    const type = this._route.snapshot.paramMap.get('type');
    const id = this._route.snapshot.paramMap.get('id');
    switch (type) {
      case PRESET_TYPE.VISTING_CARD:
        this.content = FRONTCONTENT.content;
        this.width = FRONTCONTENT.width;
        this.height = FRONTCONTENT.height;
        break;
      case PRESET_TYPE.BANNER:
        this.content = BANNERCONTENT.content;
        this.width = BANNERCONTENT.width;
        this.height = BANNERCONTENT.height;

        break;
      case PRESET_TYPE.FLYER:
        this.content = FLYERCONTENT.content;
        this.width = FLYERCONTENT.width;
        this.height = FLYERCONTENT.height;

        break;
      case PRESET_TYPE.LOGO:
        this.content = LOGOCONTENT.content;
        this.width = LOGOCONTENT.width;
        this.height = LOGOCONTENT.height;

        break;
    }
    this.content.sort((x: ElementInner) => x.position);
    this.loadDrops();
  }
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
    var content = this.content;

    $(() => {
      content.forEach((item: ElementInner) => {
        $('#' + this.contentPreTag + item.id).attr('contenteditable', 'true');
        //DRAG USING GRID
        (<any>$('#' + this.contentPreTag + item.id)).draggable({
          grid: [1, 1],
          drag: (event: any, ui: any) => {
            //this.dragMultipleItems(ui);
          },
        });
      });

      (<any>$('#image-section')).droppable({
        drop: (event: any, ui: any) => {
          attributeDetail = {
            Id: ui.draggable[0].id.split(this.contentPreTag)[1],
            PositionX: ui.position.left,
            PositionY: ui.position.top,
          };
          {
            var attributeIndex = this.content.findIndex(
              (x) => x.id == attributeDetail.Id
            );
            var attribute = this.content[attributeIndex];
            attribute.top = attributeDetail.PositionY;
            attribute.left = attributeDetail.PositionX;
            this.content[attributeIndex] = attribute;
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
    // Right Click
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
  closeContextMenu(event: any = '') {
    this.showRightClickPanel = 'none';
    this.containerClicked(event);
  }
  //#endregion

  selectElement(Id: any) {
    this.selectedElementId = Id;
    this.editorComp.selectElement(this.selectedElementId);
  }
  showSuccess(message: string) {
    this.toastService.showSuccess(message, 5000);
  }
  showError(message: string) {
    this.toastService.showError(message, 5000);
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
    this.closeContextMenu();
    this.selectElement(this.selectedElementId);
  }

  containerClicked(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isContent = target.id.startsWith(this.contentPreTag);
    if (!isContent) {
      this.selectedElementId = 0;
    }
  }
}
