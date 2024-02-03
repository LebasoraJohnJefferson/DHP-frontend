import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventsComponent } from './pages/events/events.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { AccountComponent } from './pages/account/account.component';
import { PersonnelGuard } from '../../core/shared/guards/personnel.guard';
import { FamilyProfileComponent } from './pages/family-profile/family-profile.component';
import { ProfileFamilyDetailsComponent } from './pages/profile-family-details/profile-family-details.component';
import { InfantRecordsComponent } from './pages/infant-records/infant-records.component';

const routes: Routes = [
  {path:'',component:LayoutComponent,children:[
    {path:'',component:DashboardComponent},
    {path:'events',component:EventsComponent},
    {path:'documents',component:DocumentsComponent},
    {path:'form/familty-profile',component:FamilyProfileComponent},
    {path:'form/familty-profile/details',component:ProfileFamilyDetailsComponent},
    {path:'form/infant-records',component:InfantRecordsComponent}
  ],canActivate:[PersonnelGuard]},
  {path:'admin/account',component:AccountComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }
