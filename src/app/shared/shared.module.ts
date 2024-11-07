import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { register } from 'swiper/element/bundle';
register();

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
  ],
  exports: [
    CardCollectionComponent,
    EditorTabComponent,
    ElementContainerComponent,
    RightClickContainerComponent,
    SidenavComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
