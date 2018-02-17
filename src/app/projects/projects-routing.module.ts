import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const projectsRoutes: Routes = [
  { path: 'project/list', component:ProjectsComponent },
  { path: 'project/edit/:id', component:ProjectEditComponent },
  { path: 'project/new',  component:ProjectEditComponent },
  { path: 'project/new/:array[]:num:rank',  component:ProjectEditComponent },
  { path: 'project/shown/:id', component:ProjectDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectRoutingModule { }