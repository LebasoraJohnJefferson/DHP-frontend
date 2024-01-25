import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelRoutingModule } from './personnel-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { PrimengModule } from '../../primeng/primeng.module';
import { EventsComponent } from './pages/events/events.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AccountComponent } from './pages/account/account.component';
import { CityComponent } from './pages/city/city.component';
import { LocationComponent } from './components/location/location.component';
import { ProvinceComponent } from './pages/province/province.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    EventsComponent,
    DocumentsComponent,
    LogsComponent,
    AccountComponent,
    CityComponent,
    LocationComponent,
    ProvinceComponent,
  ],
  imports: [
    ReactiveFormsModule,
    PrimengModule,
    CommonModule,
    PersonnelRoutingModule
  ]
})
export class PersonnelModule { }
