import { Component, OnInit } from '@angular/core';
import { FamilyProfileService } from '../../shared/services/family-profile.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-family-profile',
  templateUrl: './family-profile.component.html',
  styleUrl: './family-profile.component.scss'
})
export class FamilyProfileComponent implements OnInit{
  data:any;
  cols:any;
  selectdata:any;
  createModal:boolean=false;
  FPDetails:any;


  constructor(
    private _FPService:FamilyProfileService,
    private toast:HotToastService
  ){

  }

  ngOnInit(): void {
    this.getAllData()
  }


  getAllData(){
    this._FPService.getAllPF().subscribe({
      next:(res:any)=>{
        this.data = res?.data;
        console.log(res)
      }
    })
  }

  registerFamiltyProfileCommit(){
    this.getAllData()
    this.createModal = false
  }

  deleteData(id:any){
    const confirmation = confirm("Are you sure, you want to delete this Profile?");
    if(!confirmation) return
    this._FPService.deletePF(id).subscribe({
      next:(res:any)=>{
        this.getAllData()
        this.toast.success(res?.message || 'Successfully Deleted!');
      },error:(err)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }


  familyProfileFormBtn(data:any){
    this.createModal = true
    this.FPDetails = data ;
  }




}
