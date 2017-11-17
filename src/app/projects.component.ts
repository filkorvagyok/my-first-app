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
	htmlToAdd ='<mat-icon class="fa fa-industry"></mat-icon>';
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

	gotoNew(): void{
		this.router.navigate(["/project/new"]);
	}

	szamol(project: Project): string{
		let num: number = Math.round((new Date(project.deadline).getTime() - new Date().getTime())/86400000+0.5);
		console.log(num.toString()+' nap');
		if(num <= 0)
		{
			this.greater = false;
		}
		return num.toString()+' nap';
	}
}