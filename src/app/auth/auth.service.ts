import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

export interface UserLogin {
  email: string,
  password: string,
  returnSecureToken: boolean
}

interface AuthResponse {
  expires_in: string,
  token_type: string,
  refresh_token: string,
  id_token: string,
  user_id: string,
  project_id: string,
  registered?: boolean
}

@Injectable( { providedIn: 'root' })

export class AuthService {

  constructor(private http: HttpClient, @Inject('API_KEY') private API_KEY: string) {}

  signup(body: UserLogin) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, body)
  }

  signin(user: UserLogin) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, user)
  }
}
