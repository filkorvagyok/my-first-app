import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { CompaniesService } from './companies.service';

import { Project } from './project';
import { Company } from './company';

@Component({
  selector: 'project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: [ './company-edit.component.css' ]
})

export class ProjectEditComponent implements OnInit {
	constructor(
		private companiesService: CompaniesService,
		private location: Location
	) {}

	@Input() project: Project;
	@Input() edit: boolean;
	projects: Project[];
	companies: Company[];

	ngOnInit(): void{
		this.getProjects();
		this.getCompanies();
	}

	getProjects(): void{
    this.companiesService
        .getProjects()
        .subscribe(projects => this.projects = projects);
	}

	getCompanies(): void{
		this.companiesService
			.getCompanies()
			.subscribe(companies => this.companies = companies);
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
      this.companiesService.updateProject(this.project)
        .subscribe(() => this.goBack());
	}

	add(project: Project): void{
		if(this.projects.length==0)
		{
			project.id = 1;
			console.log('WUT?');
		}
		project.id=this.projects.length+1;
    this.companiesService.addProject(project)
      .subscribe(project => {
        this.projects.push(project);
      });
    this.goBack();
  	}
}