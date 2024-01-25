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

const routes: Routes = [
  {path:'admin',component:LayoutComponent,children:[
    {path:'',component:DashboardComponent},
    {path:'analytics',component:AnalyticsComponent},
    {path:'events',component:EventsComponent},
    {path:'personnel',component:PersonnelComponent},
    {path:'documents',component:DocumentsComponent},
    {path:'logs',component:LogsComponent},
  ]},
  {path:'admin/personnel/account',component:PersonnelAccountComponent,canActivate:[AdminGuard]},
  {path:'admin/events/info',component:EventComponent,children:[
    {path:'',component:CommentsComponent},
    {path:'invitation',component:InvitationComponent}
  ],canActivate:[AdminGuard]},
  {path:'admin/account',component:AccountComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
