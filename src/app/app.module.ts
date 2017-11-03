import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule }    from '@angular/http'
import * as $ from 'jquery';

import {
  MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCheckboxModule, MatButtonModule,
  MatTableModule, MatRadioModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent }   from './login.component';
import { RegisterComponent }   from './register.component';
import { ResetPasswordComponent }   from './reset-password.component';
import { CompaniesComponent }   from './companies.component';
import { ComapniesService } from './companies.service';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    CompaniesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatRadioModule
  ],
  providers: [ComapniesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
