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
export class ResidentService {

  constructor(private http: HttpClient, private router: Router) {}

  createResident(data:any):Observable<any>{
    return this.http.post(`${BASEURL}/resident`,data)
  }

  importResident(data:any,brgyId:number):Observable<any>{
    return this.http.post(`${BASEURL}/resident/importResident/${brgyId}`,data)
  }

  getResident(brgy_id:any):Observable<any>{
    return this.http.get(`${BASEURL}/resident/${brgy_id}`)
  }

  updateResident(residentId:number,data:any):Observable<any>{
    return this.http.put(`${BASEURL}/resident/${residentId}`,data)
  }

  deleteResident(residentId:number):Observable<any>{
    return this.http.delete(`${BASEURL}/resident/${residentId}`)
  }

}
