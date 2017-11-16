import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './companies.service';
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
		private router: Router
	){}

	projects: Project[];
	days: number;

	ngOnInit(): void{
		this.getProjects();
	}

	getProjects(): void{
		this.companiesService
        .getProjects()
        .subscribe(projects => this.projects = projects);
	}

	gotoNew(): void{
		this.router.navigate(["/project/new"]);
	}

}