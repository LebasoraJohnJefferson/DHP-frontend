import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(
    public auth:AuthService, 
    public router:Router,
    public toastr:ToastrService) { }

  canActivate():boolean{
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/'])
      this.toastr.warning('login-first')
      return false
    }
    return true
  }
}
