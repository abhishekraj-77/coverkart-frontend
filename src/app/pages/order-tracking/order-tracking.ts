import { Component, OnInit, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-order-tracking',
  imports: [],
  templateUrl: './order-tracking.html',
  styleUrl: './order-tracking.css'
})
export class OrderTracking implements OnInit {
  orders = signal<any[]>([]);
  message = signal<string>('');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.message.set('Please login to view orders!');
      return;
    }
    this.http.get<any[]>('https://coverkart.onrender.com/api/orders/my', {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    }).subscribe({
      next: (data) => this.orders.set(data),
      error: () => this.message.set('Failed to load orders!')
    });
  }

  getSteps(status: string) {
    const steps = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIndex = steps.indexOf(status);
    return steps.map((step, i) => ({
      name: step,
      done: i <= currentIndex
    }));
  }
}