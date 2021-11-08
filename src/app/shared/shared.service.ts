import { Injectable } from "@angular/core";

@Injectable()
export class SharedService {
  
  getCurrentUser() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    return userData;
  }

}