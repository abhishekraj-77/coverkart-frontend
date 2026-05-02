import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product = signal<any>(null);
  message = signal<string>('');

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`https://coverkart.onrender.com/api/products/${id}`)
      .subscribe({
        next: (data) => this.product.set(data),
        error: () => this.message.set('Product not found!')
      });
  }

  addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(this.product());
    localStorage.setItem('cart', JSON.stringify(cart));
    this.message.set('✅ Added to cart!');
  }
}