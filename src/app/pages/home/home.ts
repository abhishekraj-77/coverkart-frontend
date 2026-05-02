import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  products = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://coverkart.onrender.com/api/products')
      .subscribe({
        next: (data) => {
          this.products.set(data);
          console.log('Products loaded:', this.products().length);
        },
        error: (err) => console.log('Error:', err)
      });
  }
}