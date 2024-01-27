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
export class FamilyProfileService {
  
  constructor(private http: HttpClient, private router: Router) {}

  getAllPF(): any {
    return this.http.get(`${BASEURL}/personnel/famityProfile`);
  }


  createProfileFamilty(data:any): any {
    return this.http.post(`${BASEURL}/personnel/famityProfile`,data);
  }

  specificProfileFamilty(PFid:any):any{
    return this.http.get(`${BASEURL}/personnel/famityProfile/${PFid}`);
  }

  deletePF(PFId:any){
    return this.http.delete(`${BASEURL}/personnel/famityProfile/${PFId}`);
  }
}
