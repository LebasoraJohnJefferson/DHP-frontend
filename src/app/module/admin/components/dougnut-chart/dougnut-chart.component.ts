import { Component,ChangeDetectorRef,Input } from '@angular/core';

@Component({
  selector: 'app-dougnut-chart',
  templateUrl: './dougnut-chart.component.html',
  styleUrl: './dougnut-chart.component.scss'
})
export class DougnutChartComponent {
  @Input() data: any;
  options: any;

  constructor(
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit() {
    
  }

  ngOnChanges(){
    this.chartView()
  }
  

  chartView() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        let backGroundColor:any = ['rgb(145, 218, 35)', 'rgb(187, 195, 176 )']
        let hoverBackGroundColor:any =  ['rgba(145, 218, 35,.8)', 'rgba(187, 195, 176,.8 )']
        let counter = 0
        if(this.data){
            for(let i=0; i<this.data?.length; i++){
                if(this.data[i]==0){
                    counter+=1
                }
            }
            if(counter == this.data?.length){
                backGroundColor = ["#CDD3C5"]
                hoverBackGroundColor = ["#6F7C5E"]
                this.data = [1]
            }
        }
        this.data = {
            labels: ['Yes','No'],
            datasets: [
                {
                    data: this.data,
                    backgroundColor: backGroundColor ,
                    hoverBackgroundColor:hoverBackGroundColor,
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
                }
            }
        };
        this.cdr.detectChanges();
    }


}
