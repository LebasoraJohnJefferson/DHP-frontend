import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AtRiskPreschoolService } from '../../shared/services/atRiskPreschool.service';

@Component({
  selector: 'app-at-risk-preschool-form',
  templateUrl: './at-risk-preschool-form.component.html',
  styleUrl: './at-risk-preschool-form.component.scss'
})
export class AtRiskPreschoolFormComponent {
  @Output() triggerSubmmit:EventEmitter<any> = new EventEmitter()
  isSubmitLoading:boolean = false
  otherFileds:any=[
    {
      title:'Weight (kg)',
      formName:'weight',
      type:'number',
      placeholder:'weight'
    },
    {
      title:'Height (cm)',
      formName:'height',
      type:'number',
      placeholder:'height'
    },
    {
      title:'Year/period of measurement',
      formName:'period_of_measurement',
      type:'number',
      placeholder:'Year/period of measurement'
    },
  ]

  preschoolAtRiskForm:FormGroup = this._fb.group({
    weight:['',Validators.required],
    height:['',Validators.required],
    member_id:['',Validators.required],
    period_of_measurement:['',Validators.required]
  })

  children:any=[]



  constructor(
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _preschoolAtRiskService:AtRiskPreschoolService
  ){
    this.getAll0To59Month()
  }


  getAll0To59Month(){
    this._preschoolAtRiskService.getAllPreschool0To59().subscribe({
      next:(res)=>{
        this.children = res?.data
      }
    })
  }




  onSubmit(){
    if(this.preschoolAtRiskForm.valid){
      this.isSubmitLoading = true
      this._preschoolAtRiskService.createPreschoolAtRisk(this.preschoolAtRiskForm.value).subscribe({
        next:(res:any)=>{
          this.toast.success(res?.message || 'Successfully Added')
          this.triggerSubmmit.emit()
          this.preschoolAtRiskForm.reset()
          this.isSubmitLoading = false
        },error:(err:any)=>{
          this.isSubmitLoading = false
          this.toast.warning(err?.error?.message || 'An error occured!')
        }
      })
    }else{
      this.toast.warning('Please, fill-up all inputs!')
    }
  }
}
