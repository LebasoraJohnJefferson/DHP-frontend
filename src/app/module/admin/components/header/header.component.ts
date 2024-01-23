import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';
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
  defaultImg: any = '../../../../../assets/images/admin.png';

  notifications: any = [];

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
      title: 'Logs',
      route: 'logs',
      icon: 'fal fa-pallet',
    }
  ];

  constructor(
    public route: ActivatedRoute,
    private _adminService:AdminService,
    private _authService:AuthService,
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.listenScrollEvent);
    this.getAdmin();

    const route = this.route.snapshot.children[0].routeConfig?.path;
    route == '' ? (this.currentRoute = '/admin/') : (this.currentRoute = route);
  }

  getCurrentRouteURL(route: any) {
    route == '' ? (this.currentRoute = '/admin/') : (this.currentRoute = route);

    this.openCloseNavOverlay();
  }


  logout() {
    let confirm = window.confirm("Are you sure you want to logout?")
    if(confirm) this._authService.logout('admin');
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

  getAdmin() {
    this._adminService.getAdmin().subscribe({
      next: (res:any) => {
        this.user = res.data[0];
      },error:(err:any)=>{
        localStorage.removeItem('token')
        this._authService.logout('admin')
      }
    });
  }
}
