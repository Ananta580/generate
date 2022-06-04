import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './Common/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './Common/global/toasts-container.component';
import { VisitingDetailComponent } from './components/visitingcard/visiting-detail/visiting-detail.component';
import { BannerPresetComponent } from './components/Banner/banner-preset/banner-preset.component';
import { CommonModule } from '@angular/common';
import { ToastService } from './Common/services/toast-service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';
import { CardCollectionComponent } from './components/Common/card-collection/card-collection.component';
import { SidenavComponent } from './components/Common/sidenav/sidenav.component';
import { EditorTabComponent } from './components/Common/editor-tab/editor-tab.component';
import { ElementContainerComponent } from './components/Common/element-container/element-container.component';
import { RightClickContainerComponent } from './components/Common/right-click-container/right-click-container.component';
import { BannerdetailComponent } from './components/Banner/bannerdetail/bannerdetail.component';
import { VisitingPresetComponent } from './components/visitingcard/visiting-preset/visiting-preset.component';
import { LogoPresetComponent } from './components/Logos/logo-preset/logo-preset.component';
import { LogoDetailComponent } from './components/Logos/logo-detail/logo-detail.component';
import { FlyersPresetComponent } from './components/Flyers/flyers-preset/flyers-preset.component';
import { FlyerDetailComponent } from './components/Flyers/flyer-detail/flyer-detail.component';
import { PostsPresetComponent } from './components/Posts/posts-preset/posts-preset.component';
import { PostDetailComponent } from './components/Posts/post-detail/post-detail.component';

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
    EditorTabComponent,
    ElementContainerComponent,
    RightClickContainerComponent,
    LogoPresetComponent,
    LogoDetailComponent,
    FlyersPresetComponent,
    FlyerDetailComponent,
    PostsPresetComponent,
    PostDetailComponent,
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
