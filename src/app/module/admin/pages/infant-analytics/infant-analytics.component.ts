import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';


@Component({
  selector: 'app-infant-analytics',
  templateUrl: './infant-analytics.component.html',
  styleUrl: './infant-analytics.component.scss'
})
export class InfantAnalyticsComponent implements OnInit{
  data:any;
  selectedYear:number = new Date().getFullYear();
  years:number[]=[];
  constructor(
    private _analyticService:AnalyticsService
  ){
    
  }

  ngOnInit(): void {
    this.getInfantAnalytics()
    for(let i= new Date().getFullYear() ;i>= 2020; i-- ){
      this.years.push(i);
    }
    console.log(this.years)
  }

  changeYear(event:any){
    this.selectedYear = event?.target?.value;
    this.getInfantAnalytics()
  }




  getInfantAnalytics(){
    this._analyticService.getInfantAnatics(this.selectedYear).subscribe({
      next:(res:any)=>{
        this.data = res?.data
      }
    })
  }

}
