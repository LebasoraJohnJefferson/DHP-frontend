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
export class FamilyProfileChildService {

  constructor(private http: HttpClient, private router: Router) {}

  createPFC(data:any): any {
    return this.http.post(`${BASEURL}/personnel/famityProfileChild`,data);
  }

  getAllPFC(FC_id:any):any{
    return this.http.get(`${BASEURL}/personnel/famityProfileChild/${FC_id}`);
  }

  deletePFC(FC_id:any):any{
    return this.http.delete(`${BASEURL}/personnel/famityProfileChild/${FC_id}`);
  }
}
