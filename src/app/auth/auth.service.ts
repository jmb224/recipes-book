import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

export interface UserLogin {
  email: string,
  password: string,
  returnSecureToken: boolean
}

export interface AuthResponse {
  displayName: string,
  expiresIn: string,
  email: string,
  refreshToken: string,
  idToken: string,
  localId: string,
  project_id: string,
  registered?: boolean
}

@Injectable( { providedIn: 'root' })

export class AuthService {
  public userSubject = new BehaviorSubject<User>(null);
  public userLoggedIn: User;
  public loggoutTimer = null;

  constructor(
    private route: Router,
    private http: HttpClient, @Inject('API_KEY') private API_KEY: string) {}

  signup(body: UserLogin) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, body).pipe(
      tap(authRes => {
        this.handleAuthentication(authRes);
      })
    );
  }

  signin(user: UserLogin) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, user).pipe(
      tap(authRes => {
        this.handleAuthentication(authRes);
      })
    );
  }

  handleAuthentication(authRes: AuthResponse) {
    this.userLoggedIn = new User(authRes.email, authRes.localId, authRes.idToken, new Date(Date.now() + +authRes.expiresIn * 1000));
    this.autoLogout(+authRes.expiresIn)
    this.userSubject.next(this.userLoggedIn);
  }

  signout() {
    this.userSubject.next(null);
    clearTimeout(this.loggoutTimer);
    this.loggoutTimer = null;
    localStorage.removeItem('userData');
    this.route.navigate(['/auth'])
  }

  autoLogout(tokenExpirationTime: number) {
    this.loggoutTimer = setTimeout(()=> {
      this.signout()
    }, tokenExpirationTime * 1000)
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('userData'))

    if (user) {
      const userData = new User(user.email, user.id, user._token, new Date(user._tokenLifeTime))
      this.userSubject.next(userData);
    }
  }
}
