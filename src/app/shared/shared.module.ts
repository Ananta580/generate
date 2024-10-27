import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardCollectionComponent } from './card-collection/card-collection.component';
import { EditorTabComponent } from './editor-tab/editor-tab.component';
import { ElementContainerComponent } from './element-container/element-container.component';
import { RightClickContainerComponent } from './right-click-container/right-click-container.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
  declarations: [
    CardCollectionComponent,
    EditorTabComponent,
    ElementContainerComponent,
    RightClickContainerComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgxMasonryModule,
  ],
  exports: [
    CardCollectionComponent,
    EditorTabComponent,
    ElementContainerComponent,
    RightClickContainerComponent,
    SidenavComponent,
  ],
})
export class SharedModule {}
