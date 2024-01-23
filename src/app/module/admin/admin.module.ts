import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PrimengModule } from '../../primeng/primeng.module';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { PersonnelComponent } from './pages/personnel/personnel.component';
import { EventsComponent } from './pages/events/events.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AccountComponent } from './pages/account/account.component';
import { PersonnelAccountComponent } from './pages/personnel-account/personnel-account.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    DashboardComponent,
    HeaderComponent,
    NotificationComponent,
    AnalyticsComponent,
    PersonnelComponent,
    EventsComponent,
    DocumentsComponent,
    LogsComponent,
    AccountComponent,
    PersonnelAccountComponent
  ],
  imports: [
    PrimengModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
})
export class AdminModule { }
