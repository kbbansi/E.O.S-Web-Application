import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // create api url variable
  apiUrl = environment.api;

  // inject https dependency to service constructor
  constructor(private https: HttpClient) { }

  // define http service functions
  index() {
    console.log('Index service function called');
    return this.https.get(this.apiUrl).pipe(map((response: any) => response));
  }

  login(d) {
    console.log('Processing.....');
    return this.https.post(this.apiUrl + '/auth/login', d).pipe(map((response: any) => response));
  }

  addProduct(d) {
    console.log(d);
    return this.https.post(this.apiUrl + '/product/create', d).pipe(map((response: any) => response));
  }

  editProduct(d) {
    console.log(d);
    return this.https.put(this.apiUrl + '/product/update/' + d.id, d).pipe(map((response: any) => response));
  }

  getAllProducts() {
    return this.https.get(this.apiUrl + '/product').pipe(map((response: any) => response));
  }

  getOneProduct(d) {
    return this.https.get(this.apiUrl + '/product/' + d).pipe(map((response: any) => response));
  }

  addCategory(d) {
    console.log(d);
    return this.https.post(this.apiUrl + '/category/create', d).pipe(map((response: any) => response));
  }

  getAllCategories() {
    return this.https.get(this.apiUrl + '/category').pipe(map((response: any) => response));
  }

  getOneCategory(d) {
    console.log(d);
  }

  getAllOrders() {
    return this.https.get(this.apiUrl + '/orders').pipe(map((response: any) => response));
  }

  // analytics routes
  getProductAnalytics() {
    return this.https.get(this.apiUrl + '/product/analytics/products').pipe(map((response: any) => response));
  }
  
  getOrderAnalytics() {
    return this.https.get(this.apiUrl + '/orders/analytics/orders').pipe(map((response: any) => response));
  }

  getSalesAnalytics() {
    return this.https.get(this.apiUrl + '/orders/analytics/sales').pipe(map((response: any) => response));
  }

  getUserAnalytics() {
    return this.https.get(this.apiUrl + '/users/analytics/users').pipe(map((response: any) => response));
  }

  deleteProduct(d) {
    return this.https.delete(this.apiUrl + '/product/delete/' + d).pipe(map((response: any) => response));
  }


}
