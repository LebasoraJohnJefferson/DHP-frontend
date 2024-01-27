import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-family-profile-analytics',
  templateUrl: './family-profile-analytics.component.html',
  styleUrl: './family-profile-analytics.component.scss'
})
export class FamilyProfileAnalyticsComponent {

  data:any;

  constructor(
    private _analytic:AnalyticsService
  ){
    this.getFPAnalytics()
  }


  getFPAnalytics(){
    this._analytic.getFPAnalytics().subscribe({
      next:(res)=>{
        this.data = res?.data
        console.log(this.data)
      }
    })
  }


}
