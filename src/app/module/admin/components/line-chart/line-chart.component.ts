import { Component,OnInit,Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit{
  @Input() data:any;
  @Input() label:any;
  options:any;


  ngOnInit(): void {
    
  }

  constructor(private cdr: ChangeDetectorRef){

  }

  ngOnChanges(){
    this.renderData()
  }


  


  renderData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-primary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.data = {
        labels: this.label,
        datasets: [
            {
                label: 'Population',
                data: this.data,
                fill: true,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                tension: 0.4,
                backgroundColor: 'rgba(131, 251, 4  ,0.3)'
            }
        ]
    };
    
    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
    this.cdr.detectChanges();
  }


}
