import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( error => {
        let handled = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:
              case 404:
                this.router.navigate(['/error'],
                  {state: {error: {error: error.error, message: error.message}}
                });
                handled = true;
                break;
              case 0:
                this.router.navigate(['/error']);
                handled = true;
                break;
            }
          }
        }
        if (handled) {
          return of(error);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
