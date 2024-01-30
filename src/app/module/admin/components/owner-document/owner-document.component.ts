import { Component } from '@angular/core';
import { PersonnelService } from '../../shared/services/personnel.service';

@Component({
  selector: 'app-owner-document',
  templateUrl: './owner-document.component.html',
  styleUrl: './owner-document.component.scss'
})
export class OwnerDocumentComponent {
  filesOwner:any=[];

  constructor(
    private _pesonnelService:PersonnelService
  ){
    this.getAllPersonnel()
  }

  getAllPersonnel(){
    this._pesonnelService.getAllPersonnel().subscribe({
      next:(res)=>{
        this.filesOwner = res.data
        console.log(this.filesOwner)
      }
    })
  }
}
