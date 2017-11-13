import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login.component';
import { RegisterComponent }   from './register.component';
import { ResetPasswordComponent }   from './reset-password.component';
import { CompaniesComponent }   from './companies.component';
import { CompanyDetailComponent } from './company-detail.component';
import { CompanyEditComponent } from './company-edit.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component:LoginComponent },
	{ path: 'register', component:RegisterComponent },
	{ path: 'password/reset', component:ResetPasswordComponent },
	{ path: 'company/list', component:CompaniesComponent },
	{ path: 'company/shown/:id', component:CompanyDetailComponent },
	{ path: 'company/edit/:id', component:CompanyEditComponent },
	{ path: 'company/new',  component:CompanyEditComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}