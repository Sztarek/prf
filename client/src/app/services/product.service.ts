import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3000/api';
  private products$: Subject<Product[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshProducts() {
    this.httpClient.get<Product[]>(`${this.url}/products`)
      .subscribe(products => {
        this.products$.next(products);
      });
  }

  getProducts(): Subject<Product[]> {
    this.refreshProducts();
    return this.products$;
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/products/${id}`);
  }

  createProduct(product: Product): Observable<string> {
    return this.httpClient.post(`${this.url}/products`, product, {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html, application/xhtml+xml, */*",
        
      }),
      responseType: "text",
    });
  }

  updateProduct(id: string, product: Product): Observable<string> {
    return this.httpClient.put(`${this.url}/products/${id}`, product, {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html, application/xhtml+xml, */*",
        
      }),
      responseType: "text",
    });
  }

  deleteProduct(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/products/${id}`, { responseType: 'text' });
  }
}
