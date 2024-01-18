import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  submitLoading: boolean = false;
  token: string = '';
  isEmailSent: boolean = false;

  emailForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private _fb: FormBuilder,
  ) {}


  onSubmit() {
    this.isEmailSent = true
  }
}
