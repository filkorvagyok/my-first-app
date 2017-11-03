import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as $ from 'jquery';

import {
  MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCheckboxModule, MatButtonModule,
  MatTableModule, MatRadioModule, MatMenuModule, MatDialogModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { LoginComponent }   from './login.component';
import { RegisterComponent }   from './register.component';
import { ResetPasswordComponent }   from './reset-password.component';
import { CompaniesComponent, DeleteDialog }   from './companies.component';
import { CompaniesService } from './companies.service';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    CompaniesComponent,
    DeleteDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatRadioModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [CompaniesService],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialog]
})
export class AppModule { }
