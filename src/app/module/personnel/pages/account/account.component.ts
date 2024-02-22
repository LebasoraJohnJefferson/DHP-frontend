import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PersonnelService } from '../../shared/services/personnel.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{
  image:any;
  basicInfo:any;
  updateAccountModal:boolean = false
  moreInformationModal:boolean = false
  information:any= [];

  constructor(
    public location:Location,
    private _personnelService:PersonnelService
  ){}


  ngOnInit(): void {
    this.getPersonnelDetails()
  }

  getPersonnelDetails(){
    this._personnelService.getProfile().subscribe({
      next:(res:any)=>{
        this.basicInfo = res?.data[0]
        this.image = this.basicInfo?.image
        console.log(this.basicInfo)
        this.information = [
          {
            field:'Address',
            data:this.basicInfo?.more_info?.address
          },
          {
            field:'Birth Day',
            data:this.basicInfo?.more_info?.birthday
          },
          {
            field:'Contact Number',
            data:this.basicInfo?.more_info?.contact_number
          },
          {
            field:'Emergency Contact Number',
            data:this.basicInfo?.more_info?.emergency_contact_number
          },
          {
            field:'Emergency Contact`s Relationship',
            data:this.basicInfo?.more_info?.emergency_contact_relationship
          },{
            field:'Gender',
            data:this.basicInfo?.more_info?.gender

          }
        ]
      }
    })
  }


  updateTriggered(){
    this.getPersonnelDetails()
    this.moreInformationModal = false
  }

  getSpecificPersonel(){
    this.updateAccountModal = false
    this.getPersonnelDetails();
  }



  goBack(){
    this.location.back()
  }
}
