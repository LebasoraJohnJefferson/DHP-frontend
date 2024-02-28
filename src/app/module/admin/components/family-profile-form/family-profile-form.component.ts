import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaranggayService } from '../../shared/services/baranggay.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FamilyProfileService } from '../../shared/services/family-profile.service';


@Component({
  selector: 'app-family-profile-form',
  templateUrl: './family-profile-form.component.html',
  styleUrl: './family-profile-form.component.scss'
})
export class FamilyProfileFormComponent implements OnInit {
  isSubmitLoading:boolean =false
  @Input() FPDetails:any={};
  baranggay:any=[]

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

  usingIodizedSalt:boolean = false
  usingIFR:boolean = false
  familtyPlanning:boolean = false
  motherPregnant:boolean = false
  @Output() triggerSubmmit:EventEmitter<any> = new EventEmitter()
  otherFileds:any=[
    {
      title:'Contact number',
      formName:'contact_number',
      type:'string',
      placeholder:'contact number e.g 09********.'
    },
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
      title:'Mother`s suffix',
      formName:'mother_suffix',
      type:'dropdown',
      placeholder:'Enter Father`s last name.',
      data:this.extension
    },
    {
      title:'mother`s birthday',
      formName:'mother_birthday',
      type:'date',
    },

  ]

  occupations = ['employed','unemployed','self-employed']
  educAttans = ['Advance Learning System',
                'College',
                'College Student',
                'College undergrad',
                'Elem Student',
                'Elem Undegrad',
                'Elem Education',
                'High Scool Education',
                'HS Student',
                'HS undegrad',
                'No Formal Education',
                'Not Applicable',
                'Postgraduate Program',
                'Pre-School',
                'Senior HS',
                'Vacational',
              ]


  toiletTypes:string[] = ['WS','OP','O','N']
  typeOfWater:string[]=['P','W','S']
  foodProdActs:string[]=['VG','P/L','FP']


  familyProfileForm:FormGroup = this._fb.group({
    brgy_id:['',Validators.required],
    mother_first_name:['',Validators.required],
    mother_middle_name:['',Validators.required],
    mother_last_name:['',Validators.required],
    mother_suffix:[''],
    father_first_name:['',Validators.required],
    father_middle_name:['',Validators.required],
    father_last_name:['',Validators.required],
    father_suffix:[''],
    contact_number: ['', [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
    mother_occupation:['',Validators.required],
    father_occupation:['',Validators.required],
    father_birthday:['',Validators.required],
    mother_birthday:['',Validators.required],
    mother_educ_attain:['',Validators.required],
    father_educ_attain:['',Validators.required],
    //drop down
    food_prod_act:['',Validators.required],
    toilet_type:['',Validators.required],
    water_source:['',Validators.required],
    //options
    using_iodized_salt:[false],
    using_IFR:[false],
    familty_planning:[false],
    mother_pregnant:[false],
  });

  checkLists:any=[
    {
      title:'Mother pregnant',
      formName:'mother_pregnant',
    },
    {
      title:'Couple practice family planning',
      formName:'familty_planning',
    },
    {
      title:'Household using iodized salt',
      formName:'using_iodized_salt',
    },
    {
      title:'Household using IFR',
      formName:'using_IFR',
    }
  ]



  constructor(
    private _fb:FormBuilder,
    private _brgy:BaranggayService,
    public toast:HotToastService,
    private _FPService:FamilyProfileService
  ){}

  onSubmit():any{
    if(this.familyProfileForm.controls['contact_number'].invalid) return this.toast.warning("Invalid contact number")
    if(this.familyProfileForm.valid){
      this.isSubmitLoading=true
      console.log(
        this.familyProfileForm.controls['using_iodized_salt'].value ?? false,
        this.familyProfileForm.controls['using_IFR'].value ?? false,
        this.familyProfileForm.controls['familty_planning'].value ?? false,
        this.familyProfileForm.controls['mother_pregnant'].value ?? false,
      )
      this.familyProfileForm.patchValue({
        using_iodized_salt:this.familyProfileForm.controls['using_iodized_salt'].value ?? false,
        using_IFR:this.familyProfileForm.controls['using_IFR'].value ?? false,
        familty_planning:this.familyProfileForm.controls['familty_planning'].value ?? false,
        mother_pregnant:this.familyProfileForm.controls['mother_pregnant'].value ?? false,
      })
      if(this.FPDetails){
        this.updateProfileFamily()
      }else{
        this.createFamilyProfile()
      }

    }else{
      console.log(this.familyProfileForm)
      this.isSubmitLoading=false
      this.toast.warning("Please, fill-up all inputs")
    }
  }

  ngOnChanges(){
    if(this.FPDetails){
      this.familyProfileForm.patchValue(this.FPDetails?.attributes)
      this.familyProfileForm.patchValue({
        using_iodized_salt:this.FPDetails?.attributes?.using_iodized_salt ? true : false,
        using_IFR:this.FPDetails?.attributes?.using_IFR ? true : false,
        familty_planning:this.FPDetails?.attributes?.familty_planning ? true : false,
        mother_pregnant:this.FPDetails?.attributes?.mother_pregnant ? true : false,
      })
    }else this.familyProfileForm.reset()
  }

  ngOnInit(): void {
    this.getAllBrgy()
  }

  getAllBrgy(){
    this._brgy.getAllBrg().subscribe({
      next:(res)=>{
        this.baranggay = res?.data?.baranggay
      }
    })
  }

  updateProfileFamily(){
    this._FPService.updateProfileFamily(this.FPDetails?.id,this.familyProfileForm.value).subscribe({
      next:(res:any)=>{
        this.isSubmitLoading=false
        this.triggerSubmmit.emit()
        this.familyProfileForm.reset()
        this.familyProfileForm.patchValue({
          using_iodized_salt:false,
          using_IFR:false,
          familty_planning:false,
          mother_pregnant:false,
        })
        this.toast.success(res?.message || 'Successfully updated')
      },
      error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
        this.isSubmitLoading=false
      }
    })
  }


  createFamilyProfile(){
    this._FPService.createProfileFamilty(this.familyProfileForm.value).subscribe({
      next:(res:any)=>{
        this.isSubmitLoading=false
        this.triggerSubmmit.emit()
        this.familyProfileForm.reset()
        this.familyProfileForm.patchValue({
          using_iodized_salt:false,
          using_IFR:false,
          familty_planning:false,
          mother_pregnant:false,
        })
        this.toast.success(res?.message || 'Successfully added')
      },
      error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
        this.isSubmitLoading=false
      }
    })
  }

}
