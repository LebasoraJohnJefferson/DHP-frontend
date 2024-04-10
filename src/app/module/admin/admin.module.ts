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
import { InfantAnalyticsComponent } from './pages/infant-analytics/infant-analytics.component';
import { MultiLineChartComponent } from './components/multi-line-chart/multi-line-chart.component';
import { FormsComponent } from './pages/forms/forms.component';
import { InfantComponent } from './components/infant/infant.component';
import { FamilyProfileComponent } from './components/family-profile/family-profile.component';
import { InfantRecordsFormComponent } from './components/infant-records-form/infant-records-form.component';
import { FamilyProfileFormComponent } from './components/family-profile-form/family-profile-form.component';
import { FamilyProfileDetailsComponent } from './pages/family-profile-details/family-profile-details.component';
import { BaranggayPreschoolerComponent } from './components/baranggay-preschooler/baranggay-preschooler.component';
import { PreschoolRecordsFormComponent } from './components/preschool-records-form/preschool-records-form.component';
import { BrgyPreschoolerAnalyticsComponent } from './pages/brgy-preschooler-analytics/brgy-preschooler-analytics.component';
import { PreschoolWithNutritionalStatusFormComponent } from './components/preschool-with-nutritional-status-form/preschool-with-nutritional-status-form.component';
import { ListOfPreschoolerWithNutritionalStatusComponent } from './pages/list-of-preschooler-with-nutritional-status/list-of-preschooler-with-nutritional-status.component';
import { NutritionalStatusAnalyticsComponent } from './pages/nutritional-status-analytics/nutritional-status-analytics.component';
import { AtRiskPreschoolComponent } from './pages/at-risk-preschool/at-risk-preschool.component';
import { AtRiskPreschoolFormComponent } from './components/at-risk-preschool-form/at-risk-preschool-form.component';
import { AtRiskPreschoolAnalyticsComponent } from './pages/at-risk-preschool-analytics/at-risk-preschool-analytics.component';
import { PopulationAgeBracketComponent } from './pages/population-age-bracket/population-age-bracket.component';
import { ListOfResidentComponent } from './pages/list-of-resident/list-of-resident.component';
import { ResidentFormComponent } from './components/resident-form/resident-form.component';
import { ImmunizationComponent } from './pages/immunization/immunization.component';
import { PrenatalComponent } from './pages/prenatal/prenatal.component';
import { NewprenatalComponent } from './pages/newprenatal/newprenatal.component';
import { EditprenatalComponent } from './pages/editprenatal/editprenatal.component';
import { NewimmunizationComponent } from './pages/newimmunization/newimmunization.component';
import { EditimmunizationComponent } from './pages/editimmunization/editimmunization.component';
import { DropdownModule } from 'primeng/dropdown';

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
    BaranggayComponent,
    InfantAnalyticsComponent,
    MultiLineChartComponent,
    FormsComponent,
    InfantComponent,
    FamilyProfileComponent,
    InfantRecordsFormComponent,
    FamilyProfileFormComponent,
    FamilyProfileDetailsComponent,
    BaranggayPreschoolerComponent,
    PreschoolRecordsFormComponent,
    BrgyPreschoolerAnalyticsComponent,
    PreschoolWithNutritionalStatusFormComponent,
    ListOfPreschoolerWithNutritionalStatusComponent,
    NutritionalStatusAnalyticsComponent,
    AtRiskPreschoolComponent,
    AtRiskPreschoolFormComponent,
    AtRiskPreschoolAnalyticsComponent,
    PopulationAgeBracketComponent,
    ListOfResidentComponent,
    ResidentFormComponent,
    ImmunizationComponent,
    PrenatalComponent,
    NewprenatalComponent,
    EditprenatalComponent,
    NewimmunizationComponent,
    EditimmunizationComponent,
  ],
  imports: [
    DropdownModule,
    PrimengModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    TabViewModule
  ],
})
export class AdminModule { }
