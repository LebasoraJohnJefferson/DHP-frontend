import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinceService } from '../../shared/services/province.service';
import { CityService } from '../../shared/services/city.service';
import { BaranggayService } from '../../shared/services/baranggay.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FamilyProfileService } from '../../shared/services/family-profile.service';
import { ResidentService } from '../../shared/services/resident.service';


@Component({
  selector: 'app-family-profile-form',
  templateUrl: './family-profile-form.component.html',
  styleUrl: './family-profile-form.component.scss'
})
export class FamilyProfileFormComponent implements OnInit {
  isSubmitLoading:boolean =false
  @Input() FPDetails:any={};
  residents:any=[]
  selectedFatherResident:any;
  selectedMotherResident:any;

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


  toiletTypes:string[] = ['Water sealed','Open pit','Others','None']
  typeOfWater:string[]=['Pipe','Well','Spring']
  foodProdActs:string[]=['Vegetable Garden','Poultry/Livestock','Fishpond']


  familyProfileForm:FormGroup = this._fb.group({
    mother_id:['',Validators.required],
    father_id:['',Validators.required],
    contact_number: ['', [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
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
    private _residentService:ResidentService,
    public toast:HotToastService,
    private _FPService:FamilyProfileService
  ){}

  onSubmit():any{
    if(this.familyProfileForm.controls['contact_number'].invalid) return this.toast.warning("Invalid contact number")
    if(this.familyProfileForm.valid){
      this.isSubmitLoading=true
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

  getResidentsWithName(): any[] {
    return this.residents.map((resident:any) => ({
        ...resident,
        name: `${resident.first_name} ${resident.middle_name[0]}. ${resident.last_name}`
    }));
  }

  ngOnChanges(){
    if(this.FPDetails){
      this.familyProfileForm.patchValue(this.FPDetails)
      this.familyProfileForm.patchValue({
        using_iodized_salt:this.FPDetails?.using_iodized_salt ? true : false,
        using_IFR:this.FPDetails?.using_IFR ? true : false,
        familty_planning:this.FPDetails?.familty_planning ? true : false,
        mother_pregnant:this.FPDetails?.mother_pregnant ? true : false,
      })
    }else this.familyProfileForm.reset()
  }

  ngOnInit(): void {
    this.getResident()
  }

  getResident(){
    this._residentService.getResidents().subscribe({
      next:(res)=>{
        this.residents = res?.data
        console.log(this.residents)
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
