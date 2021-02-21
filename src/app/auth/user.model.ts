export class User {
  private _tokenExpirationDate: Date;
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenLifeTime: string,
  ) {
    this._tokenExpirationDate = this.getTokenLife()
  }

  get token() {
    if (!this._tokenExpirationDate || this._tokenExpirationDate > new Date()) {
      return null;
    }
    return this._token;
  }

  private getTokenLife() : Date {
    return new Date(Date.now() + +this._tokenLifeTime * 1000);
  }
}
