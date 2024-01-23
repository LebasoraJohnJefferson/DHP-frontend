import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HotToastService } from '@ngneat/hot-toast';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(
    public auth:AuthService, 
    public router:Router,
    public toastr:HotToastService) { }

  canActivate():boolean{
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/'])
      this.toastr.warning('login-first')
      return false
    }
    return true
  }
}
