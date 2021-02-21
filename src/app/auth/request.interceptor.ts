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
        user = user || JSON.parse(localStorage.getItem('userData')) as User
        let req: HttpRequest<any>;

        if (user) {
          req = request.clone({params: new HttpParams().set('auth', user.token)});
        }

        return next.handle(req || request)
      })
    );
  }
}
