import { Component, OnInit } from '@angular/core';
import { ProjectsApiService } from '../../projects-api.service';
import { ProjectsDataHandler } from '../../projects-datahandler.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { Router } from '@angular/router';
import { Project } from '../../../../shared/classes/project';

@Component({
	selector: 'my-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})

export class ProjectsComponent implements OnInit{
	constructor(
		private projectsApiService: ProjectsApiService,
		private projectsDataHandler: ProjectsDataHandler,
		private sharedService: SharedService,
		private router: Router
	){}

	checked: boolean = false;
	days: number;
	disabled: boolean = true;

	ngOnInit(): void{
		this.sharedService.getContacts();
		this.sharedService.getProjects();
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

	openDeleteDialog(): void{
		let dialogRef = this.sharedService.openDeleteDialog();
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(dialogRef.componentInstance.delete)
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

	delete(project: Project): void {
		this.projectsDataHandler.projects = this.projectsDataHandler.projects.filter(h => h !== project);
		if(project.company.length > 0)
			this.sharedService.deleteProjectFromCompany(project).subscribe();
		if(project.accountable.length > 0)
			this.sharedService.deleteProjectFromContact(project, 0).subscribe();
		if(project.owner.length > 0)
			this.sharedService.deleteProjectFromContact(project, 1).subscribe();
		if(project.observer.length > 0)
			this.sharedService.deleteProjectFromContact(project, 2).subscribe();
		if(project.participant.length > 0)
			this.sharedService.deleteProjectFromContact(project, 3).subscribe();
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