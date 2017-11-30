import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login-register/login.component';
import { RegisterComponent }   from './login-register/register.component';
import { ResetPasswordComponent }   from './login-register/reset-password.component';

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