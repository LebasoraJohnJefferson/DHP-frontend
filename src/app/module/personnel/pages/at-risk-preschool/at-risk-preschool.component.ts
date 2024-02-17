import { Component } from '@angular/core';
import { AtRiskPreschoolService } from '../../shared/services/atRiskPreschool.service';

@Component({
  selector: 'app-at-risk-preschool',
  templateUrl: './at-risk-preschool.component.html',
  styleUrl: './at-risk-preschool.component.scss'
})
export class AtRiskPreschoolComponent {
  selectdata:any;
  cols:any;
  data:any;
  createModal:boolean = false

  constructor(
    private _preschoolAtRiskService:AtRiskPreschoolService
  ){
    this.getAllPrechoolWithRisk()
  }


  getAllPrechoolWithRisk(){
    this._preschoolAtRiskService.getAllCreatedPreschoolAtRisk().subscribe({
      next:(res:any)=>{
        this.data = res?.data
        console.log(res)
      }
    })
  }



  deleteData(member_id:any){

  }

  registerFamiltyProfileCommit(){

  }
}
