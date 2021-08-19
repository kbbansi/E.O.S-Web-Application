import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server = environment.api;

  constructor(private https: HttpClient) { }

  index() {
    return this.https.get(this.server, { observe: 'body' }).
      pipe(
        catchError(ApiService.HandleErr)
      );
  }

  private static HandleErr(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.log(`Encountered an Error: ${err.status}`)
    } else {
      switch (err.status) {
        case 400:
          console.log(`Server Returned: ${err.status}. Dev Message: ${err.message}`);
          alert('There was an error in processing your request')
          break;

        case 500:
          console.log(`Server Returned: ${err.status}. Dev Message: ${err.message}`);
          alert('Unable to Connect to the Server')
          break;

        case 404:
          console.log(`Server Returned: ${err.status}. Dev Message: ${err.message}`);
          alert('The Requested Resource cannot be Found')
          break;

        case 403:
          console.log(`Server Returned: ${err.status}. Dev Message: ${err.message}`);
          alert('You are forbidden from making this request')
          break;

        default:
          console.log(`Server Returned: ${err.status}. Dev Message: ${err.message}`);
          alert('There was an error in processing your request')
          break;
      }
    }
    return throwError('Could not process the request at this time')
  }
}
