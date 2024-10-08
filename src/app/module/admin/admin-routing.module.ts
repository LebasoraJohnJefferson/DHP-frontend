import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { EventsComponent } from './pages/events/events.component';
import { PersonnelComponent } from './pages/personnel/personnel.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminGuard } from '../../core/shared/guards/admin.guard';
import { PersonnelAccountComponent } from './pages/personnel-account/personnel-account.component';
import { EventComponent } from './pages/event/event.component';
import { CommentsComponent } from './components/comments/comments.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { FamilyProfileAnalyticsComponent } from './pages/family-profile-analytics/family-profile-analytics.component';
import { OwnerDocumentComponent } from './components/owner-document/owner-document.component';
import { AllDocumentsComponent } from './components/all-documents/all-documents.component';
import { BaranggayComponent } from './pages/baranggay/baranggay.component';
import { InfantAnalyticsComponent } from './pages/infant-analytics/infant-analytics.component';
import { FormsComponent } from './pages/forms/forms.component';
import { InfantComponent } from './components/infant/infant.component';
import { FamilyProfileComponent } from './components/family-profile/family-profile.component';
import { FamilyProfileDetailsComponent } from './pages/family-profile-details/family-profile-details.component';
import { BaranggayPreschoolerComponent } from './components/baranggay-preschooler/baranggay-preschooler.component';
import { BrgyPreschoolerAnalyticsComponent } from './pages/brgy-preschooler-analytics/brgy-preschooler-analytics.component';
import { ListOfPreschoolerWithNutritionalStatusComponent } from './pages/list-of-preschooler-with-nutritional-status/list-of-preschooler-with-nutritional-status.component';
import { NutritionalStatusAnalyticsComponent } from './pages/nutritional-status-analytics/nutritional-status-analytics.component';
import { AtRiskPreschoolComponent } from './pages/at-risk-preschool/at-risk-preschool.component';
import { AtRiskPreschoolAnalyticsComponent } from './pages/at-risk-preschool-analytics/at-risk-preschool-analytics.component';
import { PopulationAgeBracketComponent } from './pages/population-age-bracket/population-age-bracket.component';
import { ListOfResidentComponent } from './pages/list-of-resident/list-of-resident.component';
import { PrenatalComponent } from './pages/prenatal/prenatal.component';
import { ImmunizationComponent } from './pages/immunization/immunization.component';
import { NewprenatalComponent } from './pages/newprenatal/newprenatal.component';
import { EditprenatalComponent } from './pages/editprenatal/editprenatal.component';
import { NewimmunizationComponent } from './pages/newimmunization/newimmunization.component';
import { EditimmunizationComponent } from './pages/editimmunization/editimmunization.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'forms',
        component: FormsComponent,
        children: [
          { path: '', component: FamilyProfileComponent },
          { path: 'infant', component: InfantComponent },
          {
            path: 'baranggay-preschooler',
            component: BaranggayPreschoolerComponent,
          },
          {
            path: 'list-of-preschooler-with-nutritional-status',
            component: ListOfPreschoolerWithNutritionalStatusComponent,
          },
          { path: 'at-risk-preschool', component: AtRiskPreschoolComponent },
          { path: 'prenatal', component: PrenatalComponent },
          { path: 'prenatal/new', component: NewprenatalComponent },
          { path: 'prenatal/edit', component: EditprenatalComponent },
          { path: 'immunization', component: ImmunizationComponent },
          { path: 'immunization/new', component: NewimmunizationComponent },
          { path: 'immunization/edit', component: EditimmunizationComponent },
        ],
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        children: [
          { path: '', component: FamilyProfileAnalyticsComponent },
          { path: 'infant-analytics', component: InfantAnalyticsComponent },
          {
            path: 'brgy-preschooler-analytics',
            component: BrgyPreschoolerAnalyticsComponent,
          },
          {
            path: 'nutritional-status-analytics',
            component: NutritionalStatusAnalyticsComponent,
          },
          {
            path: 'at-risk-preschool-analytics',
            component: AtRiskPreschoolAnalyticsComponent,
          },
        ],
      },
      {
        path: 'population-age-bracket',
        component: PopulationAgeBracketComponent,
      },
      { path: 'events', component: EventsComponent },
      { path: 'personnel', component: PersonnelComponent },
      {
        path: 'documents',
        component: DocumentsComponent,
        children: [
          { path: '', component: OwnerDocumentComponent },
          { path: ':ownerId', component: AllDocumentsComponent },
        ],
      },
      { path: 'logs', component: LogsComponent },
      { path: 'baranggay', component: BaranggayComponent },
      {
        path: 'baranggay/list-of-resident',
        component: ListOfResidentComponent,
      },
      {
        path: 'baranggay/list-of-resident/details',
        component: FamilyProfileDetailsComponent,
      },
    ],
  },
  {
    path: 'admin/personnel/account',
    component: PersonnelAccountComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/events/info',
    component: EventComponent,
    children: [
      { path: '', component: CommentsComponent },
      { path: 'invitation', component: InvitationComponent },
    ],
    canActivate: [AdminGuard],
  },
  { path: 'admin/account', component: AccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
