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
import { PreschoolComponent } from './pages/preschool/preschool.component';
import { PreschoolRecordsFormComponent } from './components/preschool-records-form/preschool-records-form.component';
import { ListOfPreschoolerWithNutritionalStatusComponent } from './pages/list-of-preschooler-with-nutritional-status/list-of-preschooler-with-nutritional-status.component';
import { PreschoolWithNutritionalStatusFormComponent } from './components/preschool-with-nutritional-status-form/preschool-with-nutritional-status-form.component';
import { AtRiskPreschoolComponent } from './pages/at-risk-preschool/at-risk-preschool.component';
import { AtRiskPreschoolFormComponent } from './components/at-risk-preschool-form/at-risk-preschool-form.component';
import { StepsModule } from 'primeng/steps';
import { PersonnelFormComponent } from './components/personnel-form/personnel-form.component';
import { PersonnelMoreInfoFormComponent } from './components/personnel-more-info-form/personnel-more-info-form.component';
import { PrenatalComponent } from './pages/prenatal/prenatal.component';
import { ImmunizationComponent } from './pages/immunization/immunization.component';
import { NewprenatalComponent } from './pages/newprenatal/newprenatal.component';
import { EditprenatalComponent } from './pages/editprenatal/editprenatal.component';
import { NewimmunizationComponent } from './pages/newimmunization/newimmunization.component';
import { EditimmunizationComponent } from './pages/editimmunization/editimmunization.component';
import { BrangayComponent } from './pages/brangay/brangay.component';
import { ListOfResidentComponent } from './pages/list-of-resident/list-of-resident.component';
import { ResidentFormComponent } from './components/resident-form/resident-form.component';
import { DropdownModule } from 'primeng/dropdown';

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
    PreschoolComponent,
    PreschoolRecordsFormComponent,
    ListOfPreschoolerWithNutritionalStatusComponent,
    PreschoolWithNutritionalStatusFormComponent,
    AtRiskPreschoolComponent,
    AtRiskPreschoolFormComponent,
    PersonnelFormComponent,
    PersonnelMoreInfoFormComponent,
    PrenatalComponent,
    ImmunizationComponent,
    NewprenatalComponent,
    EditprenatalComponent,
    NewimmunizationComponent,
    EditimmunizationComponent,
    BrangayComponent,
    ListOfResidentComponent,
    ResidentFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    PrimengModule,
    CommonModule,
    FormsModule,
    PersonnelRoutingModule,
    StepsModule,
    DropdownModule
  ],
})
export class PersonnelModule {}
