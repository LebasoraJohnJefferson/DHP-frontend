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
import { PersonnelFormComponent } from './components/personnel-form/personnel-form.component';
import { EventComponent } from './pages/event/event.component';
import {TabViewModule} from 'primeng/tabview';
import { CommentsComponent } from './components/comments/comments.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { FamilyProfileAnalyticsComponent } from './pages/family-profile-analytics/family-profile-analytics.component';
import { DougnutChartComponent } from './components/dougnut-chart/dougnut-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { OwnerDocumentComponent } from './components/owner-document/owner-document.component';
import { AllDocumentsComponent } from './components/all-documents/all-documents.component';
import { BaranggayComponent } from './pages/baranggay/baranggay.component';

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
    PersonnelAccountComponent,
    PersonnelFormComponent,
    EventComponent,
    CommentsComponent,
    InvitationComponent,
    LineChartComponent,
    FamilyProfileAnalyticsComponent,
    DougnutChartComponent,
    BarChartComponent,
    PieChartComponent,
    OwnerDocumentComponent,
    AllDocumentsComponent,
    BaranggayComponent
  ],
  imports: [
    PrimengModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    TabViewModule
  ],
})
export class AdminModule { }
