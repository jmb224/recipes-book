import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private authServ: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authServ.userSubject.pipe(
      take(1),
      exhaustMap((user) => {
        const _user = JSON.parse(localStorage.getItem('userData'));
        user = user || _user;
        let req: HttpRequest<any>;

        if (user) {
          req = request.clone({params: new HttpParams().set('auth', user.token ?? _user._token)});
        }

        return next.handle(req || request)
      })
    );
  }
}
