import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent }   from './tasks.component';
import { TaskDetailComponent }   from './task-detail/task-detail.component';
import { TaskEditComponent } from './task-edit/task-edit.component';


const tasksRoutes: Routes = [
  { path: 'task/list', component:TasksComponent },
  { path: 'task/edit/:id', component:TaskEditComponent },
  { path: 'task/new',  component:TaskEditComponent },
  { path: 'task/shown/:id', component:TaskDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(tasksRoutes) ],
  exports: [ RouterModule ]
})
export class TaskRoutingModule {}