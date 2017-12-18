import { NgModule, APP_INITIALIZER }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { CompaniesComponent }    from './components/companies/companies.component';
import { CompanyDetailComponent }  from './components/company-detail/company-detail.component';
import { CompanyCommonComponent }  from './components/company-common/company-common.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';

import { CompaniesApiService } from './companies-api.service';
import { CompaniesDataHandler } from './companies-datahandler.service';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../shared/services/shared-deletedatahandler.service';

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
  providers: [CompaniesApiService, CompaniesDataHandler, SharedGetDataHandler, SharedDeleteDataHandler]
    //{provide: APP_INITIALIZER, useFactory: (cs:CompaniesService) => () => cs.getCompanies(), deps:[CompaniesService], multi: true},
})
export class CompaniesModule {}