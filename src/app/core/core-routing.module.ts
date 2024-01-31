import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {path:'',component:LayoutComponent,children:[
    {path:'login',component:LoginComponent},
    {path:'forgot-password',component:ForgetPasswordComponent},
    {path:'reset-password/:token',component:ResetPasswordComponent},
    // {path:'page-not-found',component:PageNotFoundComponent},
    // {path:'**',redirectTo:"page-not-found"}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
