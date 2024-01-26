import { Component, EventEmitter, OnInit,Output } from '@angular/core';
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
  provinces:any=[]
  cities:any=[]
  baranggay:any=[]

  usingIodizedSalt:boolean = false
  usingIFR:boolean = false
  familtyPlanning:boolean = false
  motherPregnant:boolean = false
  @Output() triggerSubmmit:EventEmitter<any> = new EventEmitter()
  otherFileds:any=[
    {
      title:'Household number',
      formName:'household_no',
      type:'string',
      placeholder:'household number.'
    },
    {
      title:'No of household member',
      formName:'no_household_member',
      type:'number',
      placeholder:'No of household number.'
    },
    {
      title:'Contact number',
      formName:'contact_number',
      type:'string',
      placeholder:'contact number e.g 09********.'
    },
    {
      title:'Name of Household head/Spouse',
      formName:'housthould_head',
      type:'text',
      placeholder:'housthould head.'
    },
    {
      title:'Occupation',
      formName:'occupation',
      type:'text',
      placeholder:'occupation.'
    },
    {
      title:'Educational attainment',
      formName:'educ_attain',
      type:'text',
      placeholder:'educational attainment.'
    }
  ]

 

  toiletTypes:string[] = ['WS','OP','O','N']
  typeOfWater:string[]=['P','W','S']
  foodProdActs:string[]=['VG','P/L','FP']


  familyProfileForm:FormGroup = this._fb.group({
    province_id:[''],
    city_id:[''],
    brgy_id:['',Validators.required],
    contact_number: ['', [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
    household_no:['',Validators.required],
    no_household_member:['',Validators.required],
    housthould_head:['',Validators.required],
    occupation:['',Validators.required],
    educ_attain:['',Validators.required],
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
    private _provinceService:ProvinceService,
    private _cityService:CityService,
    private _brgy:BaranggayService,
    public toast:HotToastService,
    private _FPService:FamilyProfileService
  ){}

  onSubmit():any{
    if(this.familyProfileForm.controls['contact_number'].invalid) return this.toast.warning("Invalid contact number")
    if(this.familyProfileForm.valid){
      this.isSubmitLoading=true
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
    }else{
      console.log(this.familyProfileForm)
      this.isSubmitLoading=false
      this.toast.warning("Please, fill-up all inputs")
    }
  }

  ngOnInit(): void {
    this.getAllProvince()
  }

  getAllProvince(){
    this._provinceService.getAllProvince().subscribe({
      next:(res)=>{
        this.provinces = res?.data
      }
    }
    )
  }

  provinceChange(){
    this.familyProfileForm.controls['city_id'].setValue('')
    this.familyProfileForm.controls['brgy_id'].setValue('')
    this._cityService.getAllCity(this.familyProfileForm.controls['province_id'].value).subscribe({
      next:(res)=>{
        this.cities=res?.data
      }
    })
  }

  cityChange(){
    this.familyProfileForm.controls['brgy_id'].setValue('')
    this._brgy.getProvinceAndCity(this.familyProfileForm.controls['city_id'].value).subscribe({
      next:(res)=>{
        this.baranggay = res?.data?.baranggay
      }
    })
  }

}
