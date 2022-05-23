import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitingDetailComponent } from './components/visiting-detail/visiting-detail.component';
import { VisitingPresetComponent } from './components/visiting-preset/visiting-preset.component';

const routes: Routes = [
  { path: '', component: VisitingPresetComponent },
  { path: ':Id', component: VisitingDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitingCardRoutingModule { }
