import { Component } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ProvinceService } from '../../shared/services/province.service';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrl: './province.component.scss'
})
export class ProvinceComponent {
  selectProvince:any;
  cols:any;
  createAccountModal:boolean = false
  isSubmitLoading:boolean = false
  provinces:any=[]
  provinceForm:FormGroup = this._fb.group({
    province:['',[Validators.required]]
  })

  constructor(
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _provinceService:ProvinceService
  ){
    this.getAllProvince()
  }

  getAllProvince(){
    this._provinceService.getAllProvince().subscribe({
      next:(res)=>{
        this.provinces = res.data
      }
    })
  }


  deleteProvince(provinceId:number){
    const confirmation = confirm("Are you sure, you want to delete this province?")
    if(!confirmation) return
    this._provinceService.deleteProvince(provinceId).subscribe({
      next:(res)=>{
        this.getAllProvince()
        this.toast.success(res?.message || "Successfully deleted!")
      },error:(err)=>{
        this.toast.warning(err?.error?.message || 'an error occurred')
      }
    })
  }

  onSubmit():any{
    if(this.provinceForm.valid){
      this.isSubmitLoading = true
      this._provinceService.createProvince(this.provinceForm.value).subscribe({
        next:(res)=>{
            this.getAllProvince()
            this.createAccountModal = false
            this.isSubmitLoading = false
            this.provinceForm.reset()
            this.toast.success(res?.message || 'Successfully added')
          },
          error:(err)=>{
            this.isSubmitLoading = false
            this.toast.warning(err?.error?.message || 'An error occurred')
          }
        })
      }else{
        this.toast.warning("Empty Inputs!")
      }
    }
}
