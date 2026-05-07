import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase.config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  confirmPassword = '';
  name = '';
  phone = '';
  address = '';
  error = signal<string>('');
  success = signal<string>('');
  isSignup = false;
  isForgotPassword = false;
  loading = signal<boolean>(false);

  constructor(private router: Router, private http: HttpClient) {}

  async onLogin() {
    this.error.set('');
    this.loading.set(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        this.error.set('Please verify your email first! Check your inbox.');
        this.loading.set(false);
        return;
      }

      const token = await user.getIdToken();
      localStorage.setItem('token', token);

      const res: any = await this.http.post(
        'https://coverkart.onrender.com/api/auth/check-admin',
        { email: this.email }
      ).toPromise();

      localStorage.setItem('isAdmin', res.isAdmin);

      if (res.isAdmin) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } catch (err: any) {
      this.error.set('Invalid email or password!');
    }
    this.loading.set(false);
  }

  async onSignup() {
    this.error.set('');
    if (!this.name || !this.email || !this.phone || !this.password) {
      this.error.set('Please fill all required fields!');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error.set('Passwords do not match!');
      return;
    }
    if (this.password.length < 6) {
      this.error.set('Password must be at least 6 characters!');
      return;
    }
    this.loading.set(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      await sendEmailVerification(userCredential.user);

      this.success.set('✅ Account created! Please check your email to verify your account.');
      this.isSignup = false;
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.name = '';
      this.phone = '';
      this.address = '';
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        this.error.set('❌ Email already exists!');
      } else {
        this.error.set('❌ Something went wrong. Try again!');
      }
    }
    this.loading.set(false);
  }

  async onForgotPassword() {
    this.error.set('');
    if (!this.email) {
      this.error.set('Please enter your email first!');
      return;
    }
    this.loading.set(true);
    try {
      await sendPasswordResetEmail(auth, this.email);
      this.success.set('✅ Password reset email sent! Check your inbox.');
      this.isForgotPassword = false;
    } catch (err: any) {
      this.error.set('❌ Email not found!');
    }
    this.loading.set(false);
  }
}