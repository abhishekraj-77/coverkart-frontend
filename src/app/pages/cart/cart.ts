import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems = signal<any[]>([]);
  total = signal<number>(0);
  message = signal<string>('');
  address = signal<string>('');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems.set(cart);
    this.total.set(cart.reduce((sum: number, item: any) => sum + item.price, 0));
  }

  removeItem(index: number) {
    const cart = this.cartItems();
    cart.splice(index, 1);
    this.cartItems.set([...cart]);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.total.set(cart.reduce((sum: number, item: any) => sum + item.price, 0));
  }

  placeOrder() {
    if (!this.address()) {
      this.message.set('❌ Please enter delivery address!');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      this.message.set('❌ Please login first!');
      return;
    }
    const order = {
      products: this.cartItems().map((p: any) => p._id),
      totalAmount: this.total(),
      address: this.address()
    };
    this.http.post('https://coverkart.onrender.com/api/orders', order, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    }).subscribe({
      next: (res: any) => {
        this.message.set('✅ Order placed successfully!');
        localStorage.removeItem('cart');
        this.cartItems.set([]);
      },
      error: () => this.message.set('❌ Failed to place order!')
    });
  }
}