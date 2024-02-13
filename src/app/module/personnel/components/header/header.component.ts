import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PersonnelService } from '../../shared/services/personnel.service';
import { AuthService } from '../../../../core/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isNavOpen: boolean = false;
  currentRoute: any;
  onScroll: boolean = false;
  user: any = [];
  defaultImg: any = '../../../../../assets/images/nurse.png';

  notifications: any = [];

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

  constructor(
    private _authService:AuthService,
    public route: ActivatedRoute,
    private _personnelService:PersonnelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.listenScrollEvent);
    this.getUser();


    const route = this.route.snapshot.children[0].routeConfig?.path;
    route == '' ? (this.currentRoute = '/admin/') : (this.currentRoute = route);
  }

  goUser(data: any) {
    this.router.navigate(
      [`/${data.route}`],
      { queryParams: { type: data.params } }
    );
  }

  

  getCurrentRouteURL(route: any) {
    route == '' ? (this.currentRoute = '/admin/') : (this.currentRoute = route);

    this.openCloseNavOverlay();
  }


  logout() {
    let confirm = window.confirm("Are you sure you want to logout?")
    if(confirm) this._authService.logout('personnel');
  }

  openCloseNavOverlay() {
    if (this.isNavOpen) {
      this.isNavOpen = false;
      return;
    }

    this.isNavOpen = true;
  }

  listenScrollEvent = () => {
    window.scrollY > 15 ? (this.onScroll = true) : (this.onScroll = false);
  };

  getUser() {
    this._personnelService.getProfile().subscribe({
      next: (res:any) => {
        this.user = res.data[0];
      },
    });
  }
}
