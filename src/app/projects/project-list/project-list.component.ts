import { Project } from './../../shared/classes/project';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SharedDeleteDataHandler } from './../../shared/services/shared-deletedatahandler.service';
import { SharedGetDataHandler } from './../../shared/services/shared-getdatahandler.service';
import { ProjectService } from './../project.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../shared/services/base/base.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent extends BaseComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private projectService: ProjectService,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		protected dialog: MatDialog
  ) {
    super(dialog);
    this.subscription = this.projectService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
		);
   }

  ngOnInit() {
  }

  delete(project: Project | number): void {
		const id = typeof project === 'number' ? project : project.id;
		this.projectService.delete(id);
  }
  
  navigateToEdit(): void{
    this.router.navigate(['/project/edit', this.checkedArray[0]]);
  }

  createNewItem(): void{
    this.router.navigate(["/project/new"]);
  }

  navigateToNewCompany(array: number[]): void{
    this.router.navigate(['/company/new/', {array:array, num:1}]);
  }

  navigateToNewContact(array: number[], rank: number): void{
    this.router.navigate(['/people/new/', {array:array, num:1, rank:rank}]);
  }

  addInstant(name: string): void{
    let project = new Project();
    project.deadline = new Date(project.deadline);
    project.name = name.trim();
    if (!name) { return; }
    project.id = this.projectService.getItems()[this.projectService.getItems().length - 1].id + 1;
    this.projectService.add(project);
  }

  ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
