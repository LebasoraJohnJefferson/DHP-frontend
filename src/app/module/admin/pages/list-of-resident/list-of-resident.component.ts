import { Component, OnInit } from '@angular/core';
import { BaranggayService } from '../../shared/services/baranggay.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-list-of-resident',
  templateUrl: './list-of-resident.component.html',
  styleUrl: './list-of-resident.component.scss'
})
export class ListOfResidentComponent implements OnInit{
  baranggay:string=''
  brgyId:number = 0;


  constructor(
    private _brgyService:BaranggayService,
    public route:ActivatedRoute
  ){}


  ngOnInit(): void {
    this.route.queryParams.subscribe((value) => {
      this.brgyId = value['brgyId'];
      this.getAllBrgy()
    });
  }

  getAllBrgy(){
    this._brgyService.getBaranggayResident(this.brgyId).subscribe({
      next:(res:any)=>{

      },error:(err)=>{
        console.log(err)
      }
    })
  }




}
