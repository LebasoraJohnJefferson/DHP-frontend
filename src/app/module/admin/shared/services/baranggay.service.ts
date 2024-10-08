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
export class BaranggayService {

  constructor(private http: HttpClient, private router: Router) {}

  getProvinceAndCity():Observable<any>{
    return this.http.get(`${BASEURL}/baranggay`)
  }


  getBaranggayResident(brgyId:number):Observable<any>{
    return this.http.get(`${BASEURL}/baranggay/${brgyId}`)
  }

  createBrgy(data:any):Observable<any>{
    return this.http.post(`${BASEURL}/baranggay`,data)
  }


  deleteBrgy(brgyId:any):Observable<any>{
    return this.http.delete(`${BASEURL}/baranggay/${brgyId}`)
  }


  getAllBrg():Observable<any>{
    return this.http.get(`${BASEURL}/baranggay`)
  }


}
