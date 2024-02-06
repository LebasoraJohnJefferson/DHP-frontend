import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
const BASEURL = environment.baseURL;
const HELPER = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class InfantService {
  constructor(private http: HttpClient, private router: Router) {}

  getInfants():Observable<any> {
    return this.http.get(`${BASEURL}/infant`);
  }

  addInfantWeight(data:any):Observable<any>{
    return this.http.post(`${BASEURL}/infant`,data);
  }

  getAllInfantRecords(){
    return this.http.get(`${BASEURL}/infant/anyThingWorksHere`);
  }

  deleteInfantRecord(recordId:any){
    return this.http.delete(`${BASEURL}/infant/${recordId}`);
  }


}