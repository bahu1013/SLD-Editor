import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Router } from '@angular/router';
const API_URL = environment.apiURL;

@Injectable()
export class HelperService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  /**
  * Performs a request with `get` http method.
  * @param url the url
  * @param options the request options
  * @returns Observable<any>
  */
  get(url: string, options?: any): Observable<any> {
    return this.http
      .get(API_URL + url, this.requestOptions(options))
      .pipe(catchError(err => this.catchAuthError(err)));
  }

  /**
   * Request options.
   * @param method the method
   * @returns RequestOptionsArgs
   */
  private requestOptions(options?: any, method?: string): any {
    if (!options) {
      options = {};
    }
    if (options.headers || method === 'put' || method === 'post') {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      options.headers = headers;
    }
    return options;
  }
  /**
   * catches the auth error
   * @param error the error response
   */
  catchAuthError(error: Response): Observable<Response> {
    if (error.status === 401) {
      sessionStorage.clear();
      this.router.navigate(['/login']);
      return;
    } else if (error.status === 403) {
      this.router.navigate(['/']);
      return;
    }
    return;
  }
}
