import { Component,Output,EventEmitter,Input  } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { PersonnelService } from '../../shared/services/personnel.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-personnel-form',
  templateUrl: './personnel-form.component.html',
  styleUrl: './personnel-form.component.scss'
})
export class PersonnelFormComponent {
  isSubmitLoading:boolean = false
  @Input() methodSet:string = 'post'
  @Input() data:any;
  @Output() triggerSubmmit:EventEmitter<any> = new EventEmitter()
  createForm:FormGroup = this._fb.group({
    first_name:['',[Validators.required]],
    last_name:['',[Validators.required]],
    middle_name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    is_active:[false],
    password:['',[Validators.required]],
    password_confirmation:[''],
    suffix:['']
  })
  extension:any=[
    {acro:'',meaning:'Not Applicable'},
    {acro:'Jr',meaning:'Junior'},
    {acro:'Sr',meaning:'Senior'},
    {acro:'II',meaning:'The second'},
    {acro:'III',meaning:'The third'},
    {acro:'IV',meaning:'The fourth'},
    {acro:'V',meaning:'The fifth'},
    {acro:'VI',meaning:'The sixth'},
    {acro:'VII',meaning:'The seventh'},
    {acro:'VIII',meaning:'The eighth'},
    {acro:'IX',meaning:'The ninth'},
    {acro:'X',meaning:'The tenth'},
  ];
  constructor(
    private _fb:FormBuilder,
    private _personnelService:PersonnelService,
    public toast:HotToastService
  ){
  }


  ngOnChanges(){
    if(this.methodSet != 'post'){
      this.createForm.patchValue(this.data);
    }
  }

  onSubmit(){
    if(this.createForm.controls['email'].invalid){
      this.toast.warning("Invalid Email")
      this.isSubmitLoading = false
      return
    }

    if(this.createForm.invalid){
      this.toast.warning("Please, fill-up all inputs")
      this.isSubmitLoading = false
      return
    }

    this.createForm.controls['password_confirmation'].setValue(
      this.createForm.controls['password'].value
    )
    const is_active = this.createForm.controls['is_active'].value
    if(is_active != false && is_active != true) this.createForm.controls['is_active'].setValue(false)
      
    this.isSubmitLoading = true
    if(this.methodSet === 'post'){
      this.postSubmit()
    }else{
      this.updateSubmit()
    }
  }

  updateSubmit(){
    this._personnelService.updatePersonnelInfo(this?.data?.id,this.createForm.value).subscribe({
      next:(res)=>{
        this.toast.success("Personnel successfully Updated!")
        this.isSubmitLoading=false
        this.triggerSubmmit.emit()
        this.createForm.reset()
      },error:(err)=>{
        this.toast.warning(err.error.message || "An Error Occurred")
        this.isSubmitLoading = false
      }
    })
  }

  postSubmit(){

    this._personnelService.createPersonnel(this.createForm.value).subscribe({
      next:(res)=>{
        this.toast.success("Personnel successfully Added!")
        this.isSubmitLoading=false
        this.triggerSubmmit.emit()
        this.createForm.reset()
      },error:(err)=>{
        this.toast.warning(err.error.message || "An Error Occurred")
        this.isSubmitLoading = false
      }
    })
  }

}
