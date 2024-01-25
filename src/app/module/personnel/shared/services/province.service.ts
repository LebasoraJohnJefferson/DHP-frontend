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
export class ProvinceService {

  constructor(private http: HttpClient, private router: Router) {}

  createProvince(data:any):Observable<any>{
    return this.http.post(`${BASEURL}/personnel/province`,data)
  }

  getProvince(provinceId:number):Observable<any>{
    return this.http.get(`${BASEURL}/personnel/province/${provinceId}`)
  }

  getAllProvince():Observable<any>{
    return this.http.get(`${BASEURL}/personnel/province`)
  }

  deleteProvince(provinceId:number):Observable<any>{
    return this.http.delete(`${BASEURL}/personnel/province/${provinceId}`)
  }
  
}
