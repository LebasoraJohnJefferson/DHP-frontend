import { Component, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'app-dougnut-chart',
  templateUrl: './dougnut-chart.component.html',
  styleUrl: './dougnut-chart.component.scss'
})
export class DougnutChartComponent {
  @Input() data: any;
  label:string[] = ['Yes', 'No']
  options: any;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges() {
    this.chartView();
  }

  chartView() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    let backGroundColor: any = ['rgb(145, 218, 35)', 'rgb(87, 9, 194 )'];
    let hoverBackGroundColor: any = ['rgba(145, 218, 35,.8)', 'rgba(187, 195, 176,.8 )'];
    if (this.data) {
      if (this.data[0] == 0 && this.data[1]==0) {
        backGroundColor = ['rgb(187, 195, 176 )'];
        hoverBackGroundColor = ['rgba(187, 195, 176,.8 )'];
        this.data = [1];
        this.label = ['No Data']
      }else{
        this.label = ['Yes', 'No']
      }
    }
    if (!this.data || this.data.length === 0) {
      this.data = [0, 0]; 
    }
   

    // Calculate percentages
    const total = this.data.reduce((acc: number, val: number) => acc + val, 0);
    const percentages = this.data.map((value: number) => ((value / total) * 100).toFixed(2) + '%');

    this.data = {
      labels: this.label,
      datasets: [
        {
          data: this.data,
          backgroundColor: backGroundColor,
          hoverBackgroundColor: hoverBackGroundColor,
        }
      ]
    };

    this.options = {
      cutout: '30%',
      plugins: {
        legend: {
          labels: {
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
