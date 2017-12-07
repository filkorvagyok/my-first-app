import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Project } from '../classes/project';
import { Company } from '../classes/company';
import { Contact } from '../classes/contact';
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
	contacts: Contact[];

	ngOnInit(): void{
		this.sharedService.returnCompanies()
			.subscribe(companies => this.companies = companies);
		this.sharedService.returnContacts()
			.subscribe(contacts => this.contacts = contacts);
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		let array=this.project.company;
		for (var i = 0; i < array.length; i++) {
			this.addProjectToCompany(array[i], this.project);
		}
      this.projectsService.updateProject(this.project)
        .subscribe(() => this.goBack());
	}

	add(project: Project): void{
		this.projectsService.addProject(project)
			.subscribe(() => {
				this.addToCompany(project);
				this.addToContact(project);
				this.goBack();
			});
	}

	addToCompany(project: Project): void{
		let array=project.company;
    	if(array.length > 0)
		{
    		for (var i = 0; i < array.length; i++)
    			this.addProjectToCompany(array[i], project);
		}
  	}

  	addProjectToCompany(i: number, project: Project): void{
  		this.sharedService.addProjectToCompany(i, project, this.companies);
  	}

  	addToContact(project: Project): void{
		if(project.accountable)
			for(var i = 0; i < project.accountable.length; i++)
			{
				this.addProjectToContact(project.accountable[i], project, 0);
			}
		if(project.observer)
			for(var i = 0; i < project.observer.length; i++)
			{
				this.addProjectToContact(project.observer[i], project, 1);
			}
		if(project.owner)
		{
			for(var i = 0; i < project.owner.length; i++)
			{
				this.addProjectToContact(project.owner[i], project, 2);
			}
		}
		if(project.participant)
		{
			for(var i = 0; i < project.participant.length; i++)
			{
				this.addProjectToContact(project.participant[i], project, 3);
			}
		}
  	}

  	addProjectToContact(i: number, project: Project, which: number): void{
  		this.sharedService.addProjectToContact(i, project, this.contacts, which);
  	}
}