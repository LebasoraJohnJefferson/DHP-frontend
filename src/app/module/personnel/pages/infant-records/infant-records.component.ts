import { Component} from '@angular/core';

@Component({
  selector: 'app-infant-records',
  templateUrl: './infant-records.component.html',
  styleUrl: './infant-records.component.scss'
})
export class InfantRecordsComponent {
  data:any=[];
  cols:any;
  selectdata:any;
  createModal:boolean = false
  
  constructor(){}



  deleteData(infantId:any){

  }


  createInfantRecordCommit(){

  }

}
