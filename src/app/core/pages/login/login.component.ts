import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  dateToday:number = new Date().getFullYear()
  submitLoading:boolean = false


  submit(){
    this.submitLoading = true
  }


}
