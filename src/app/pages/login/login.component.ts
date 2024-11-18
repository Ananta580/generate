import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionData } from 'src/app/common/data/Session';
import { ToastService } from 'src/app/common/services/toast-service';

@Component({
  selector: 'gen-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password = '';

  constructor(
    private router: Router,
    private session: SessionData,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.session.setMenuBar(false);
  }

  ngOnDestroy(): void {
    this.session.setMenuBar(true);
  }

  onSubmit() {
    const staticUsername = 'trekmateAdmin';
    const staticPassword = 'trekmateAdmin';

    if (this.username === staticUsername && this.password === staticPassword) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      this.toastService.showSuccess('Login successful!');
      this.router.navigate(['/']);
    } else {
      this.toastService.showError('Invalid username or password');
    }
  }
}
