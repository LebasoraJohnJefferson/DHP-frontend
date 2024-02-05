import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';


@Component({
  selector: 'app-infant-analytics',
  templateUrl: './infant-analytics.component.html',
  styleUrl: './infant-analytics.component.scss'
})
export class InfantAnalyticsComponent {
  data:any;

  constructor(
    private _analyticService:AnalyticsService
  ){
    this.getInfantAnalytics()
  }




  getInfantAnalytics(){
    this._analyticService.getInfantAnatics().subscribe({
      next:(res:any)=>{
        this.data = res?.data
      }
    })
  }

}
