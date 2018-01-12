import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent }   from './components/tasks/tasks.component';
import { TaskDetailComponent }   from './components/task-detail/task-detail.component';
import { TaskCommonComponent } from './components/task-common/task-common.component';


const tasksRoutes: Routes = [
  { path: 'task/list', component:TasksComponent },
  { path: 'task/edit/:id', component:TaskCommonComponent },
  { path: 'task/new',  component:TaskCommonComponent },
  { path: 'task/shown/:id', component:TaskDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(tasksRoutes) ],
  exports: [ RouterModule ]
})
export class TaskRoutingModule {}