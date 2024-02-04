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
  
    uploadFile(data:any): any {
      return this.http.post(`${BASEURL}/personnel/file`,data);
    }

    getFiles(): any {
      return this.http.get(`${BASEURL}/personnel/file`);
    }

    deleteFile(id:any):Observable<any>{
      return this.http.delete(`${BASEURL}/personnel/file/${id}`);
    }


    recoverFile(id:any):Observable<any>{
      return this.http.put(`${BASEURL}/recover_files/${id}`,'');
    }

    getArchiveFiles():Observable<any>{
      return this.http.get(`${BASEURL}/recover_files`);
    }

    commitDelete(id:any):Observable<any>{
      return this.http.delete(`${BASEURL}/recover_files/${id}`);
    }


}