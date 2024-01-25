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
export class CityService {


  constructor(private http: HttpClient, private router: Router) {}

  createCity(data:any):Observable<any>{
    return this.http.post(`${BASEURL}/personnel/city`,data)
  }

  getAllCity():Observable<any>{
    return this.http.get(`${BASEURL}/personnel/city`)
  }

  deleteCity(provinceId:number):Observable<any>{
    return this.http.delete(`${BASEURL}/personnel/city/${provinceId}`)
  }
}
