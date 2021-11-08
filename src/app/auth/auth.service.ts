import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { ApiService } from '../shared/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) {}

  signup(
    phoneNumber: string,
    userName: string,
    selectedFile: File,
    isVendor: boolean
  ) {
    const formData = new FormData();
    formData.append('Name', userName);
    formData.append('PhoneNumber', phoneNumber);
    formData.append(isVendor ? 'Logo' : 'Avatar', selectedFile);

    const url = isVendor === true ? 'Shop/register' : 'Customer/register';
    return this.api.postEndPoint<any>(formData, url).pipe(
      tap((resData) => {
        this.handleAuthentication(
          isVendor === true ? resData.shopId : resData.customerId,
          userName,
          phoneNumber,
          null,
          isVendor
        );
      })
    );
  }

  login(phoneNumber: string, isVendor: boolean) {
    const url = isVendor === true ? 'Shop/login' : 'Customer/login';
    return this.api.postEndPoint<any>({ phoneNumber: phoneNumber }, url).pipe(
      tap((resData) => {
        this.handleAuthentication(
          isVendor === true ? resData.shopId : resData.customerId,
          isVendor === false ? resData.name : null,
          resData.phoneNumber,
          isVendor === false ? resData.avatar : null,
          isVendor
        );
      })
    );
  }

  autoLogin() {
    const userData: {
      id: string;
      name: string;
      phoneNumber: string;
      avatar: string;
      isVendor: boolean;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.id,
      userData.name,
      userData.phoneNumber,
      userData.avatar,
      userData.isVendor
    );
    if (loadedUser.id) {
      this.user.next(loadedUser);
      // this.autoLogout();
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout() {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, 600000);
  }

  private handleAuthentication(
    id: string,
    name: string,
    phoneNumber: string,
    avatar: string,
    isVendor: boolean
  ) {
    const user = new User(id, name, phoneNumber, avatar, isVendor);
    this.user.next(user);
    // this.autoLogout();
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return throwError(errorMessage);
  }
}
