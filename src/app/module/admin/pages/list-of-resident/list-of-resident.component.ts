import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ResidentService } from '../../shared/services/resident.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-list-of-resident',
  templateUrl: './list-of-resident.component.html',
  styleUrl: './list-of-resident.component.scss'
})
export class ListOfResidentComponent implements OnInit{
  barangay:string=''
  brgyId:number = 0;
  data:any;
  cols:any
  selectResident:any;
  createResidentModal:boolean =false;


  constructor(
    private _residentService:ResidentService,
    public route:ActivatedRoute,
    public toast:HotToastService
  ){}


  ngOnInit(): void {
    this.route.queryParams.subscribe((value) => {
      this.brgyId = value['brgyId'];
      this.getAllResident()
    });
  }

  getAllResident(){
    this._residentService.getResident(this.brgyId).subscribe({
      next:(res:any)=>{
        this.barangay = res?.data?.brgyDetails?.baranggay
        this.data = res?.data?.residents
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  deleteResident(residentId:number){
    const confirmation = confirm("Are you sure, you want to delete this resident?")
    if(!confirmation) return
    this._residentService.deleteResident(residentId).subscribe({
      next:(res)=>{
        this.getAllResident()
        this.toast.success(res?.message || 'Resident successfully deleted')
      },
      error:(err)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }


  handleImport(event:Event){

  }

  exportExcel(){

  }


  exportPdf(){

  }




}
