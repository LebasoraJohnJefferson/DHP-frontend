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

export class LogsService {


    constructor(private http: HttpClient, private router: Router) {}

    userLog(): Observable<any> {
        return this.http.get(`${BASEURL}/admin/logs`);
      }

    logs():Observable<any>{
        return this.http.get(`${BASEURL}/admin/logs/1`);
    }
}