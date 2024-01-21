import { Component } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.scss'
})
export class PersonnelComponent {


  createAccountModal:boolean = false
  isSubmitLoading:boolean = false
  data:any = [
    {
      first_name:"hello wolrd",
      last_name:"hell world",
      middle_name:"hell world",
      email:"hell_world@gmail.com",
      gender:'male',
      status:false
    },
    {
      first_name:"hello wolrd",
      last_name:"hell world",
      middle_name:"hell world",
      email:"hell_world@gmail.com",
      gender:'male',
      status:false
    },{
      first_name:"hello wolrd",
      last_name:"hell world",
      middle_name:"hell world",
      email:"hell_world@gmail.com",
      gender:'male',
      status:false
    }
  ]


  createForm:FormGroup = this._fb.group({
    first_name:['',[Validators.required]],
    last_name:['',[Validators.required]],
    middle_name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    gender:['',[Validators.required]],
    is_active:['',[Validators.required]],
    password:['',[Validators.required]],
    confirm_passowrd:[]
  })


  gender:any=[
    {
      id:1,
      name:"male"
    },
    {
      id:2,
      name:"female"
    }
  ];
  pages:number[] = [1,3,4,5,6,7]


  constructor(
    private _fb:FormBuilder
  ){

  }


  onSubmit(){

  }


  openPersonnelForm(method:string){
    this.createAccountModal = true
  }

  


}
