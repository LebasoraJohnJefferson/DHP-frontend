import { Component } from '@angular/core';
import { PreschoolService } from '../../shared/services/preschool.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-baranggay-preschooler',
  templateUrl: './baranggay-preschooler.component.html',
  styleUrl: './baranggay-preschooler.component.scss'
})
export class BaranggayPreschoolerComponent {
  createModal:boolean = false
  data:any;
  cols:any;
  selectdata:any;

  constructor(
    private _preschoolService:PreschoolService,
    public toast:HotToastService
  ){
    this.getAllPreschool()
  }

  deleteData(preschoolId:number){
    const confirmation = confirm("Are you sure, you want to delete this record?")
    if(!confirmation) return
    this._preschoolService.deleteBrgyPreschoollerRecord(preschoolId).subscribe({
      next:(res:any)=>{
        this.getAllPreschool()
        this.toast.success(res?.message || 'Successfully Deleted')
      },error:(err)=>{
        this.toast.warning(err?.error?.message || 'An error occurred!')
      }
    })
  }


  getAllPreschool(){
    this._preschoolService.getAllRegistedPreschool().subscribe({
      next:(res:any)=>{
        this.data = res?.data
      }
    })
  }

  triggerSubmit(){
    this.createModal = false
    this.getAllPreschool()
  }


}

