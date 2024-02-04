import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  token: any = null;
  userId: any = null;
  email: any = null;
  password: any = null;
  password_confirmation: any = null;

  submitLoading: boolean = false;

  constructor(
    private toast: HotToastService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((value) => {
      this.token = value['token'];
    });

    if (this.token == null) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.email == '') return this.toast.error('Email is required');

    if (this.password != this.password_confirmation)
      return this.toast.error("Password didn't matched.");

    this.submitLoading = true;

    const data = {
      email: this.email,
      token: this.token,
      password: this.password,
      password_confirmation: this.password_confirmation,
    };

    console.log(data);

    this.authService.resetPassword(data).subscribe(
      (response: any) => {
        this.submitLoading = false;

        if (response == 'passwords.reset') {
          this.toast.success('Password reset successfully');
          this.router.navigate([`/login`]);
        }
      },
      (err: any) => {
        this.submitLoading = false;
        this.toast.error(err.error.message);
      }
    );
  }
}
