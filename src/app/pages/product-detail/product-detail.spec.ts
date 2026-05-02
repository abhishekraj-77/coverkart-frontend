import { Component, OnInit } from '@angular/core';
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
  product: any = {};
  loaded = false;
  message = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', id);
    this.http.get<any>(`http://localhost:5000/api/products/${id}`)
      .subscribe({
        next: (data) => {
          console.log('Product data:', data);
          this.product = data;
          this.loaded = true;
        },
        error: (err) => {
          console.log('Error:', err);
          this.message = 'Product not found!';
        }
      });
  }

  addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(this.product);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.message = '✅ Added to cart!';
  }
}