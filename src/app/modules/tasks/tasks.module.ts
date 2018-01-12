import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { TasksComponent }    from './components/tasks/tasks.component';
import { TaskDetailComponent }  from './components/task-detail/task-detail.component';
import { TaskCommonComponent }  from './components/task-common/task-common.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

import { TasksApiService } from './tasks-api.service';
import { TasksDataHandler } from './tasks-datahandler.service';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../shared/services/shared-deletedatahandler.service';

import { TaskRoutingModule } from './tasks-routing.module';

import {
  MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule,
  MatButtonModule, MatRadioModule, MatMenuModule, MatDialogModule,
  MatSelectModule
} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskRoutingModule,
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
    TasksComponent,
    TaskDetailComponent,
    TaskCommonComponent,
    TaskEditComponent
  ],
  providers: [TasksApiService, TasksDataHandler, SharedGetDataHandler, SharedDeleteDataHandler]
})
export class TasksModule {}