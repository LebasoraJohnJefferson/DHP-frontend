import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { PersonnelService } from '../../../module/personnel/shared/services/personnel.service';

@Injectable({
  providedIn: 'root',
})
export class PersonnelGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private _personnelService: PersonnelService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): // | Observable<boolean | UrlTree>
  Promise<boolean | UrlTree> {
    // | UrlTree // | boolean
    try {
      // Wait for the getUser() observable and convert it to a promise
      const admin = await new Promise<any>((resolve, reject) => {
        this._personnelService.getProfile().subscribe({
          next: (data: any) => {
            resolve(data);
          },
          error: (error:any) => {
            reject(error);
          },
        });
      });

      // Check if the user data is valid (e.g., logged in)
      if (admin) {
        return true; // Allow navigation
      } else {
        // User is not logged in or user data is invalid
        this.authService.logout('admin');
        this.toast.info('Please login');

        return this.router.createUrlTree(['/login'], {
          queryParams: { type: 'admin' },
        });
      }
    } catch (err) {
      // Handle errors from the getUser() call
      this.authService.logout('admin');
      this.toast.info('Please login');

      return this.router.createUrlTree(['/login'], {
        queryParams: { type: 'admin' },
      });
    }
  }
}
