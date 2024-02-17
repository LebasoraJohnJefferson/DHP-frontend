import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-at-risk-preschool-analytics',
  templateUrl: './at-risk-preschool-analytics.component.html',
  styleUrl: './at-risk-preschool-analytics.component.scss'
})
export class AtRiskPreschoolAnalyticsComponent implements OnInit{

  chartOptions:any;
  info:any=[]
  data:any;
  years:number[]=[]
  selectedYear:any = new Date().getFullYear()


  constructor(private _analyticService:AnalyticsService){}

  ngOnInit() {
    this. getData();
    for(let i= new Date().getFullYear() ;i>= 2020; i-- ){
      this.years.push(i);
    }
  }

  changeYear(event:any){
    this.selectedYear = event?.target?.value;
    this. getData();
  }


  getData(){
    this._analyticService.AtRiskAnalytics(this.selectedYear).subscribe({
      next:(res:any)=>{
        this.info = res?.data
        this.viewChart()
      }
    })
  }

  viewChart(){
    if(!this.info) return
    this.data = {
      labels:  ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      datasets: [{
          type: 'line',
          label: 'Male',
          borderColor: '#42A5F5',
          borderWidth: 2,
          tension: .4,
          fill: true,
          data: this.info[0]
      }, {
          type: 'line',
          label: 'Female',
          borderColor: '#F317E6',
          borderWidth: 2,
          tension: .4,
          fill: true,
          data: this.info[1]
      }]
  };

  this.chartOptions =  {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };
}
}
