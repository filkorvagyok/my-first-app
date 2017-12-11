import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Project } from '../classes/project';

@Component({
	selector: 'my-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['../styles/display.component.css']
})

export class ProjectsComponent implements OnInit{
	constructor(
		private projectsService: ProjectsService,
		private sharedService: SharedService,
		private router: Router
	){}

	checked: boolean = false;
	projects: Project[];
	days: number;
	disabled: boolean = true;
	isLoading: boolean = true;

	ngOnInit(): void{
		this.getProjects();
		this.sharedService.getContacts();
		this.sharedService.getProjects();
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

	getProjects(): void{
		this.projectsService
        .getProjects()
        .subscribe(projects => {this.projects = projects, this.isLoading = false});
	}

	gotoDetail(project: Project): void{
  		this.router.navigate(['/project/shown', project.id]);
  	}

	gotoNew(): void{
		this.router.navigate(["/project/new"]);
	}

	count(project: Project): string{
		let num: number = Math.round((new Date(project.deadline).getTime() - new Date().getTime())/86400000+0.5);
		//console.log(num.toString()+' nap');
		/*if(num <= 0)
		{
			console.log(project);
			project.greater = false;
		}
		else
		{
			project.greater = true;
		}*/
		return num.toString()+' nap';
	}

	openDeleteDialog(): void{
		let dialogRef = this.sharedService.openDeleteDialog();
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(dialogRef.componentInstance.delete)
			{
				let array=this.projects;
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
		this.projects = this.projects.filter(h => h !== project);
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
    	this.projectsService.delete(project).subscribe();
	}

	gotoEdit(): void{
  		let selectedProject = this.projects.filter(project => project.selected === true)[0];
  		this.router.navigate(['/project/edit', selectedProject.id]);
  	}

  	addInstant(name: string): void{
  		let project = new Project();
  		this.projectsService.setDefaultProject(project);
  		project.name = name.trim();
    	if (!name) { return; }
    	this.projectsService.addProject(project)
      		.subscribe(project => {
        this.projects.push(project);
      });
  	}
}