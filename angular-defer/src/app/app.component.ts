import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { ProductComponent } from './product/product.component';

export type Product = unknown & { title: string };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-defer';

  products = signal<Array<Product>>([]);

  constructor(private http: HttpClient) {
    this.http
      .get<unknown>('https://dummyjson.com/products')
      .pipe(
        map((products: unknown) => (products as { products: unknown }).products)
      )
      .subscribe(products => this.products.set(products as Array<Product>));
  }
}
