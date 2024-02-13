import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  currentRoute: any;
  isFormOpen:boolean = true
  routesArr: any = [
    {
      title: 'Dashboard',
      route: '/',
      icon: 'fal fa-chart-line',
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
    }
  ];

  formsArr: any = [
    
    {
      title: 'Family Profile',
      route: '/form/family-profile',
      icon: 'fal fa-file-invoice',
    },{
      title: 'Infant Records',
      route: '/form/infant-records',
      icon: 'fal fa-file-invoice',
    },{
      title: 'Baranggay Preschoolers Record',
      route: '/form/preschool-records',
      icon: 'fal fa-file-invoice',
    },{
      title: 'List Of Preschooler (Identified nutritional status)',
      route: '/form/list-of-preschooler-with-nutritional-status',
      icon: 'fal fa-file-invoice',
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentRouteURL(this.route.snapshot.children[0].routeConfig?.path);
  }

  goUser(data: any) {
    this.router.navigate(
      [`/${data.route}`],
      { queryParams: { type: data.params } }
    );
  }


  ngDoCheck(): void{
    this.getCurrentRouteURL(this.route.snapshot.children[0].routeConfig?.path);
  }

  getCurrentRouteURL(route: any) {
    route == '' ? (this.currentRoute = '/') : (this.currentRoute = route);
  }
}
