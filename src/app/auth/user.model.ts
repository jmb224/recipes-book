export class User {
  private _tokenExpirationDate: Date;
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenLifeTime: Date,
  ) {
    this.saveToken();
  }

  get token() {
    if (this._tokenExpirationDate > new Date()) {
      return this._token;
    }
    return null;
  }

  private saveToken() {
    // localStorage.setItem(`userData`, JSON.stringify({ id: this.id, token: this.token }))
    localStorage.setItem(`userData`, JSON.stringify(this));
  }
}
