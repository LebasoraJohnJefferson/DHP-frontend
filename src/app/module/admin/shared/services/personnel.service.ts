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
export class PersonnelService {

  constructor(private http: HttpClient, private router: Router) {}


  createPersonnel(data:any): Observable<any> {
    return this.http.post(`${BASEURL}/admin/personnel`,data);
  }

  getAllPersonnel():Observable<any>{
    return this.http.get(`${BASEURL}/admin/personnel`);
  }

  importPersonnel(data:any):Observable<any>{
    return this.http.post(`${BASEURL}/admin/personnel/importExcel`,data);
  }

  getSpecificPersonnel(personnelId:number):Observable<any>{
    return this.http.get(`${BASEURL}/admin/personnel/${personnelId}`)
  }

  changePersonnelStatus(personnelId:number):Observable<any>{
    return this.http.patch(`${BASEURL}/admin/personnel/status`,{'id':personnelId})
  }

  updatePersonnelInfo(personnelId:number,data:any):Observable<any>{
    return this.http.put(`${BASEURL}/admin/personnel/${personnelId}`,data)
  }

  deletePersonnel(personnelId:number):Observable<any>{
    return this.http.delete(`${BASEURL}/admin/personnel/${personnelId}`)
  }

  getAllDeletedPersonnel():Observable<any>{
    return this.http.get(`${BASEURL}/admin/recover_personnel`);
  }

  recoverPersonnel(personnelId:number):Observable<any>{
    return this.http.patch(`${BASEURL}/admin/recover_personnel/${personnelId}`,'');
  }

  commitDeletePersonnel(personnelId:number):Observable<any>{
    return this.http.delete(`${BASEURL}/admin/recover_personnel/${personnelId}`)
  }

}
