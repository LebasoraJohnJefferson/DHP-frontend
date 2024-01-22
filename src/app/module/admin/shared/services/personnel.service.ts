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

}
