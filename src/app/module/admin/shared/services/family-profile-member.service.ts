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
export class FamilyProfileMemberService {

  constructor(private http: HttpClient, private router: Router) {}

  createPFC(data:any): any {
    return this.http.post(`${BASEURL}/famityProfileMembers`,data);
  }


  updatePFC(PfcId:number,data:any): any {
    return this.http.put(`${BASEURL}/famityProfileMembers/${PfcId}`,data);
  }

  saveImportedFCM(FP_id:number,data:any): any {
    return this.http.post(`${BASEURL}/admin/saveImportedFCM/${FP_id}`,data);
  }

  getAllPFC(FC_id:any):any{
    return this.http.get(`${BASEURL}/famityProfileMembers/${FC_id}`);
  }

  deletePFC(FC_id:any):any{
    return this.http.delete(`${BASEURL}/famityProfileMembers/${FC_id}`);
  }
}
