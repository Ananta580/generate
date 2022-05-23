import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Modules/core/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'VisitingCard',
    loadChildren: () =>
      import('./Modules/visiting-card/visiting-card.module').then(
        (m) => m.VisitingCardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
