import { ProjectItemComponent } from './project-list/project-item/project-item.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectService } from './project.service';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { ProjectsComponent }    from './projects.component';
import { ProjectDetailComponent }  from './project-detail/project-detail.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

import { ProjectsApiService } from './../modules/projects/projects-api.service';
import { SharedGetDataHandler } from '../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../shared/services/shared-deletedatahandler.service';
import { SharedAddDataHandler } from '../shared/services/shared-adddatahandler.service';

import { ProjectRoutingModule } from './projects-routing.module';

import {
  MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule,
  MatButtonModule, MatRadioModule, MatMenuModule, MatDialogModule,
  MatSelectModule, MatNativeDateModule, MAT_DATE_LOCALE 
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    ProjectEditComponent,
    ProjectListComponent,
    ProjectItemComponent
  ],
  providers: [ProjectService, ProjectsApiService, SharedGetDataHandler,
  SharedDeleteDataHandler, SharedAddDataHandler, {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}]
})
export class ProjectsModule {}