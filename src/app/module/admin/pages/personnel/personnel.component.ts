import { Component } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { PersonnelService } from '../../shared/services/personnel.service';


@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.scss'
})
export class PersonnelComponent {


  createAccountModal:boolean = false
  isSubmitLoading:boolean = false
  formMethod:string = 'post'
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
    is_active:[false,[Validators.required]],
    password:['',[Validators.required]],
    password_confirmation:['']
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
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _personnelService:PersonnelService
  ){

  }


  onSubmit(){
    this.isSubmitLoading = true
    if(this.createForm.invalid){
      this.toast.warning("Please, fill-up all inputs")
      this.isSubmitLoading = false
      return
    }
    this.createForm.controls['password_confirmation'].value(
      this.createForm.controls['password'].value
    )
    this._personnelService.createPersonnel(this.createForm.value).subscribe({
      next:(res)=>{
        this.toast.success("Personnel successfully Added!")
        this.isSubmitLoading=false
      },error:(err)=>{
        this.toast.warning(err.error.message || "An Error Occurred")
        this.isSubmitLoading = false
      }
    })

  }


  openPersonnelForm(method:string){
    this.formMethod = method
    this.createAccountModal = true
  }

  


}
