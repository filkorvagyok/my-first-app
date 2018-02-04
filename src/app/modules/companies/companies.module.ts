import { CompanyService } from './company.service';
import { NgModule, APP_INITIALIZER }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import * as $ from 'jquery';

//import { CompaniesComponent }    from './components/companies/companies.component';
import { CompaniesComponent } from './companies.component';
import { CompanyDetailComponent }  from './components/company-detail/company-detail.component';
//import { CompanyCommonComponent }  from './components/company-common/company-common.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';

import { CompaniesApiService } from './companies-api.service';
import { CompaniesDataHandler } from './companies-datahandler.service';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../shared/services/shared-deletedatahandler.service';

import { CompanyRoutingModule } from './companies-routing.module';

import {
  MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule,
  MatButtonModule, MatRadioModule, MatMenuModule, MatDialogModule,
  MatSelectModule
} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyItemComponent } from './company-list/company-item/company-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    CompaniesComponent,
    CompanyDetailComponent,
    //CompanyCommonComponent,
    CompanyEditComponent,
    CompanyListComponent,
    CompanyItemComponent
  ],
  providers: [CompaniesApiService, CompaniesDataHandler, SharedGetDataHandler, SharedDeleteDataHandler, CompanyService]
    //{provide: APP_INITIALIZER, useFactory: (cs:CompaniesService) => () => cs.getCompanies(), deps:[CompaniesService], multi: true},
})
export class CompaniesModule {}