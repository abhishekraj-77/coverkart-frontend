import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  error = '';
  success = '';
  isSignup = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>('https://coverkart.onrender.com/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('isAdmin', res.isAdmin);
        if (res.isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => this.error = 'Invalid email or password!'
    });
  }

  onSignup() {
    this.http.post<any>('https://coverkart.onrender.com/api/auth/register', {
      email: this.email,
      password: this.password,
      isAdmin: false
    }).subscribe({
      next: () => {
        this.success = '✅ Account created! Please login.';
        this.isSignup = false;
        this.email = '';
        this.password = '';
      },
      error: () => this.error = '❌ Email already exists!'
    });
  }
}