import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let wwwdsourceOrigin = localStorage.getItem('clientId');
    let API_KEY = null;
    if (wwwdsourceOrigin !== null && wwwdsourceOrigin !== undefined) {
      API_KEY = { 'x-wwwdsource-origin': wwwdsourceOrigin };
    }
    else {
      API_KEY = { 'x-wwwdsource-origin': 'js-localhost' };
    }
    return next.handle(httpRequest.clone({ setHeaders: API_KEY }));
  }
}
