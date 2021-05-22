import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {catchError} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = environment.SERVER_URL;
  constructor(private https: HttpClient) { }

  login(d: any) {
    return this.https.post(this.api + 'auth/login', d, {observe: 'body'})
      .pipe(catchError(AuthService.ErrHandle));
  }

  register(d: any) {
    return this.https.post(this.api + 'users/create', d, {observe: "body"})
      .pipe(catchError(AuthService.ErrHandle));
  }

  private static ErrHandle(error: HttpErrorResponse) {
    if (error.error  instanceof ErrorEvent) {
      // client error
      console.error(`Client not connected to a network, Code: ${error.status}`)
    } else {
      switch (error.status) {
        case 400:
          console.error(`Server Returned: ${error.status}. Dev Message: ${error.message}`);
          alert('There was an error in processing your request');
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
