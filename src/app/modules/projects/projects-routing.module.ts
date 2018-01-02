import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent }    from './components/projects/projects.component';
import { ProjectDetailComponent }  from './components/project-detail/project-detail.component';
import { ProjectCommonComponent }  from './components/project-common/project-common.component';

const projectsRoutes: Routes = [
  { path: 'project/list', component:ProjectsComponent },
  { path: 'project/edit/:id', component:ProjectCommonComponent },
  { path: 'project/new',  component:ProjectCommonComponent },
  { path: 'project/new/:array[]:num:rank',  component:ProjectCommonComponent },
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