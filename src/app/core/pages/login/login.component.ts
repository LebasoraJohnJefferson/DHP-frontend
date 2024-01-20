import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  dateToday:number = new Date().getFullYear()
  submitLoading:boolean = false
  loginForm!: FormGroup;


  constructor(
    private _authService:AuthService,
    public router: Router,
    public toast:HotToastService
  ){

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  submit(){
    this.submitLoading=true
    this._authService.login(this.loginForm.value).subscribe({
      next:(res:any)=>{
        this.submitLoading=false
        localStorage.setItem('token',res?.data?.token)
        let routes = res?.data?.user?.roles === 'personnel' ? '/' :'admin'
        this.router.navigate([routes])
        this.toast.success("Successfully login")
      },error:(err:any)=>{
        this.submitLoading=false
        this.toast.warning(err.error.message ?? 'error')
      }
    })
  }


}
