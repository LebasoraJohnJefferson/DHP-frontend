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
      (this.token = value['token']), (this.userId = value.id);
    });

    if (this.token == null && this.userId == null) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.password != this.password_confirmation)
      return this.toast.error("Password didn't matched.");

    this.submitLoading = true;

    const data = {
      token: this.token,
      password: this.password,
      userId: this.userId,
    };

    this.authService.resetPassword(data).subscribe(
      (response: any) => {
        this.submitLoading = false;
        this.toast.success(response.message);

        this.router.navigate([`/login`], {
          queryParams: { type: 'student' },
        });
      },
      (err: any) => {
        this.submitLoading = false;
        this.toast.error(err.error.message);
      }
    );
  }
}
