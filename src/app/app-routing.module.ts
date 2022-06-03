import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Common/core/main/main.component';
import { BannerPresetComponent } from './components/banner-preset/banner-preset.component';
import { BannerdetailComponent } from './components/bannerdetail/bannerdetail.component';
import { VisitingDetailComponent } from './components/visiting-detail/visiting-detail.component';
import { VisitingPresetComponent } from './components/visiting-preset/visiting-preset.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'visitingcard', component: VisitingPresetComponent },
  { path: 'visitingcard/:Id', component: VisitingDetailComponent },
  { path: 'banner', component: BannerPresetComponent },
  { path: 'banner/:Id', component: BannerdetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
