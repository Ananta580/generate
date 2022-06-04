import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
  showToast(message: string, type: string = 'default', delay: number = 1000) {
    var className = '';
    switch (type) {
      case 'success':
        className = 'border border-success';
        break;
      case 'danger':
        className = 'border border-danger';
        break;
      case 'info':
        className = 'border border-info';
        break;
      case 'warning':
        className = 'border border-warning';
        break;
      default:
        className = 'border border-default';
        break;
    }
    this.show(message, {
      classname: className,
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
