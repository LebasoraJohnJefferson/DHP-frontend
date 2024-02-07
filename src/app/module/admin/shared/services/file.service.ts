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

export class FileService {
  
    constructor(private http: HttpClient, private router: Router) {}
 

    getFiles(userId:any): any {
      return this.http.get(`${BASEURL}/file/${userId}`);
    }

    deleteFile(id:any):Observable<any>{
      return this.http.delete(`${BASEURL}/file/${id}`);
    }


    recoverFile(id:any):Observable<any>{
      return this.http.put(`${BASEURL}/recover_files/${id}`,'');
    }

    getArchiveFiles(ownerId:any):Observable<any>{
      return this.http.get(`${BASEURL}/recover_files/${ownerId}`);
    }

    commitDelete(id:any):Observable<any>{
      return this.http.delete(`${BASEURL}/recover_files/${id}`);
    }


}