import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description: string;
}

@Component({
  selector: 'app-admin',
  standalone: true, // ✅ IMPORTANT
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  products = signal<Product[]>([]);
  message = signal<string>('');

  newProduct: Omit<Product, '_id'> = {
    name: '',
    price: 0,
    image: '',
    category: '',
    stock: 0,
    description: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('isAdmin') !== 'true') {
      this.router.navigate(['/login']);
      return;
    }
    this.loadProducts();
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  loadProducts() {
    this.http.get<Product[]>('https://coverkart.onrender.com/api/products')
      .subscribe({
        next: (data) => this.products.set(data),
        error: () => this.message.set('❌ Failed to load products')
      });
  }

  addProduct() {
    this.http.post('https://coverkart.onrender.com/api/products', this.newProduct, this.getHeaders())
      .subscribe({
        next: () => {
          this.message.set('✅ Product added!');
          this.loadProducts();

          this.newProduct = {
            name: '',
            price: 0,
            image: '',
            category: '',
            stock: 0,
            description: ''
          };
        },
        error: () => this.message.set('❌ Failed to add product!')
      });
  }

  deleteProduct(id: string) {
    this.http.delete(`https://coverkart.onrender.com/api/products/${id}`, this.getHeaders())
      .subscribe({
        next: () => this.loadProducts(),
        error: () => this.message.set('❌ Failed to delete product')
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}