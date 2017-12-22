import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { ProjectsComponent }    from './components/projects/projects.component';
import { ProjectDetailComponent }  from './components/project-detail/project-detail.component';
import { ProjectCommonComponent }  from './components/project-common/project-common.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';

import { ProjectsApiService } from './projects-api.service';
import { ProjectsDataHandler } from './projects-datahandler.service';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../shared/services/shared-deletedatahandler.service';
import { SharedAddDataHandler } from '../../shared/services/shared-adddatahandler.service';

import { ProjectRoutingModule } from './projects-routing.module';

import {
  MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule,
  MatButtonModule, MatRadioModule, MatMenuModule, MatDialogModule,
  MatSelectModule, MatNativeDateModule, MAT_DATE_LOCALE 
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    NKDatetimeModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectCommonComponent,
    ProjectEditComponent
  ],
  providers: [ProjectsApiService, ProjectsDataHandler, SharedGetDataHandler,
  SharedDeleteDataHandler, SharedAddDataHandler, {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}]
})
export class ProjectsModule {}