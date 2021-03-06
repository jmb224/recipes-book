import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authServ: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authServ.userSubject.pipe(
        map((user) =>
        {
          const auth = !!user;
          if (auth) {
            return true
          }

          return this.router.createUrlTree(['/auth'])
        }));
  }
}
