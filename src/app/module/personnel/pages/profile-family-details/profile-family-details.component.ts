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
  FPid:any;
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

  childrenForm:FormGroup = this._fb.group(
    {
      FP_id:[''],
      name:['',Validators.required],
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
      this.FPid = value['id'];
      this.getFP()
      this.getAllFPC()
    });
  }


  getFP(){
    this._FP.specificProfileFamilty(this.FPid).subscribe({
      next:(res:any)=>{
        this.FamDetails = res?.data
        console.log(res);
      }
    })
  }

  getAllFPC(){
    this._FPCService.getAllPFC(this.FPid).subscribe((res:any)=>{
      console.log(res)
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
      this.childrenForm.controls['FP_id'].setValue(this.FPid)
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
