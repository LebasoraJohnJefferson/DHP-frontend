import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-nutritional-status-analytics',
  templateUrl: './nutritional-status-analytics.component.html',
  styleUrl: './nutritional-status-analytics.component.scss'
})
export class NutritionalStatusAnalyticsComponent {
  data: any;
  years:any=[];
  selectedYear:number=new Date().getFullYear();
  chartOptions: any;
  info:any;


  constructor(
    private _analyticService:AnalyticsService
  ){

  }


  changeYear(event:any){
    this.selectedYear = event?.target?.value;
    this.getData();
  }


  ngOnInit() {
      this.getData();
      for(let i= new Date().getFullYear() ;i>= 2020; i-- ){
        this.years.push(i);
      }
      

  }


  getData(){
    this._analyticService.PreschoolWithNutritionalStatusAnalytics(this.selectedYear).subscribe({
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
            fill: false,
            data: this.info[0]
        }, {
            type: 'line',
            label: 'Female',
            borderColor: '#F317E6',
            borderWidth: 2,
            fill: false,
            data: this.info[1]
        }, {
            type: 'bar',
            label: 'Underweight',
            backgroundColor: '#66BB6A',
            data: this.info[2],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'Normal Weight',
            backgroundColor: '#4470C8',
            data: this.info[3]
        }, {
          type: 'bar',
          label: 'Overweight',
          backgroundColor: '#FFA726',
          data: this.info[4]
        }, {
        type: 'bar',
        label: 'Obese',
        backgroundColor: '#E02E0E',
        data: this.info[5]
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