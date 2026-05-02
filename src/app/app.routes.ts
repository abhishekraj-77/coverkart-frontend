import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home')
      .then(m => m.Home)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail')
      .then(m => m.ProductDetail)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart')
      .then(m => m.Cart)
  },
  {
    path: 'tracking',
    loadComponent: () => import('./pages/order-tracking/order-tracking')
      .then(m => m.OrderTracking)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login')
      .then(m => m.Login)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin')
      .then(m => m.Admin)
  },
];