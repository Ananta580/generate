import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './common/core/core.module';
import { ToastsContainer } from './common/global/toasts-container.component';
import { ToastService } from './common/services/toast-service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ToastsContainer],
  imports: [
    BrowserModule,
    CommonModule,
    ColorPickerModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    NgbModule,
    NgSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
