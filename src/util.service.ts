import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class UtilService {

  baseUrl = 'https://api.github.com/';
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  
  constructor(private http: HttpClient, private router: Router) {
  }

 


  getData(path: string): Observable<any> {

    return this.http.get(this.baseUrl + path).pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  postData(path: string, payload: any): Observable<any> {
    return this.http.post(path, payload, this.httpOptions).pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
     // errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message}`;
      errorMessage =  err.error.message;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
