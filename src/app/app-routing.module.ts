import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './modules/login/components/login.component';
import { RegisterComponent }   from './modules/register/components/register.component';
import { ResetPasswordComponent }   from './modules/reset-password/components/reset-password.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component:LoginComponent },
	{ path: 'register', component:RegisterComponent },
	{ path: 'password/reset', component:ResetPasswordComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}