export class User {
  constructor(
    public id: string,
    public name: string,
    public phoneNumber: string,
    public avatar: string,
    public isVendor: boolean,
    // private _token: string,
    // private _tokenExpirationDate: Date
  ) {}

  // get token() {
  //   if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
  //     return null;
  //   }
  //   return this._token;
  // }
}
