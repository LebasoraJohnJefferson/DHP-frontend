import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonnelService } from '../../shared/services/personnel.service';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-personnel-account',
  templateUrl: './personnel-account.component.html',
  styleUrl: './personnel-account.component.scss'
})
export class PersonnelAccountComponent implements OnInit {
  updateAccountModal:boolean = false
  personnelId:number = 0
  checked:any;
  basicInfo:any;

  constructor(
    private _route: ActivatedRoute,
    private _personnelService:PersonnelService,
    public location:Location,
    public toast:HotToastService
  ){
    
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((value:any) => {
      this.personnelId = value['id'];
      this.getSpecificPersonel()
    });
  }


  getSpecificPersonel(){
    this._personnelService.getSpecificPersonnel(this.personnelId).subscribe({
      next:(res)=>{
        this.basicInfo = res.data
        this.checked = res?.data?.is_active ? true : false
        this.updateAccountModal = false
      }
    })
  }

  statusChange(){
      this._personnelService.changePersonnelStatus(this.personnelId).subscribe({
        next:(res)=>{
          this.getSpecificPersonel()
          this.toast.success(res.message || "Successfully Change")
        },error:(err)=>{
          this.toast.warning(err?.error?.message || "An Error Occurred!")
        }
      })
  }

  goBack(){
    this.location.back()
  }


}
