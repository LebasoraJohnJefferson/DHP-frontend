import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  anaylitcs = [
    {link:'/admin/analytics',label:'Family profile',route:''},
    {link:'/admin/analytics/infant-analytics',label:'Infant',route:'infant-analytics'},
    {link:'/admin/analytics/brgy-preschooler-analytics',label:'baranggay preschooler',route:'brgy-preschooler-analytics'},
    {link:'/admin/analytics/nutritional-status-analytics',label:'preschooler with nutritional status',route:'nutritional-status-analytics'},
    {link:'/admin/analytics/at-risk-preschool-analytics',label:'Affected/at risk preschool',route:'at-risk-preschool-analytics'},
  ]

  currentRoute: any;

  constructor(
    public router:Router,
    private route: ActivatedRoute
  ){

  }

  ngDoCheck(): void{
    this.currentRoute = this.route.snapshot.children[0].routeConfig?.path;
  }

  navigateTo(value:any) {
    if (value) {
        this.router.navigate([value?.target?.value]);
    }
    return false;
}
}
