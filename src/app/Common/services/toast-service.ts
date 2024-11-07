import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  textOrTpl: TemplateRef<any>;
  classname?: string;
  delay?: number;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
  showToast(message: string, type: string = 'default', delay: number = 1000) {
    this.show(message, {
      classname: type,
      delay: delay,
    });
  }
  showSuccess(message: string, delay: number = 50000) {
    this.showToast(message, 'success', delay);
  }
  showError(message: string, delay: number = 1000) {
    this.showToast(message, 'danger', delay);
  }
  showInfo(message: string, delay: number = 1000) {
    this.showToast(message, 'info', delay);
  }

  showDelete(message: string, delay: number = 1000) {
    this.showToast(message, 'delete', delay);
  }

  showWarning(message: string, delay: number = 1000) {
    this.showToast(message, 'warning', delay);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
