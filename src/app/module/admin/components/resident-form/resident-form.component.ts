import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ResidentService } from '../../shared/services/resident.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resident-form',
  templateUrl: './resident-form.component.html',
  styleUrl: './resident-form.component.scss'
})
export class ResidentFormComponent  {
  isSubmitLoading:boolean =false
  @Input() residentDetails:any;
  baranggay:any=[]
  brgyId:number = 0

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

  @Output() triggerSubmmit:EventEmitter<any> = new EventEmitter()
  otherFileds:any=[
    {
      title:'Father`s first name',
      formName:'father_first_name',
      type:'text',
      placeholder:'Enter Father`s first name.'
    },
    {
      title:'Father`s middle name',
      formName:'father_middle_name',
      type:'text',
      placeholder:'Enter Father`s middle name.'
    },
    {
      title:'Father`s last name',
      formName:'father_last_name',
      type:'text',
      placeholder:'Enter Father`s last name.'
    },
    {
      title:'Father`s suffix',
      formName:'father_suffix',
      type:'dropdown',
      placeholder:'Enter Father`s last name.',
      data:this.extension
    },
    {
      title:'Father`s birthday',
      formName:'father_birthday',
      type:'date',
    },
    {
      title:'Mother`s first name',
      formName:'mother_first_name',
      type:'text',
      placeholder:'Enter Father`s first name.'
    },
    {
      title:'Mother`s middle name',
      formName:'mother_middle_name',
      type:'text',
      placeholder:'Enter Mother`s middle name.'
    },
    {
      title:'Mother`s last name',
      formName:'mother_last_name',
      type:'text',
      placeholder:'Enter Father`s last name.'
    },
    {
      title:'mother`s birthday',
      formName:'mother_birthday',
      type:'date',
    },

  ]



  residentForm:FormGroup = this._fb.group({
    brgy_id:['',Validators.required],
    mother_first_name:['',Validators.required],
    mother_middle_name:['',Validators.required],
    mother_last_name:['',Validators.required],
    father_first_name:['',Validators.required],
    father_middle_name:['',Validators.required],
    father_last_name:['',Validators.required],
    father_suffix:[''],
    father_birthday:['',Validators.required],
    mother_birthday:['',Validators.required],
  });



  constructor(
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _residentService:ResidentService,
    private _route:ActivatedRoute
  ){}

  

  onSubmit():any{
    this.residentForm.controls['brgy_id'].setValue(this.brgyId);
    console.log(this.residentForm.value)
    if(this.residentForm.valid){
      this.isSubmitLoading=true
      if(this.residentDetails){
        this.updateProfileFamily()
      }else{
        this.createFamilyProfile()
      }

    }else{
      this.isSubmitLoading=false
      this.toast.warning("Please, fill-up all inputs")
    }
  }

  ngOnChanges(){
    if(this.residentDetails){
      this.residentForm.patchValue(this.residentDetails?.attributes)
    }else this.residentForm.reset()
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((value:any) => {
      this.brgyId = value['brgyId'];
    });
  }

 

  updateProfileFamily(){
    this._residentService.updateResident(this.residentDetails?.id,this.residentForm.value).subscribe({
      next:(res:any)=>{
        this.isSubmitLoading=false
        this.triggerSubmmit.emit()
        this.residentForm.reset()
        this.toast.success(res?.message || 'Successfully updated')
      },
      error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
        this.isSubmitLoading=false
      }
    })
  }


  createFamilyProfile(){
    this._residentService.createResident(this.residentForm.value).subscribe({
      next:(res:any)=>{
        this.isSubmitLoading=false
        this.triggerSubmmit.emit()
        this.residentForm.reset()
        this.toast.success(res?.message || 'Successfully added')
      },
      error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
        this.isSubmitLoading=false
      }
    })
  }

}
