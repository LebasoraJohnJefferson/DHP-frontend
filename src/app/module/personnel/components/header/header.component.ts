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
    },
    {
      title: 'Logs',
      route: 'logs',
      icon: 'fal fa-pallet',
    }
  ];

  constructor(
    private _authService:AuthService,
    public route: ActivatedRoute,
    private _personnelService:PersonnelService
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.listenScrollEvent);
    this.getUser();


    const route = this.route.snapshot.children[0].routeConfig?.path;
    route == '' ? (this.currentRoute = '/admin/') : (this.currentRoute = route);
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
