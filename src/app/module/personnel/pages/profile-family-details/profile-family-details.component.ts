import { Component, OnInit } from '@angular/core';
import { FamilyProfileService } from '../../shared/services/family-profile.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamilyProfileMemberService } from '../../shared/services/family-profile-member.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-family-details',
  templateUrl: './profile-family-details.component.html',
  styleUrl: './profile-family-details.component.scss'
})
export class ProfileFamilyDetailsComponent implements OnInit{
  createModal:boolean = false
  detailsModal:boolean = false
  residentId:any;
  pfc:any;
  selectdata:any;
  data:any;
  cols:any;
  isSubmitLoading:boolean = false
  FamDetails:any
  today = new Date();
  nursingTypes:string[]=['EBF','Mixed feeding','Bottle-fed','Others']
  genders:string[]=['male','female']
  relationships:string[] = [
    'Father','Mother','Grandmother','Grandfather',
    'Brother','Sister','Son','Daughter','Aunt','Uncle',
    'Father-in-law','Mother-in-law','Brother-in-law',
    'Sister-in-law','Son-in-law','Daugter-in-law',
    'Nephew','Niece','Great-Grandfather','Great-Grandmother',
    'Great-Grandson','Great-Granddaughter','Friend'
  ]
  occupations:string[]=['employed','unemployed','self-employed']
  constructor(
    private _FP:FamilyProfileService,
    private _route: ActivatedRoute,
    private _fb:FormBuilder,
    private _FPCService:FamilyProfileMemberService,
    public toast:HotToastService,
    public location:Location
  ){
  }

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

  fields = [
    {
      type:'text',
      placeholder:'Enter first name',
      formName:'first_name',
      label:'Member`s first name'
    },
    {
      type:'text',
      placeholder:'Enter middle name',
      formName:'middle_name',
      label:'Member`s middle name'
    },
    {
      type:'text',
      placeholder:'Enter last name',
      formName:'last_name',
      label:'Member`s last name'
    },
    {
      type:'dropdown',
      placeholder:'Enter suffix',
      formName:'suffix',
      label:'Member`s suffix',
      data:this.extension
    },
    {
      type:'date',
      placeholder:'Enter Birthday',
      formName:'birthDay',
      label:'Member`s birthday',
    },
    
  ]

  childrenForm:FormGroup = this._fb.group(
    {
      resident_id:[''],
      first_name:['',Validators.required],
      middle_name:['',Validators.required],
      last_name:['',Validators.required],
      suffix:[''],
      birthDay:['',Validators.required],
      gender:['',Validators.required],
      occupation:['',Validators.required],
      relationship:['',Validators.required],
      is_nursing:[''],
      nursing_type:['']
    },
  )

  calculateAge(birthDay: Date): number {
    const birthDate = new Date(birthDay);
    let age = this.today.getFullYear() - birthDate.getFullYear();
    // Adjust age if the birthday hasn't occurred yet this year
    if (this.today.getMonth() < birthDate.getMonth() || 
        (this.today.getMonth() === birthDate.getMonth() &&
         this.today.getDate() < birthDate.getDate())) {
        age-=1;
    }

    return age;
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((value) => {
      this.residentId = value['residentId'];
      this.getFP()
      this.getAllFPC()
    });
  }


  getFP(){
    this._FP.specificProfileFamilty(this.residentId).subscribe({
      next:(res:any)=>{
        this.FamDetails = res?.data
      }
    })
  }

  getAllFPC(){
    this._FPCService.getAllPFC(this.residentId).subscribe((res:any)=>{
      this.data = res?.data
    })
  }

  deleteData(childId:any){
    const confirmation = confirm('Are you sure, you want to deleted this member?')
    if(!confirmation) return
    this._FPCService.deletePFC(childId).subscribe({
      next:(res:any)=>{
        this.getAllFPC()
        this.toast.success(res?.message || 'Successfully deleted!')
      },error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }

  onSubmit(){
    if(this.childrenForm.valid){
      this.isSubmitLoading =true
      this.childrenForm.controls['resident_id'].setValue(this.residentId)
      this.childrenForm.controls['is_nursing'].setValue(
        this.childrenForm.controls['is_nursing'].value == '' ? false : this.childrenForm.controls['is_nursing'].value)
      this._FPCService.createPFC(this.childrenForm.value).subscribe({
        next:(res:any)=>{
          this.isSubmitLoading =false
          this.childrenForm.reset()
          this.createModal = false
          this.getAllFPC()
          this.toast.success(res?.message || 'Successfully added')
        },error:(err:any)=>{  
          this.toast.error(err?.error?.message || 'an error occurred')
          this.isSubmitLoading =false
        }
      })
    }else{
      this.isSubmitLoading = false
      this.toast.warning("Please, fill-up all inputs")
    }
  }
  
  goBack(){
    this.location.back()
  }

}
