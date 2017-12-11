import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompaniesComponent }   from '../components/companies/companies/companies.component';
import { CompanyDetailComponent } from '../components/companies/company-detail/company-detail.component';
import { CompanyCommonComponent } from '../components/companies/company-common/company-common.component';

const companiesRoutes: Routes = [
  { path: 'company/list', component:CompaniesComponent },
  { path: 'company/shown/:id', component:CompanyDetailComponent },
  { path: 'company/edit/:id', component:CompanyCommonComponent },
  { path: 'company/new',  component:CompanyCommonComponent }
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