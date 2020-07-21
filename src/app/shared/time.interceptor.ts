import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NotifyService} from '../ui/notify.service';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  constructor(private  router: Router,
              private notifyService: NotifyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const curReq = req;
    const start = performance.now();
    return next.handle(curReq).pipe( tap(event => {
        if (event instanceof HttpResponse) {
          this.notifyService.showInfo('took ' + (performance.now() - start) + 'ms');
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.notifyService.showError( JSON.stringify(err, null, 4));
        }
      }));
  }
}

export const timeInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true }
];
