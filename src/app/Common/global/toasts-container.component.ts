import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../services/toast-service';

@Component({
  selector: 'gen-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [ngClass]="
        'bg-black w-full bg-opacity-80 border-none text-white shadow-xl border-gray-700 rounded-lg backdrop-blur-md flex items-start transition-transform transform duration-300 ease-in-out'
      "
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <div class="flex pl-3 w-full min-w-80 items-center justify-between">
        <div class="flex items-center space-x-3">
          <!-- Icon based on toast type -->
          <div class="text-base">
            <i
              *ngIf="toast.classname === 'success'"
              class="text-green-400 fas fa-check-circle"
            ></i>
            <i
              *ngIf="toast.classname === 'danger'"
              class="text-red-400 fas fa-exclamation-circle"
            ></i>
            <i
              *ngIf="toast.classname === 'delete'"
              class="text-red-400 fas fa-trash-alt"
            ></i>
            <i
              *ngIf="toast.classname === 'info'"
              class="text-blue-400 fas fa-info-circle"
            ></i>
            <i
              *ngIf="toast.classname === 'warning'"
              class="text-yellow-400 fas fa-exclamation-triangle"
            ></i>
          </div>

          <!-- Toast message content -->
          <div class="flex-grow font-semibold">
            <ng-container *ngIf="isTemplate(toast.textOrTpl); else text">
              <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
            </ng-container>
            <ng-template #text>{{ toast.textOrTpl }}</ng-template>
          </div>
        </div>

        <!-- Close button -->
        <button
          (click)="toastService.remove(toast)"
          type="button"
          class="btn-close -mt-2 text-white opacity-70 hover:opacity-100 ml-auto"
          aria-label="Close"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </ngb-toast>
  `,
  host: {
    class: 'toast-container fixed top-4 right-4',
    style: 'z-index: 1200;',
  },
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
