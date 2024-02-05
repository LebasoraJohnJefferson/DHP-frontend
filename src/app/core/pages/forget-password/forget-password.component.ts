import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  form: any;
  submitLoading: boolean = false;
  isEmailSent: boolean = false;

  constructor(
    private location: Location,
    private toast: HotToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('christianparanas1@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onSubmit() {
    if (!this.form.valid)
      return this.toast.info('Please enter a valid email address');

    this.submitLoading = true;
    this.authService.forgotpassword(this.form.value).subscribe(
      (response: any) => {
        this.submitLoading = false;
        if(response !== 'passwords.sent') return this.toast.warning(response)
        this.isEmailSent = true;
      },
      (err: any) => {
        this.submitLoading = false;
        this.toast.error(err?.message || 'Invalid Credentials');
        console.log(err);
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
