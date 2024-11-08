import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MenuBarComponent, TopBarComponent, MainComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
  ],
  exports: [MenuBarComponent, TopBarComponent],
})
export class CoreModule {}
