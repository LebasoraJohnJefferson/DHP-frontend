import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonnelService } from '../../shared/services/personnel.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-personnel-account',
  templateUrl: './personnel-account.component.html',
  styleUrl: './personnel-account.component.scss'
})
export class PersonnelAccountComponent implements OnInit {

  personnelId:number = 0
  checked:any;
  backInfo:any;

  constructor(
    private _route: ActivatedRoute,
    private _personnelService:PersonnelService,
    public location:Location
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
        this.backInfo = res.data
        this.checked = res?.data?.is_active ? true : false
      }
    })
  }

  statusChange(){
    
  }

  goBack(){
    this.location.back()
  }


}
