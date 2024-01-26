import { Component, OnInit } from '@angular/core';
import { BaranggayService } from '../../shared/services/baranggay.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-baranggay',
  templateUrl: './baranggay.component.html',
  styleUrl: './baranggay.component.scss'
})


export class BaranggayComponent implements OnInit {
  cityId:any
  province:any;
  city:any;
  selectBrgy:any;
  cols:any;
  isSubmitLoading:boolean =false
  createBrgyModal:boolean=false;
  baranggay:any=[]

  brgyForm:FormGroup = this._fb.group({
    city_id:[Validators.required],
    purok:['',[Validators.required]],
    baranggay:['',[Validators.required]]
  })


  constructor(
    private _bgyService:BaranggayService,
    private _route: ActivatedRoute,
    private _fb:FormBuilder,
    public toast:HotToastService
  ){

  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.cityId = params.get('cityId');
      this.brgyForm.controls['city_id'].setValue(this.cityId)
    });
    this.getBrgyDetails()
  }

  getBrgyDetails(){
    this._bgyService.getProvinceAndCity(this.cityId).subscribe({
      next:(res)=>{
        this.city = res?.data?.city
        this.province = res?.data?.province
        this.baranggay = res?.data?.baranggay
      }
    })
  }

  deleteBaranggay(brgyId:any){
    const confirmation = confirm("Are you sure, you want to delete this baraggay details?")
    if(!confirmation) return 
    this._bgyService.deleteBrgy(brgyId).subscribe({
      next:()=>{
        this.toast.success("Successfully deleted!")
        this.getBrgyDetails()
      },error:(err)=>{
        this.toast.error(err?.error?.message || 'An error occurred')
      }
    })
  }

  onSubmit(){
    this.isSubmitLoading = true
    if(this.brgyForm.valid){
      this._bgyService.createBrgy(this.brgyForm.value).subscribe({
        next:(res)=>{
          this.toast.success(res?.message || 'Successfully added')
          this.brgyForm.reset()
          this.getBrgyDetails()
          this.createBrgyModal = false
          this.isSubmitLoading =false
        },error:(err)=>{
          this.toast.warning(err?.error?.message || 'An error occurred')
          this.isSubmitLoading =false
        }
      })
    }else{
      this.isSubmitLoading =false
      this.toast.warning("Pls, fill-up all inputs")
    }
  }

  


}
