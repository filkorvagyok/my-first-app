import { NgModule, APP_INITIALIZER }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { CompaniesComponent }    from './companies.component';
import { CompanyDetailComponent }  from './company-detail.component';
import { CompanyCommonComponent }  from './company-common.component';
import { CompanyEditComponent } from './company-edit.component';

import { CompaniesService } from './companies.service';

import { CompanyRoutingModule } from './companies-routing.module';

import {
  MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCheckboxModule, MatButtonModule,
  MatTableModule, MatRadioModule, MatMenuModule, MatDialogModule,
  MatSelectModule, MatNativeDateModule, MAT_DATE_LOCALE 
} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CompanyRoutingModule,
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
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyCommonComponent,
    CompanyEditComponent
  ],
  providers: [CompaniesService,
    //{provide: APP_INITIALIZER, useFactory: (cs:CompaniesService) => () => cs.getCompanies(), deps:[CompaniesService], multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}]
})
export class CompaniesModule {}