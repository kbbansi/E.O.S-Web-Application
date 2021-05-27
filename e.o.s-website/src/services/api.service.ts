import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api = environment.SERVER_URL;
  paymentApi = environment.paymentAPI;
  constructor(private https: HttpClient) { }

  getAllProducts(){
    return this.https.get(this.api + 'product', {observe: 'body'}).pipe(catchError(ApiService.ErrHandle));
  }

  getAllCategories() {
    return this.https.get(this.api + 'category', {observe: 'body'}).pipe(catchError(ApiService.ErrHandle));
  }

  getProductCategory(id) {
    return this.https.get(this.api + 'category/product/' + id, {observe: 'body'}).pipe(catchError(ApiService.ErrHandle));
  }

  getOneProduct(id) {
    return this.https.get(this.api + 'product/' + id, {observe: 'body'}).pipe(catchError(ApiService.ErrHandle));
  }

  getUserShippingInfo(id){
    // will return user shipping info
    return this.https.get(this.api + 'users/address/user/' + id, {observe: 'body'}).pipe(catchError(ApiService.ErrHandle));
  }

  createUserShippingInfo(d) {
    // create shipping info for a user
    console.log(d.id)
    return this.https.post(this.api + 'users/address/delivery-address/' + d.id, d, {observe: 'body'}).pipe(catchError(ApiService.ErrHandle));
  }

  updateUserDetails(d){
    console.log(d.id);
    return this.https.put(this.api + 'users/user/' + d.id, d, {observe: 'body'}).pipe(catchError(ApiService.ErrHandle));
  }

  getUserOrders(id){}

  placeOrder(d) {
    return this.https.post(this.api + 'orders/create', d, {observe: 'body'}).pipe(catchError(ApiService.ErrHandle));
  }

  makePayment(d) {
    return this.https.post(this.paymentApi + 'paystack/pay', d, {observe: 'body'}).pipe(catchError(ApiService.ErrHandle));
  }

  private static ErrHandle(error: HttpErrorResponse) {
    if (error.error  instanceof ErrorEvent) {
      // client error
      console.error(`Client not connected to a network, Code: ${error.status}`)
    } else {
      switch (error.status) {
        case 404:
          console.error(`Server Returned: ${error.status}. Dev Message: ${error.message}`);
          alert('No Data Found');
          break;
        case 500:
          console.error(`Server Returned: ${error.status}. Dev Message: ${error.message}`);
          alert('Lost connection to the Server');
          break;

        // todo:: add other error status codes
        default:
          console.error(`Server Returned: ${error.status}. Dev Message: ${error.message}`);
          alert('Cannot process your request at this time');
          break;
      }
    }

    return throwError('Could not process request at this time')
  }
}
