import { NgModule, APP_INITIALIZER }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { CompaniesComponent }    from './companies.component';
import { CompanyDetailComponent }  from './company-detail.component';
import { CompanyCommonComponent }  from './company-common.component';
import { CompanyEditComponent } from './company-edit.component';

import { CompaniesService } from './companies.service';
import { SharedService } from '../shared.service';

import { CompanyRoutingModule } from './companies-routing.module';

import {
  MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCheckboxModule, MatButtonModule,
  MatTableModule, MatRadioModule, MatMenuModule, MatDialogModule,
  MatSelectModule
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
    MatProgressSpinnerModule
  ],
  declarations: [
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyCommonComponent,
    CompanyEditComponent
  ],
  providers: [CompaniesService, SharedService]
    //{provide: APP_INITIALIZER, useFactory: (cs:CompaniesService) => () => cs.getCompanies(), deps:[CompaniesService], multi: true},
})
export class CompaniesModule {}