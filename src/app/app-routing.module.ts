import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './common/core/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'presets/:type',
    loadComponent: () =>
      import('./pages/preset/preset.component').then((c) => c.PresetComponent),
  },
  {
    path: 'editor/:type/:id',
    loadComponent: () =>
      import('./pages/editor/editor.component').then((c) => c.EditorComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
