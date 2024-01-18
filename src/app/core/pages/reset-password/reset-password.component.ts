import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  submitLoading: boolean = false;
  token: any;

  passwordForm: FormGroup = this._fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    public router: Router
  ) {
    this._route.queryParams.subscribe((value) => {
      this.token = this._route.snapshot.paramMap.get('token');
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      // this.toast.warning('Empty Input(s)');
      this.submitLoading = false;
    } else if (
      this.passwordForm.controls['password'].value !=
      this.passwordForm.controls['confirmPassword'].value
    ) {
      // this.toast.error("Password didn't matched.");
      this.submitLoading = false;
    } else {
      // this._authService
      //   .resetPassword(this.passwordForm.value, this.token)
      //   .subscribe({
      //     complete: () => {
      //       this.submitLoading = false;
      //       this.passwordForm.reset();
      //     },
      //     error: (err) => {
      //       this.toast.warning(err.error);
      //       this.submitLoading = false;
      //     },
      //     next: (res) => {
      //       this.toast.success(res.message);
      //       this.router.navigate(['/login?type=alumni']);
      //     },
      //   });
    }
  }
}
