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
export class PreschoolerWithNutritionalStatusService {


  constructor(private http: HttpClient, private router: Router) {}


  postPreschool(data:any):Observable<any> {
    let { member_id, ...rest } = data;
    let convertData = { member_id: member_id.toString(), ...rest };
    return this.http.post(`${BASEURL}/preschoolWIthNutrionalStatus`,convertData);
  }


  getPreschool():Observable<any> {
    return this.http.get(`${BASEURL}/preschoolWIthNutrionalStatus`);
  }

  deletePreschool(recordId:any):Observable<any> {
    return this.http.delete(`${BASEURL}/preschoolWIthNutrionalStatus/${recordId}`);
  }


}
