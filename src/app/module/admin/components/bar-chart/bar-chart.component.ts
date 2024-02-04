import { ChangeDetectorRef, Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  basicData: any;
  @Input() label:any;
  @Input() data:any;

  basicOptions: any;



  constructor(
    private cdr: ChangeDetectorRef
  ){

  }


  ngOnInit() {
  }
  
  ngOnChanges(){
    this.viewBarChart()
  }


  viewBarChart(){
    const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.basicData = {
          labels: this.label,
          datasets: [
              {
                  data: this.data,
                  backgroundColor: [
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(75, 192, 192, 0.5)', 
                    'rgba(54, 162, 235, 0.5)', 
                    'rgba(153, 102, 255, 0.5)'],
                  borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                  borderWidth: 1
              }
          ]
      };

      this.basicOptions = {
          plugins: {
              
              legend: {
                  display:false,
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
      this.cdr.detectChanges();
  }


}