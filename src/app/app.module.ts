import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as $ from 'jquery';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './in-memory-data.service';

import {
  MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCheckboxModule, MatButtonModule,
  MatTableModule, MatRadioModule, MatMenuModule, MatDialogModule,
  MatSelectModule, MatNativeDateModule, MAT_DATE_LOCALE 
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateTimePickerModule } from 'ng-pick-datetime';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent }   from './login.component';
import { RegisterComponent }   from './register.component';
import { ResetPasswordComponent }   from './reset-password.component';
import { CompaniesComponent}   from './companies.component';
import { DeleteDialog }   from './delete-dialog';
import { CompaniesService } from './companies.service';
import { CompanyDetailComponent } from './company-detail.component';
import { CompanyEditComponent } from './company-edit.component';
import { CompanyCommonComponent }        from './company-common.component';
import { ProjectsComponent } from './projects.component';
import { ProjectCommonComponent } from './project-common.component';
import { ProjectEditComponent } from './project-edit.component';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    CompaniesComponent,
    DeleteDialog,
    CompanyDetailComponent,
    CompanyEditComponent,
    CompanyCommonComponent,
    ProjectsComponent,
    ProjectCommonComponent,
    ProjectEditComponent
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateTimePickerModule 
  ],
  providers: [CompaniesService,
    {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialog]
})
export class AppModule { }
