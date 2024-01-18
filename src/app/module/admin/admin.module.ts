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

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    DashboardComponent,
    HeaderComponent,
    NotificationComponent
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
