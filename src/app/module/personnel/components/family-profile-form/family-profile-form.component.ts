import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinceService } from '../../shared/services/province.service';
import { CityService } from '../../shared/services/city.service';
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
  @Input() FPDetails:any
  baranggay:any=[]

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
      title:'Father name',
      formName:'father',
      type:'text',
      placeholder:'Enter Father`s name.'
    },
    {
      title:'Father`s birthday',
      formName:'father_birthday',
      type:'date',
    },
    {
      title:'Mother name',
      formName:'mother',
      type:'text',
      placeholder:'Enter mother`s name.'
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
    mother:['',Validators.required],
    father:['',Validators.required],
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
    using_iodized_salt:[false,Validators.required],
    using_IFR:[false,Validators.required],
    familty_planning:[false,Validators.required],
    mother_pregnant:[false,Validators.required],
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
