import { NgModule, APP_INITIALIZER }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { CompaniesComponent }    from '../components/companies/companies/companies.component';
import { CompanyDetailComponent }  from '../components/companies/company-detail/company-detail.component';
import { CompanyCommonComponent }  from '../components/companies/company-common/company-common.component';
import { CompanyEditComponent } from '../components/companies/company-edit/company-edit.component';

import { CompaniesService } from '../services/companies.service';
import { SharedService } from '../shared.service';

import { CompanyRoutingModule } from '../routers/companies-routing.module';

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