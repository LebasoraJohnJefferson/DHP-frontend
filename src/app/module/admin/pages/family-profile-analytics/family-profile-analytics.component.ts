import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-family-profile-analytics',
  templateUrl: './family-profile-analytics.component.html',
  styleUrl: './family-profile-analytics.component.scss'
})
export class FamilyProfileAnalyticsComponent {

  data:any;
  list_barangays:any=[]
  toiletTypes:string[] = ['Water sealed','Open pit','Others','None']
  typeOfWater:string[]=['Pipe','Well','Spring']
  foodProdActs:string[]=['Vegetable Garden','Poultry/Livestock','Fishpond']
  selectedBarangay:any = null


  constructor(
    private _analytic:AnalyticsService
  ){
    this.getFPAnalytics()
  }


  getFPAnalytics(){
    this._analytic.getFPAnalytics(this.selectedBarangay).subscribe({
      next:(res)=>{
        this.data = res?.data
        if(this.list_barangays.length != res?.data?.list_barangays.length) this.list_barangays = res?.data?.list_barangays
      }
    })
  }

  changeBarangay(event:any){
    this.selectedBarangay = event?.target?.value
    this.getFPAnalytics()
  }


}
