import { Injectable } from '@angular/core';
import { Company } from '../classes/company';
import { Project } from '../classes/project';
import { Contact } from '../classes/contact';
import { Observable } from 'rxjs/Observable';
import { SharedGetDataHandler } from './shared-getdatahandler.service';
import { CompaniesApiService } from '../../modules/companies/companies-api.service';
import { ProjectsApiService } from '../../modules/projects/projects-api.service';
import { ContactsApiService } from '../../modules/contacts/contacts-api.service';


@Injectable()

export class SharedDeleteDataHandler{
	constructor(
		private sharedGetDataHandler: SharedGetDataHandler,
		private companiesApiService: CompaniesApiService,
		private projectsApiService: ProjectsApiService,
		private contactsApiService: ContactsApiService,
	){}

	deleteCompanyFromProject(company: Company): void{
		this.sharedGetDataHandler.projects
			.filter(project => project.company.includes(company.id))
			.forEach(project => {
				project.company.splice(project.company.indexOf(company.id), 1);
				console.log(project);
				this.projectsApiService.updateProject(project).subscribe();
			});
		console.log(this.sharedGetDataHandler.projects);
	}

	deleteCompanyFromContact(company: Company): void{
		this.sharedGetDataHandler.contacts
			.filter(contact => contact.company.includes(company.id))
			.forEach(contact => {
				contact.company.splice(contact.company.indexOf(company.id), 1);
				this.contactsApiService.updateContact(contact).subscribe();
			});
	}

	deleteProjectFromCompany(project: Project): void{
		this.sharedGetDataHandler.companies
			.filter(company => company.project.includes(project.id))
			.forEach(company => {
				company.project.splice(company.project.indexOf(project.id), 1);
				this.companiesApiService.updateCompany(company).subscribe();
			});
	}

	deleteProjectFromContact(project: Project): void{
		this.sharedGetDataHandler.contacts
			.filter(contact => contact.project.includes(project.id))
			.forEach(contact => {
				contact.project.splice(contact.project.indexOf(project.id), 1);
				this.contactsApiService.updateContact(contact).subscribe();
			});
	}

	deleteContactFromCompany(contact: Contact): void{
		this.sharedGetDataHandler.companies
			.filter(compnay => compnay.contact.includes(contact.id))
			.forEach(company => {
				company.contact.splice(company.contact.indexOf(contact.id), 1);
				this.companiesApiService.updateCompany(company).subscribe();
			});
	}

	deleteContactFromProject(contact: Contact): void{
		this.sharedGetDataHandler.projects
			.filter(project => project.accountable.includes(contact.id))
			.forEach(project => {
				project.accountable.splice(project.accountable.indexOf(contact.id), 1);
				this.projectsApiService.updateProject(project).subscribe();
			});
		this.sharedGetDataHandler.projects
			.filter(project => project.owner.includes(contact.id))
			.forEach(project => {
				project.owner.splice(project.owner.indexOf(contact.id), 1);
				this.projectsApiService.updateProject(project).subscribe();
			});
		this.sharedGetDataHandler.projects
			.filter(project => project.observer.includes(contact.id))
			.forEach(project => {
				project.observer.splice(project.observer.indexOf(contact.id), 1);
				this.projectsApiService.updateProject(project).subscribe();
			});
		this.sharedGetDataHandler.projects
			.filter(project => project.participant.includes(contact.id))
			.forEach(project => {
				project.participant.splice(project.participant.indexOf(contact.id), 1);
				this.projectsApiService.updateProject(project).subscribe();
			});
	}
}
