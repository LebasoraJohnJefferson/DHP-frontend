import { Component, OnInit,Input,ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-multi-line-chart',
  templateUrl: './multi-line-chart.component.html',
  styleUrl: './multi-line-chart.component.scss'
})
export class MultiLineChartComponent implements OnInit{
  @Input() data:any;

  multiAxisData: any;

  multiAxisOptions: any;

  lineStylesData: any;

  basicOptions: any;


  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}



  
  ngOnChanges(){
    this.renderMultipleLine()
  }

  renderMultipleLine(){
  if(this.data){
    this.multiAxisData = {
      labels: ['0 month', '1 month', 
               '2 month','3 month',
               '4 month','5 month',
               '6 month','7 month',
               '8 month','9 month',
               '10 month','11 month',
               '12 month','13 month',
               '14 month','15 month',
               '16 month','17 month',
               '18 month','19 month',
               '20 month','21 month',
               '22 month','23 month',
              ],
      datasets: [{
          label: 'Severely underweight',
          fill: false,
          borderColor: '#EC4C15',
          yAxisID: 'y',
          tension: .4,
          data: this.data[0]
      }, {
          label: 'UnderWeight',
          fill: false,
          borderColor: '#EAF10D',
          yAxisID: 'y1',
          tension: .4,
          data: this.data[1]
      },{
          label: 'Normal weight',
          fill: false,
          borderColor: '#8FEC15',
          yAxisID: 'y1',
          tension: .4,
          data: this.data[2]
      },{
        label: 'Over weight',
        fill: false,
        borderColor: '#130DF1',
        yAxisID: 'y1',
        tension: .4,
        data: this.data[3]
    }
    ]
  };
  }

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
              display: false,
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
              position: 'left',
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
  this.cdr.detectChanges();
  }
}
