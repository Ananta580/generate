import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../services/toast-service';

@Component({
  selector: 'gen-toasts',
  template: `
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
    style: 'z-index: 1200; left:40%;right:40%;width:20%',
  },
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
