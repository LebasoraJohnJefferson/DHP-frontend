import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  @Input() data: any;
  @Input() label: any;
  dataInit:any
  options: any;
  

  constructor(
    private cdr: ChangeDetectorRef
  ){}


  ngOnInit() {
      
  }

  ngOnChanges(){
    this.viewPieChart()
  }


  viewPieChart(){
    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    let dataLength = this.data?.length;
    let counter = 0
    let backGroundColor:any=[documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'),documentStyle.getPropertyValue('--orange-500')]
    let hoverColor:any = [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'),documentStyle.getPropertyValue('--orange-400')]

    if (!this.data || this.data.length === 0) {
      this.data = [0, 0]; 
    }

    if(this.data){
      for(let i =0 ; i<dataLength; i++){
        if(this.data[i] == 0){
          counter +=1
        }
      }
      if(dataLength == counter){
        this.data = [1]
        this.label = ["No data"]
        backGroundColor = ["#CDD3C5"]
        hoverColor = ["#6F7C5E"]
      }
    }

    const total = this.data.reduce((acc: number, val: number) => acc + val, 0);
    const percentages = this.data.map((value: number) => ((value / total) * 100).toFixed(2) + '%');

      this.dataInit = {
          labels: this.label,
          datasets: [
              {
                  data:this.data,
                  backgroundColor: backGroundColor,
                  hoverBackgroundColor: hoverColor
              }
          ]
      };

      this.options = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor
                  }
              },
              tooltip: {
                callbacks: {
                  label: function (context: any) {
                    let label = context.label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += percentages[context.dataIndex];
                    return label;
                  }
                }
              }
          }
        };
        this.cdr.detectChanges();
  }


}