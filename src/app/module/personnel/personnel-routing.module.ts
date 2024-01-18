import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventsComponent } from './pages/events/events.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AccountComponent } from './pages/account/account.component';

const routes: Routes = [
  {path:'',component:LayoutComponent,children:[
    {path:'',component:DashboardComponent},
    {path:'events',component:EventsComponent},
    {path:'documents',component:DocumentsComponent},
    {path:'logs',component:LogsComponent},
  ]},
  {path:'admin/account',component:AccountComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }
