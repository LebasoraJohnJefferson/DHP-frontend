import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  anaylitcs = [
    {link:'/admin/analytics',label:'Family profile'},
    {link:'/admin/analytics/infant-analytics',label:'Infant'},
    {link:'/admin/analytics/brgy-preschooler-analytics',label:'baranggay preschooler'}
  ]

  constructor(
    public router:Router
  ){

  }

  navigateTo(value:any) {
    if (value) {
        this.router.navigate([value?.target?.value]);
    }
    return false;
}
}
