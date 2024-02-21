import { Component} from '@angular/core';
import { InfantService } from '../../shared/services/infant.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-infant',
  templateUrl: './infant.component.html',
  styleUrl: './infant.component.scss'
})
export class InfantComponent {
  data:any=[];
  cols:any;
  selectdata:any;
  createModal:boolean = false

  constructor(
    private _infantService:InfantService,
    public toast:HotToastService
  ){
    this.getAllInfantRecord()
  }



  deleteData(infantId:any){
    const confirmation = confirm('Are you sure, you want to delete this record?')
    if(!confirmation) return
    this._infantService.deleteInfantRecord(infantId).subscribe({
      next:(res:any)=>{
        this.getAllInfantRecord()
        this.toast.success(res?.message || 'successfully deleted')
      },error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }

  getAllInfantRecord(){
    this._infantService.getAllInfantRecords().subscribe({
      next:(res:any)=>{
        this.data = res?.data
        console.log(this.data)
      }
    })
  }


  createInfantRecordCommit(){
    this.getAllInfantRecord()
    this.createModal = false
  }

}
