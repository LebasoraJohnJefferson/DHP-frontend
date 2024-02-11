import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  forms = [
    {link:'/admin/forms',label:'Family profile'},
    {link:'/admin/forms/infant',label:'Infant'},
    {link:'/admin/forms/baranggay-preschooler',label:'baranggay preschooler'}
  ]


  constructor(
    public router:Router
  ){

  }



  navigateTo(link:any){
    this.router.navigate([link?.target?.value])
  }


}
