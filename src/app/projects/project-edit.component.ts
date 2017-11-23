import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { ProjectsService } from './projects.service';
import { CompaniesService } from '../companies/companies.service';

import { Project } from '../project';
import { Company } from '../company';

@Component({
  selector: 'project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: [ '../companies/company-edit.component.css' ]
})

export class ProjectEditComponent implements OnInit {
	constructor(
		private companiesService: CompaniesService,
		private projectsService: ProjectsService,
		private location: Location
	) {}

	@Input() project: Project;
	@Input() selectedCompany: Company;
	@Input() edit: boolean;
	projects: Project[];
	companies: Company[];

	ngOnInit(): void{
		this.getProjects();
		this.getCompanies();
	}

	getProjects(): void{
    this.projectsService
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
		let array=this.project.company;
		for (var i = 0; i < array.length; i++) {
			//this.addProjectToCompany(array[i]);
		}
      this.projectsService.updateProject(this.project)
        .subscribe(() => this.goBack());
	}

	add(project: Project): void{
		let array=this.project.company;
    	this.projectsService.addProject(project)
			.subscribe(project => {
        		this.projects.push(project);
        		for (var i = 0; i < array.length; i++)
        			this.addProjectToCompany(array[i]);
        		this.goBack();
      });
  	}

  	addProjectToCompany(i: number): void{
  		this.companies.find(x=>x.id==i).project.push(this.project.id);
  		this.companiesService.updateCompany(this.companies.find(x=>x.id==i)).subscribe(() => console.log('updateCompany'));
  		console.log(this.companies.find(x=>x.id==i));
  	}
}