import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { ProjectsComponent }    from './projects.component';
import { ProjectDetailComponent }  from './project-detail.component';
import { ProjectCommonComponent }  from './project-common.component';
import { ProjectEditComponent } from './project-edit.component';

import { ProjectsService } from './projects.service';

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
  providers: [ProjectsService,
    {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}]
})
export class ProjectsModule {}