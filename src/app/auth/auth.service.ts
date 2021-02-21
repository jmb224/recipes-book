import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";
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
  public user = new Subject<User>();

  constructor(private http: HttpClient, @Inject('API_KEY') private API_KEY: string) {}

  signup(body: UserLogin) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, body).pipe(
      tap(authRes => {
        // this.user.next(new User(authRes.email, authRes.localId, authRes.idToken, authRes.expiresIn));
      })
    );
  }

  signin(user: UserLogin) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, user).pipe(
      tap(authRes => {
        this.user.next(new User(authRes.email, authRes.localId, authRes.idToken, authRes.expiresIn));
      })
    );
  }
}
