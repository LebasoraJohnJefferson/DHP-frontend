import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PersonnelService } from '../../shared/services/personnel.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{

  basicInfo:any;
  updateAccountModal:boolean = false
  information:any= [
    // {
    //   'field':'Address',
    //   'data':'tacloban city'
    // },
    // {
    //   'field':'BirthDay',
    //   'data': new Date()
    // },
    // {
    //   'field':'Gender',
    //   'data':'male'
    // },
    // {
    //   'field':'Contact number',
    //   'data':'09772671851'
    // },
    // {
    //   'field':'Emergency Contact',
    //   'data':'09772671851'
    // },
    // {
    //   'field':'Nationality',
    //   'data':'Filipino'
    // },
    // {
    //   'field':'Motto',
    //   'data':'lorem lorem'
    // },
  ];

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
        console.log(this.basicInfo)
      }
    })
  }

  getSpecificPersonel(){
    this.updateAccountModal = false
    this.getPersonnelDetails();
  }



  goBack(){
    this.location.back()
  }
}
