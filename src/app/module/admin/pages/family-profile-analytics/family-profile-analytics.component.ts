import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-family-profile-analytics',
  templateUrl: './family-profile-analytics.component.html',
  styleUrl: './family-profile-analytics.component.scss'
})
export class FamilyProfileAnalyticsComponent {

  data:any;

  toiletTypes:string[] = ['WS','OP','O','N']
  typeOfWater:string[]=['P','W','S']
  foodProdActs:string[]=['VG','P/L','FP']



  constructor(
    private _analytic:AnalyticsService
  ){
    this.getFPAnalytics()
  }


  getFPAnalytics(){
    this._analytic.getFPAnalytics().subscribe({
      next:(res)=>{
        this.data = res?.data
        console.log(res)
      }
    })
  }


}
