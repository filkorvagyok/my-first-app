import { TaskService } from './task.service';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import * as $ from 'jquery';

import { TasksComponent }    from './tasks.component';
import { TaskDetailComponent }  from './task-detail/task-detail.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskItemComponent } from './task-list/task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';

import { TasksApiService } from '../modules/tasks/tasks-api.service';
import { SharedGetDataHandler } from '../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../shared/services/shared-deletedatahandler.service';

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
    TaskEditComponent,
    TaskListComponent,
    TaskItemComponent
  ],
  providers: [TasksApiService, TaskService, SharedGetDataHandler, SharedDeleteDataHandler]
})
export class TasksModule {}