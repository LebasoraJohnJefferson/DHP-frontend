import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventsComponent } from './pages/events/events.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AccountComponent } from './pages/account/account.component';
import { PersonnelGuard } from '../../core/shared/guards/personnel.guard';
import { LocationComponent } from './components/location/location.component';
import { CityComponent } from './pages/city/city.component';
import { ProvinceComponent } from './pages/province/province.component';
import { BaranggayComponent } from './pages/baranggay/baranggay.component';
import { FamilyProfileComponent } from './pages/family-profile/family-profile.component';
import { ProfileFamilyDetailsComponent } from './pages/profile-family-details/profile-family-details.component';

const routes: Routes = [
  {path:'',component:LayoutComponent,children:[
    {path:'',component:DashboardComponent},
    {path:'events',component:EventsComponent},
    {path:'documents',component:DocumentsComponent},
    {path:'logs',component:LogsComponent},
    {path:'form',component:LocationComponent,children:[
      {path:'province',component:ProvinceComponent},
      {path:'province/:provinceId',component:CityComponent},
      {path:'province/:provinceId/:cityId',component:BaranggayComponent},
    ]},
    {path:'form/familty-profile',component:FamilyProfileComponent},
    {path:'form/familty-profile/details',component:ProfileFamilyDetailsComponent}
  ],canActivate:[PersonnelGuard]},
  {path:'admin/account',component:AccountComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }
