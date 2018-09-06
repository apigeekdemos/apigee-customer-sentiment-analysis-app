import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class CommentsService {
  //API_URL  =  'http://apigee-cs-test.apigee.net/sentiment-analysis-api';
  //API_URL = 'http://demo39-test.apigee.net/v1/customersentiments';
  API_URL = 'http://amer-api-partner19-test.apigee.net/proxy-for';

  constructor(private httpClient: HttpClient) { }

  // Simulate POST /comments
  public addComment(comment) {
    console.log('comment', comment);
    return this.httpClient
      //.post
      .post(this.API_URL + '/comments', comment, { headers: { 'Content-Type': "application/json" } })
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
