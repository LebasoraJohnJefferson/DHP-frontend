import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-brgy-preschooler-analytics',
  templateUrl: './brgy-preschooler-analytics.component.html',
  styleUrl: './brgy-preschooler-analytics.component.scss'
})
export class BrgyPreschoolerAnalyticsComponent implements OnInit {
  
  basicData: any;

  multiAxisData: any;

  data:any=[]

  multiAxisOptions: any;

  lineStylesData: any;

  basicOptions: any;
  years:number[]=[];


  year:any = new Date().getFullYear();


  constructor(
    private _analyticService:AnalyticsService
  ){

  }


  ngOnInit() {
    this.getDataByYear()
    for(let i= new Date().getFullYear() ;i>= 2020; i-- ){
      this.years.push(i);
    }
  }


  getDataByYear(){
    this._analyticService.getBrgyPreschoolerAnalytic(this.year).subscribe({
      next:(res:any)=>{
        this.data = res?.data;
        this.viewChart()
      }
    })
  }

  changeYear(event:any){
    this.year = event?.target?.value;
    this.getDataByYear()
  }
  



  viewChart(){
        if(!this.data) return
        this.multiAxisOptions = {
          stacked: false,
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
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      color: '#495057'
                  },
                  grid: {
                      color: '#ebedef'
                  }
              },
              y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  ticks: {
                      color: '#495057'
                  },
                  grid: {
                      drawOnChartArea: false,
                      color: '#ebedef'
                  }
              }
          }
      };

      this.lineStylesData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
        datasets: [
            {
                label: 'Male',
                data: this.data[0],
                fill: false,
                tension: .4,
                borderColor: '#42A5F5'
            },
              {
                label: 'Female',
                data: this.data[1],
                fill: false,
                tension: .4,
                borderColor: '#F317E6'
            },
            {
                label: 'Indigenous child',
                data: this.data[2],
                fill: false,
                borderDash: [5, 5],
                tension: .4,
                borderColor: '#66BB6A'
            },
            {
                label: 'Total Population of Preschooler',
                data: this.data[3],
                fill: true,
                borderColor: '#FFA726',
                tension: .4,
                backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    };
  }


  
}
