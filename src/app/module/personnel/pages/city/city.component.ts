import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { CityService } from '../../shared/services/city.service';
import { ActivatedRoute } from '@angular/router';
import { ProvinceService } from '../../shared/services/province.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent implements OnInit{
  cities:any;
  cols:any;
  selectCity:any;
  createAccountModal:boolean = false
  isSubmitLoading:boolean = false
  provinceId:any = ''
  provinceName:any;
  cityForm:FormGroup = this._fb.group({
    province_id:[Validators.required],
    city:['',[Validators.required]]
  })


  constructor(
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _cityService:CityService,
    private _route: ActivatedRoute,
    private _provinceService:ProvinceService
  ){
    
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.provinceId = params.get('provinceId');
    });
    this.getAllCity()
    this.getProvince()
  }


  getAllCity(){
    this._cityService.getAllCity().subscribe({
      next:(res)=>{
        this.cities = res.data
        console.log(this.cities)
      }
    })
  }

  
  getProvince(){
    this._provinceService.getProvince(this.provinceId).subscribe({
      next:(res)=>{
        this.provinceName = res?.data?.attributes?.province
        console.log(res)
      }
    })
  }

  deleteCity(provinceId:number){
    const confimation  = confirm("Are you sure, you want delete this city?")
    if(!confimation) return
    this._cityService.deleteCity(provinceId).subscribe({
      next:(res)=>{
        this.getAllCity()
        this.toast.success(res?.message || "Successfully deleted!")
      },error:(err)=>{
        this.toast.warning(err?.error?.message || 'an error occurred')
      }
    })
  }

  onSubmit():any{
    if(this.cityForm.valid){
      this.isSubmitLoading = true
      this.cityForm.controls['province_id'].setValue(this.provinceId)
      this._cityService.createCity(this.cityForm.value).subscribe({
        next:(res)=>{
            this.getAllCity()
            this.createAccountModal = false
            this.isSubmitLoading = false
            this.cityForm.reset()
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
