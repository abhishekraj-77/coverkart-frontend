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
  name = '';
  phone = '';
  address = '';
  error = '';
  success = '';
  isSignup = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.error = '';
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
    this.error = '';
    if (!this.name || !this.email || !this.phone || !this.password) {
      this.error = 'Please fill all required fields!';
      return;
    }
    this.http.post<any>('https://coverkart.onrender.com/api/auth/register', {
      email: this.email,
      password: this.password,
      name: this.name,
      phone: this.phone,
      address: this.address,
      isAdmin: false
    }).subscribe({
      next: () => {
        this.success = '✅ Account created! Please login.';
        this.isSignup = false;
        this.email = '';
        this.password = '';
        this.name = '';
        this.phone = '';
        this.address = '';
      },
      error: () => this.error = '❌ Email already exists!'
    });
  }
}