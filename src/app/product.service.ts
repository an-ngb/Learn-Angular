import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Product } from './Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productFileLink: EventEmitter<any> = new EventEmitter();

  productFile: any;

  private apiUrl = 'http://localhost:8080/'

  constructor(private http:HttpClient) { }

  get data(): any {
    return this.productFile;
  }
  set data(val: any) {
    this.productFile = val;
    this.productFile.emit(val);
  }

  getProducts(){
    return this.http.get<Product[]>(this.apiUrl + 'get-all');
  }

  deleteProduct(product: number): Observable<any>{
    const url = `${this.apiUrl}delete/${product}`;
    return this.http.post<any>(url, product);
  }

  addProduct(product: string): Observable<any>{
    const url = `${this.apiUrl}add`;
    return this.http.post<any>(url, product);
  }

  search(keyword: string): Observable<any>{
    const url = `${this.apiUrl}search`;
    return this.http.post<any>(url,{['keyword']: keyword});
  }
}
