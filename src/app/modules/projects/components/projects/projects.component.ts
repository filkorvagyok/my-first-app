import { Component, OnInit } from '@angular/core';
import { ProjectsApiService } from '../../projects-api.service';
import { ProjectsDataHandler } from '../../projects-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { Router } from '@angular/router';
import { Project } from '../../../../shared/classes/project';
import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
	selector: 'my-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})

export class ProjectsComponent implements OnInit{
	constructor(
		private projectsApiService: ProjectsApiService,
		private projectsDataHandler: ProjectsDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		private dialog: MatDialog
	){}

	checked: boolean = false;
	days: number;
	disabled: boolean = true;

	ngOnInit(): void{
		this.projectsDataHandler.isLoading = true;
		this.sharedGetDataHandler.getCompanies();
    	this.sharedGetDataHandler.getContacts();
		this.projectsDataHandler.getProjects();
	}

	showChbox(): void{
		var show = 0;
		this.disabled = false;
		$('input[type=checkbox]').each(function() {
			if ($(this).is(':checked')) {
				++show;
			}
		});
		if ( show > 0 ) {
			this.checked = true;
			if (show > 1) {
				this.disabled = true;
			}
		} else {
			this.checked = false;
		}
	}

	gotoDetail(project: Project): void{
  		this.router.navigate(['/project/shown', project.id]);
  	}

	gotoNew(): void{
		this.router.navigate(["/project/new"]);
	}

	count(project: Project): string{
		let num: number = Math.round((new Date(project.deadline).getTime() - new Date().getTime())/86400000+0.5);
		return num.toString()+' nap';
	}

	clickOnDeleteProductButton(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(result === true)
			{
				let array=this.projectsDataHandler.projects;
				for (var i = 0; i < array.length; i++) {
					if(array[i].selected)
					{
						this.delete(array[i]);
					}
				}
				this.checked = false;
			}
		});
	}

	delete(project: Project): void{
		this.projectsDataHandler.projects = this.projectsDataHandler.projects.filter(h => h !== project);
		this.sharedDeleteDataHandler.deleteProjectFromCompany(project);
		this.sharedDeleteDataHandler.deleteProjectFromContact(project);
		this.projectsApiService.delete(project).subscribe();
	}


	gotoEdit(): void{
  		let selectedProject = this.projectsDataHandler.projects.filter(project => project.selected === true)[0];
  		this.router.navigate(['/project/edit', selectedProject.id]);
  	}

  	addInstant(name: string): void{
  		let project = new Project();
  		this.projectsDataHandler.setDefaultProject(project);
  		project.name = name.trim();
    	if (!name) { return; }
    	this.projectsDataHandler.addProject(project);
  	}
}