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
		let companies=this.project.company;
		companies.forEach(
			company => this.addProjectToCompany(company, this.project));
		let accountables = this.project.accountable;
		let observers = this.project.observer;
		let owners = this.project.owner;
		let participants = this.project.participant;
		accountables.forEach(
			accountable => this.addProjectToContact(accountable, this.project, 0));
		observers.forEach(
			observer => this.addProjectToContact(observer, this.project, 1));
		owners.forEach(
			owner => this.addProjectToContact(owner, this.project, 2));
		participants.forEach(
			participant => this.addProjectToContact(participant, this.project, 3));
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
		let companies=project.company;
		companies.forEach(
			company => this.addProjectToCompany(company, this.project));
  	}

  	addProjectToCompany(i: number, project: Project): void{
  		this.sharedService.addProjectToCompany(i, project, this.companies);
  	}

  	addToContact(project: Project): void{
		if(project.accountable)
		{
			project.accountable.forEach(
				accountable => this.addProjectToContact(accountable, project, 0))
		}
		if(project.observer)
		{
			project.observer.forEach(
				observer => this.addProjectToContact(observer, project, 1))
		}
		if(project.owner)
		{
			project.owner.forEach(
				owner => this.addProjectToContact(owner, project, 2))
		}
		if(project.participant)
		{
			project.participant.forEach(
				participant => this.addProjectToContact(participant, project, 3))
		}
  	}

  	addProjectToContact(i: number, project: Project, which: number): void{
  		this.sharedService.addProjectToContact(i, project, this.contacts, which);
  	}
}