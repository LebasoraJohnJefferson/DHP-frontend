import { Component } from '@angular/core';
import { PreschoolerWithNutritionalStatusService } from '../../shared/services/preschooler-with-nutritional-status.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-list-of-preschooler-with-nutritional-status',
  templateUrl: './list-of-preschooler-with-nutritional-status.component.html',
  styleUrl: './list-of-preschooler-with-nutritional-status.component.scss'
})
export class ListOfPreschoolerWithNutritionalStatusComponent {

  selectdata:any;
  data:any;
  cols:any;
  createModal:any;

  constructor(
    public toast:HotToastService,
    private _PWNSService:PreschoolerWithNutritionalStatusService,
  ){
    this.getAllData();
  }

  deleteData(preschoolerId:any){
    const confirmation = confirm("Are you sure, you want to delete this record?");
    if(!confirmation) return
    this._PWNSService.deletePreschool(preschoolerId).subscribe({
      next:(res:any)=>{
        this.toast.success(res?.message || 'Successfully deleted')
        this.getAllData();
      },error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }


  getAllData(){
    this._PWNSService.getPreschool().subscribe({
      next:(res:any)=>{
        this.data = res?.data
      }
    })
  }


  createInfantRecordCommit(){
    this.getAllData();
    this.createModal = false
  }
}
