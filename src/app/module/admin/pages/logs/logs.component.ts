import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { MenuItem } from 'primeng/api';

import { LogsService } from '../../shared/services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  logs: any[] = [];
  userLogs: any = [];
  userId: any;
  isLoading: boolean = false;
  courses: any = [];

  tabItems: MenuItem[] = [];
  activeItem!: MenuItem;

  constructor(private logService: LogsService) {}

  ngOnInit(): void {
    this.getLogs();
    this.getUserLogs();

    this.tabItems = [
      { label: 'System', icon: 'pi pi-fw pi-users' },
      { label: 'User', icon: 'pi pi-fw pi-user' },
    ];

    this.activeItem = this.tabItems[0];
  }

  // getLogEvent() {
  //   this.eventService.getLogEvent().subscribe((response: any) => {
  //     this.getAllLogs();
  //   });
  // }

  logTrack(item: any, index: any) {
    return `${item.id}-${index}`;
  }

  changeTab(tab: any) {
    switch (tab.activeItem.label) {
      case 'System':
        this.activeItem = this.tabItems[0];
        break;

      case 'User':
        this.activeItem = this.tabItems[1];
        break;
    }
  }

  getLogs() {
    this.logService.logs().subscribe(
      (response: any) => {
        this.logs = response.data;
        this.isLoading = false;

      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getUserLogs() {
    this.logService.userLog().subscribe({
      next:(res)=>{
        this.userLogs = res.data
        this.isLoading = false;
      }
    });
  }

  dateFormat(date: any) {
    return moment(date).format('lll');
  }

  getCourse(CourseId: any) {
    let courseTitle = null;

    this.courses.forEach((course: any) => {
      if (course.id == CourseId) {
        courseTitle = course.acronym;
      }
    });

    return courseTitle;
  }
}