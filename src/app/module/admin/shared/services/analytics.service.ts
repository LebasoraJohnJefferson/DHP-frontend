import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
const BASEURL = environment.baseURL;
const HELPER = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) {}

  getFPAnalytics():Observable<any> {
    return this.http.get(`${BASEURL}/admin/profileFamiltyAnalytics/`);
  }

  
  getInfantAnatics():Observable<any> {
    return this.http.get(`${BASEURL}/admin/profileInfantAnlytics/`);
  }


}
