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

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'forms', component: FormsComponent,children:[
        {path:'',component:FamilyProfileComponent},
        {path:'infant',component:InfantComponent},
        {path:'baranggay-preschooler',component:BaranggayPreschoolerComponent},
        
      ]},
      {path:'forms/family-profile/details',component:FamilyProfileDetailsComponent},
      {
        path: 'analytics',
        component: AnalyticsComponent,
        children: [
            { path: '', component: FamilyProfileAnalyticsComponent },
            { path: 'infant-analytics', component: InfantAnalyticsComponent }
          ],
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
