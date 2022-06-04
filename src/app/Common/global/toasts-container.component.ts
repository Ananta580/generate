import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../services/toast-service';

@Component({
  selector: 'gen-toasts',
  template: `
    <style>
      .toast-body {
        padding: 0.3rem;
      }
    </style>
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ toast.textOrTpl }}
        </div>
        <button
          (click)="toastService.remove(toast)"
          type="button"
          class="btn-close my-auto ml-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </ngb-toast>
  `,
  host: {
    class: 'toast-container position-fixed bottom-0 mb-3 ',
    style: 'z-index: 1200;top: 120px;right: 20px;',
  },
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
