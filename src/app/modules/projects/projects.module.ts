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
import { SharedService } from '../../shared/services/shared.service';

import { ProjectRoutingModule } from './projects-routing.module';

import {
  MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCheckboxModule, MatButtonModule,
  MatTableModule, MatRadioModule, MatMenuModule, MatDialogModule,
  MatSelectModule, MatNativeDateModule, MAT_DATE_LOCALE 
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectRoutingModule,
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
    MatDatepickerModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectCommonComponent,
    ProjectEditComponent
  ],
  providers: [ProjectsApiService, ProjectsDataHandler, SharedService,
    {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}]
})
export class ProjectsModule {}