export class User {
  private _tokenExpirationDate: Date;
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenLifeTime: string,
  ) {
    this._tokenExpirationDate = this.getTokenLife()
    this.saveToken();
  }

  get token() {
    if (this._tokenExpirationDate > new Date()) {
      return this._token;
    }
    return null;
  }

  private getTokenLife() : Date {
    return new Date(Date.now() + +this._tokenLifeTime * 1000);
  }

  private saveToken() {
    localStorage.setItem(`userData`, JSON.stringify({ id: this.id, token: this.token }))
  }
}
