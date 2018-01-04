import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './shared/services/in-memory-data.service';

import {
  MatToolbarModule, MatSidenavModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCheckboxModule, MatButtonModule,
  MatMenuModule, MatSelectModule, MatNativeDateModule,
  MAT_DATE_LOCALE
} from '@angular/material';
import { DateTimePickerModule } from 'ng-pick-datetime';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { CompaniesModule }            from './modules/companies/companies.module';
import { ProjectsModule }            from './modules/projects/projects.module';
import { ContactsModule }            from './modules/contacts/contacts.module';
import { TasksModule }            from './modules/tasks/tasks.module';

import { AppComponent } from './app.component';
import { LoginComponent }   from './modules/login/components/login.component';
import { RegisterComponent }   from './modules/register/components/register.component';
import { ResetPasswordComponent }   from './modules/reset-password/components/reset-password.component';
import { DeleteDialog }   from './modules/delete-dialog/components/delete-dialog';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    DeleteDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    CompaniesModule,
    ProjectsModule,
    ContactsModule,
    TasksModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateTimePickerModule,
    NKDatetimeModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialog]
})
export class AppModule { }
