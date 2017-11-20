import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './companies.service';
import { MatDialog } from '@angular/material';
import { DeleteDialog } from './delete-dialog';
import { Router } from '@angular/router';
import { Project } from './project';

@Component({
	selector: 'my-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./companies.component.css']
})

export class ProjectsComponent implements OnInit{
	constructor(
		private companiesService: CompaniesService,
		private router: Router,
		public dialog: MatDialog
	){}

	checked: boolean = false;
	projects: Project[];
	selectedProject: Project;
	days: number;
	disabled: boolean = true;

	greater = true;

	ngOnInit(): void{
		this.getProjects();
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
		this.companiesService
        .getProjects()
        .subscribe(projects => this.projects = projects);
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
		let dialogRef = this.dialog.open(DeleteDialog);
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
	      	}
	      	this.checked = false;
	    });
	}

	delete(project: Project): void {
		this.projects = this.projects.filter(h => h !== project);
    	this.companiesService.deleteProject(project).subscribe();
	}

	gotoEdit(): void{
  		this.selectedProject = this.projects.filter(companie => companie.selected === true)[0];
  		this.router.navigate(['/project/edit', this.selectedProject.id]);
  	}

  	addInstant(name: string): void{
  		name = name.trim();
    	if (!name) { return; }
    	this.companiesService.addProject({ name } as Project)
      		.subscribe(project => {
        this.projects.push(project);
      });
  	}
}