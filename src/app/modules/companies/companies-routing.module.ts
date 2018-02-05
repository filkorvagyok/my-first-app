import { CompanyEditComponent } from './company-edit/company-edit.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { CompaniesComponent }   from './components/companies/companies.component';
import { CompaniesComponent } from './companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
//import { CompanyCommonComponent } from './components/company-common/company-common.component';

const companiesRoutes: Routes = [
  { path: 'company/list', component:CompaniesComponent },
  { path: 'company/shown/:id', component:CompanyDetailComponent },
  { path: 'company/edit/:id', component:CompanyEditComponent },
  { path: 'company/new',  component:CompanyEditComponent },
  { path: 'company/new/:array[]:num',  component:CompanyEditComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(companiesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CompanyRoutingModule { }