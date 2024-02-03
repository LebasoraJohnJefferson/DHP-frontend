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
import { AccountComponent } from './pages/account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FamilyProfileComponent } from './pages/family-profile/family-profile.component';
import { FamilyProfileFormComponent } from './components/family-profile-form/family-profile-form.component';
import { FormsModule } from '@angular/forms';
import { ProfileFamilyDetailsComponent } from './pages/profile-family-details/profile-family-details.component';
import { InfantRecordsComponent } from './pages/infant-records/infant-records.component';
import { InfantRecordsFormComponent } from './components/infant-records-form/infant-records-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    EventsComponent,
    DocumentsComponent,
    AccountComponent,
    FamilyProfileComponent,
    FamilyProfileFormComponent,
    ProfileFamilyDetailsComponent,
    InfantRecordsComponent,
    InfantRecordsFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    PrimengModule,
    CommonModule,
    FormsModule,
    PersonnelRoutingModule
  ]
})
export class PersonnelModule { }
