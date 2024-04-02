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

  sexOptions:any=[
    {acro:'Male'},
    {acro:'Female'}
  ]

  civilStatus:any=[
    {acro:'Married'},
    {acro:'Single'},
    {acro:'Divorced'},
    {acro:'Separated'},
    {acro:'Widowed'},
    {acro:'Annulled'},
  ]

  citizenshipOptions:any=[
    {acro:'Chinese'},
    {acro:'Indian'},
    {acro:'Japanese'},
    {acro:'South Korean'},
    {acro:'Indonesian'},
    {acro:'Pakistani'},
    {acro:'Bangladeshi'},
    {acro:'Filipino'},
    {acro:'Vietnamese'},
    {acro:'Iranian'},
    {acro:'Turkish'},
    {acro:'Thai'},
    {acro:'Burmese'},
    {acro:'Iraqi'},
    {acro:'Afghan'},
    {acro:'Saudi'},
    {acro:'Uzbek'},
    {acro:'Malaysian'},
    {acro:'Nepali'},
    {acro:'Others'},
  ]

  
  





  @Output() triggerSubmmit:EventEmitter<any> = new EventEmitter()
  otherFileds:any=[
    {
      title:'First name',
      formName:'first_name',
      type:'text',
      placeholder:'first name.'
    },
    {
      title:'Middle name',
      formName:'middle_name',
      type:'text',
      placeholder:'middle name.'
    },
    {
      title:'Last name',
      formName:'last_name',
      type:'text',
      placeholder:'last name.'
    },
    {
      title:'Suffix',
      formName:'suffix',
      type:'dropdown',
      placeholder:'suffix.',
      data:this.extension
    },
    {
      title:'Birthday',
      formName:'birthday',
      type:'date',
    },
    {
      title:'Gender',
      formName:'sex',
      type:'dropdown',
      placeholder:'gender.',
      data:this.sexOptions
    },
    {
      title:'Occupation',
      formName:'occupation',
      type:'text',
      placeholder:'occupation.',
    },
    {
      title:'Civil status',
      formName:'civil_status',
      type:'dropdown',
      placeholder:'civil status.',
      data:this.civilStatus
    },
    {
      title:'Citizenship',
      formName:'citizenship',
      type:'dropdown',
      placeholder:'citizenship.',
      data:this.citizenshipOptions
    },
  ]


  residentForm:FormGroup = this._fb.group({
    citizenship:['',Validators.required],
    brgy_id:['',Validators.required],
    sex:['',Validators.required],
    first_name:['',Validators.required],
    middle_name:[''],
    last_name:['',Validators.required],
    civil_status:['',Validators.required],
    occupation:['',Validators.required],
    suffix:[''],
    birthday:['',Validators.required],
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
      this.residentForm.patchValue(this.residentDetails)
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
