import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  profile: any = [];

  date: Date = new Date();
  timeOfTheDay:string[] = ['Morning','Afternoon','Evening','Night']
  timeOfTheDayIndex:number = 0
  name: string = 'Admin';
  overview:any;

  ngOnInit(): void {
    this.timeOfTheDayIndex = this.checkTime()
  }

  checkTime():number{
    console.log(this.date.getHours())
    if(this.date.getHours() > 5 && this.date.getHours() <= 12) return 0
    if(this.date.getHours() > 12 && this.date.getHours() <= 18) return 1
    if(this.date.getHours() > 18 && this.date.getHours() <= 22) return 2
    else return 3
  }


}
