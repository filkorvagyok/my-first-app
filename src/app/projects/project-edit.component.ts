import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Project } from '../classes/project';
import { Company } from '../classes/company';
import { ProjectsService } from './projects.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: [ '../styles/edit.component.css' ]
})

export class ProjectEditComponent implements OnInit {
	constructor(
		private projectsService: ProjectsService,
		private sharedService: SharedService,
		private location: Location
	) {}

	@Input() project: Project;
	@Input() edit: boolean;
	companies: Company[];

	ngOnInit(): void{
		this.sharedService.returnCompanies()
			.subscribe(companies => this.companies = companies);
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		let array=this.project.company;
		for (var i = 0; i < array.length; i++) {
			this.addProjectToCompany(array[i]);
		}
      this.projectsService.updateProject(this.project)
        .subscribe(() => this.goBack());
	}

	add(project: Project): void{
		let array=this.project.company;
    	this.projectsService.addProject(project)
			.subscribe(() => {
        		for (var i = 0; i < array.length; i++)
        			this.addProjectToCompany(array[i]);
        		this.goBack();
      });
  	}

  	addProjectToCompany(i: number): void{
  		this.sharedService.addProjectToCompany(i, this.project, this.companies);
  	}
}