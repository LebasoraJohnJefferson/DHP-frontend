import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { PreschoolService } from '../../shared/services/preschool.service';

@Component({
  selector: 'app-preschool-records-form',
  templateUrl: './preschool-records-form.component.html',
  styleUrl: './preschool-records-form.component.scss'
})
export class PreschoolRecordsFormComponent {
  isSubmitLoading:boolean = false
  @Output() triggerSubmit:EventEmitter<any> = new EventEmitter();
  children:any;
  otherFileds:any=[
    {
      title:'Address',
      formName:'address',
      type:'text',
      placeholder:'Address or location of residence (street or block or landmarks)'
    },
    {
      title:'Weight (kg)',
      formName:'weight',
      type:'number',
      placeholder:'Weight'
    },
    {
      title:'Height (cm)',
      formName:'height',
      type:'number',
      placeholder:'Height'
    },
  ];

  checkLists:any=[
    {
      title:'Indigenous preschool child?',
      formName:'indigenous_preschool_child',
    },
  ]

  familyProfileForm:FormGroup = this._fb.group({
    indigenous_preschool_child:[''],
    height:['',Validators.required],
    weight:['',Validators.required],
    address:['',Validators.required],
    member_id:['',Validators.required]
  })


  constructor(
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _preschoolService:PreschoolService
  ){
    this.getPreschool()
  }


  getPreschool(){
    this._preschoolService.getPreschool().subscribe({
      next:(res:any)=>{
        this.children = res?.data
      }
    })
  }

  



  onSubmit(){
    if(this.familyProfileForm.valid){
      this.isSubmitLoading = true
      this.familyProfileForm.controls['indigenous_preschool_child'].setValue(
        this.familyProfileForm.controls['indigenous_preschool_child'].value == '' ? false : this.familyProfileForm.controls['indigenous_preschool_child'].value
      )
      this._preschoolService.postPreschool(this.familyProfileForm.value).subscribe({
        next:(res:any)=>{
          this.isSubmitLoading = false
          this.triggerSubmit.emit()
          this.toast.success(res?.message || 'Successfully added')
        },error:(err:any)=>{
          this.isSubmitLoading = false
          this.toast.warning(err?.error?.message || 'An Error Occurred')
        }
      })
    }else{
      this.toast.warning("Please, fill-up all inputs!")
    }
  }
}
