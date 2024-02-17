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

export class AtRiskPreschoolService {

  constructor(private http: HttpClient, private router: Router) {}

  getAllPreschool0To59():Observable<any>{
    return this.http.get(`${BASEURL}/preschoolAtRisk/AnyInputHere`)
  }


  createPreschoolAtRisk(data:any):Observable<any>{
    return this.http.post(`${BASEURL}/preschoolAtRisk`,data)
  }


  getAllCreatedPreschoolAtRisk():Observable<any>{
    return this.http.get(`${BASEURL}/preschoolAtRisk`)
  }





}
