import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  currentRoute: any;
  selectedAttribute:string=''
  selectedLabel:string=''
  routesArr: any = [
    {
      title: 'Dashboard',
      route: '/',
      icon: 'fal fa-chart-line',
    },
    {
      title: 'Analytics',
      route: 'analytics',
      icon: 'pi pi-chart-bar',
      name:'analytics',
      attributes:[
        {link:'/admin/analytics',label:'Family profile',route:''},
        {link:'/admin/analytics/infant-analytics',label:'Infant',route:'infant-analytics'},
        {link:'/admin/analytics/brgy-preschooler-analytics',label:'baranggay preschooler',route:'brgy-preschooler-analytics'},
        {link:'/admin/analytics/nutritional-status-analytics',label:'preschooler with nutritional status',route:'nutritional-status-analytics'},
        {link:'/admin/analytics/at-risk-preschool-analytics',label:'Affected/at risk preschool',route:'at-risk-preschool-analytics'},
      ]
    },
    {
      title: 'Personnel',
      route: 'personnel',
      icon: 'fal fa-id-card',
    },
    {
      title: 'Events',
      route: 'events',
      icon: 'fal fa-newspaper',
    },
    {
      title: 'Documents',
      route: 'documents',
      icon: 'fal fa-folder-tree',
    },
    {
      title: 'Baranggay',
      route: 'baranggay',
      icon: 'pi pi-map',
    },
    {
      title: 'Forms',
      route: 'forms',
      icon: 'pi pi-file',
      name:'form',
      attributes:[
        {link:'/admin/forms',label:'Family profile'},
        {link:'/admin/forms/infant',label:'Infant'},
        {link:'/admin/forms/baranggay-preschooler',label:'Baranggay preschooler'},
        {link:'/admin/forms/list-of-preschooler-with-nutritional-status',label:'Preschooler with nutritional status'},
        {link:'/admin/forms/at-risk-preschool',label:'Affected/at risk preschool'}
      ]
    },{
      title: 'Population bracket',
      route: 'population-age-bracket',
      icon: 'pi pi-users',
    },
    {
      title: 'Logs',
      route: 'logs',
      icon: 'fal fa-pallet',
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentRouteURL(this.route.snapshot.children[0].routeConfig?.path);
  }

  goUser(data: any) {
    this.router.navigate(
      [`/admin/${data.route}`],
      { queryParams: { type: data.params } }
    );
  }

  openAttributes(name:string){
    this.selectedAttribute = this.selectedAttribute == name ? '' : name
  }

  assignLabel(labelName:string){
    this.selectedLabel = labelName
  }


  ngDoCheck(): void{
    this.getCurrentRouteURL(this.route.snapshot.children[0].routeConfig?.path);
    this.selectedLabel = this.router.url;
  }

  getCurrentRouteURL(route: any) {
    route == '' ? (this.currentRoute = '/') : (this.currentRoute = route);
  }
}
