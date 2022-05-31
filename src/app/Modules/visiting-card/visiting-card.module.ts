import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitingCardRoutingModule } from './visiting-card-routing.module';
import { VisitingPresetComponent } from './components/visiting-preset/visiting-preset.component';
import { VisitingDetailComponent } from './components/visiting-detail/visiting-detail.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ToastsContainer } from '../global/toasts-container.component';
import { ToastService } from '../services/toast-service';

@NgModule({
  declarations: [
    VisitingPresetComponent,
    VisitingDetailComponent,
    ToastsContainer,
  ],
  imports: [
    CommonModule,
    ColorPickerModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    VisitingCardRoutingModule,
  ],
  providers: [ToastService],
})
export class VisitingCardModule {}
