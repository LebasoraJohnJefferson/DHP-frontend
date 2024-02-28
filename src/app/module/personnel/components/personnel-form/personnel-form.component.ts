import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { PersonnelService } from '../../shared/services/personnel.service';

@Component({
  selector: 'app-personnel-form',
  templateUrl: './personnel-form.component.html',
  styleUrl: './personnel-form.component.scss'
})
export class PersonnelFormComponent implements OnInit{
  @Input() data:any;
  @Output() triggerSubmmit:EventEmitter<any> = new EventEmitter()
  isSubmitLoading:boolean=false

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

  updateForm:FormGroup = this._fb.group({
    first_name:['',[Validators.required]],
    last_name:['',[Validators.required]],
    middle_name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password_confirmation:[''],
    suffix:['']
  })

  constructor(
    private _fb:FormBuilder,
    public taost:HotToastService,
    private _personnelService:PersonnelService
  ){}

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.updateForm.patchValue(this.data)
  }


  updateInfo(){
    if(this.updateForm.valid){
      this.isSubmitLoading = true
      this.updateForm.controls['password_confirmation'].setValue(this.updateForm.controls['password'].value);
      this._personnelService.updatePersonnelInfo(this.updateForm.value).subscribe({
        next:(res)=>{
          this.triggerSubmmit.emit()
          this.isSubmitLoading =false
          this.taost.success(res?.message || 'Successfully updated')
        },error:(err)=>{
          this.isSubmitLoading =false
          this.taost.warning(err?.error?.message || 'An error occurred')
        }
      })
    }else{
      this.taost.warning('Please, fill-up all inputs');
    }
  }
}
