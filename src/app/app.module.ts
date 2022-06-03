import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './Common/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './Common/global/toasts-container.component';
import { VisitingDetailComponent } from './components/visiting-detail/visiting-detail.component';
import { VisitingPresetComponent } from './components/visiting-preset/visiting-preset.component';
import { BannerPresetComponent } from './components/banner-preset/banner-preset.component';
import { BannerdetailComponent } from './components/bannerdetail/bannerdetail.component';
import { CommonModule } from '@angular/common';
import { ToastService } from './Common/services/toast-service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';
import { CardCollectionComponent } from './components/Common/card-collection/card-collection.component';
import { SidenavComponent } from './components/Common/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastsContainer,
    VisitingDetailComponent,
    VisitingPresetComponent,
    BannerPresetComponent,
    BannerdetailComponent,
    CardCollectionComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ColorPickerModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    NgbModule,
    NgSelectModule,
  ],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
