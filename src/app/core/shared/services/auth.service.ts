import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

const BASEURL = environment.baseURL;
const HELPER = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public toast: HotToastService,
    private http: HttpClient,
    private router: Router
  ) {}

  login(data: any): any {
    return this.http.post(`${BASEURL}/login`, data);
  }

  forgotpassword(data: string): any {
    return this.http.post(`${BASEURL}/forgotpassword`, data, {
      responseType: 'text',
    });
  }

  resetPassword(data: any): Observable<any> {
    localStorage.setItem('token', data.token);
    return this.http.post(`${BASEURL}/resetpassword`, data);
  }

  isLoggedIn(type: string): boolean {
    const token: any = localStorage.getItem(`${type}_access_token`);
    const isExpired = HELPER.isTokenExpired(token);

    return !isExpired;
  }

  setSession(type: string, data: any) {
    localStorage.setItem(`${type}_access_token`, data.token);

    // let the database do the validation, if token is error throw error code and redirect to login
    localStorage.setItem('token', data);
    if (type == 'alumni') {
      this.router.navigate(['/']);
      return;
    }

    this.router.navigate([`/${type}`]);
  }

  logout(type: string) {
    this.toast.success('Successfully logout!');
    localStorage.removeItem(`token`);
    this.router.navigate([`/login`], {
      queryParams: { type: type },
    });
  }
}
