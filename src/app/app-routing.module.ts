import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './common/core/main/main.component';
import { BannerPresetComponent } from './components/Banner/banner-preset/banner-preset.component';
import { BannerdetailComponent } from './components/Banner/bannerdetail/bannerdetail.component';
import { FlyerDetailComponent } from './components/Flyers/flyer-detail/flyer-detail.component';
import { FlyersPresetComponent } from './components/Flyers/flyers-preset/flyers-preset.component';
import { LogoDetailComponent } from './components/Logos/logo-detail/logo-detail.component';
import { LogoPresetComponent } from './components/Logos/logo-preset/logo-preset.component';
import { PostDetailComponent } from './components/Posts/post-detail/post-detail.component';
import { PostsPresetComponent } from './components/Posts/posts-preset/posts-preset.component';
import { VisitingDetailComponent } from './components/visitingcard/visiting-detail/visiting-detail.component';
import { VisitingPresetComponent } from './components/visitingcard/visiting-preset/visiting-preset.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'visitingcard', component: VisitingPresetComponent },
  { path: 'visitingcard/:Id', component: VisitingDetailComponent },
  { path: 'banner', component: BannerPresetComponent },
  { path: 'banner/:Id', component: BannerdetailComponent },
  { path: 'flyer', component: FlyersPresetComponent },
  { path: 'flyer/:Id', component: FlyerDetailComponent },
  { path: 'logo', component: LogoPresetComponent },
  { path: 'logo/:Id', component: LogoDetailComponent },
  { path: 'post', component: PostsPresetComponent },
  { path: 'post/:Id', component: PostDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
