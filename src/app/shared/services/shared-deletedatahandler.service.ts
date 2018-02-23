import { Injectable } from '@angular/core';
import { Company } from '../../companies/company';
import { Project } from '../../projects/project';
import { Contact } from '../../contacts/contact';
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

	/*Megvizsgáljuk, hogy mely projektek company mezőjében található
	meg a paraméterként kapott company id-je és ezekből egyesével
	ki is szedjük ezt az értéket, majd ProjectsApiService segítségével
	update-ljük a projektet.*/
	deleteCompanyFromProject(company: Company | number): void{
		const id = typeof company === 'number' ? company : company.id;
		this.sharedGetDataHandler.projects
			.filter(project => project.company.includes(id))
			.forEach(project => {
				project.company.splice(project.company.indexOf(id), 1);
				this.projectsApiService.update(project).subscribe();
			});
	}

	/*Lásd: deleteCompanyFromProject, csak itt a névjegyek company mezőjét
	vizsgáljuk.*/
	deleteCompanyFromContact(company: Company | number): void{
		const id = typeof company === 'number' ? company : company.id;
		this.sharedGetDataHandler.contacts
			.filter(contact => contact.company.includes(id))
			.forEach(contact => {
				contact.company.splice(contact.company.indexOf(id), 1);
				this.contactsApiService.update(contact).subscribe();
			});
	}


	/*Lásd: deleteCompanyFromProject, csak itt azt vizsgáljuk hogy a projekt id szerepel-e
	a cég project mezőjében.*/
	deleteProjectFromCompany(project: Project | number): void{
		const id = typeof project === 'number' ? project : project.id;
		this.sharedGetDataHandler.companies
			.filter(company => company.project.includes(id))
			.forEach(company => {
				company.project.splice(company.project.indexOf(id), 1);
				this.companiesApiService.update(company).subscribe();
			});
	}

	/*Lásd: deleteCompanyFromProject, csak itt a névjegyek project mezőjét
	vizsgáljuk.*/
	deleteProjectFromContact(project: Project | number): void{
		const id = typeof project === 'number' ? project : project.id;
		this.sharedGetDataHandler.contacts
			.filter(contact => contact.project.includes(id))
			.forEach(contact => {
				contact.project.splice(contact.project.indexOf(id), 1);
				this.contactsApiService.update(contact).subscribe();
			});
	}

	/*Lásd: deleteCompanyFromProject, csak itt azt vizsgáljuk hogy a névjegy id szerepel-e
	a cég contact mezőjében.*/
	deleteContactFromCompany(contact: Contact | number): void{
		const id = typeof contact === 'number' ? contact : contact.id;
		this.sharedGetDataHandler.companies
			.filter(compnay => compnay.contact.includes(id))
			.forEach(company => {
				company.contact.splice(company.contact.indexOf(id), 1);
				this.companiesApiService.update(company).subscribe();
			});
	}

	/*Lásd: deleteContactFromCompany, csak itt a projektek accountable, owner, observer
	és participant mezőit vizsgáljuk.*/
	deleteContactFromProject(contact: Contact | number): void{
		const id = typeof contact === 'number' ? contact : contact.id;
		this.sharedGetDataHandler.projects
			.filter(project => project.accountable.includes(id))
			.forEach(project => {
				project.accountable.splice(project.accountable.indexOf(id), 1);
				this.projectsApiService.update(project).subscribe();
			});
		this.sharedGetDataHandler.projects
			.filter(project => project.owner.includes(id))
			.forEach(project => {
				project.owner.splice(project.owner.indexOf(id), 1);
				this.projectsApiService.update(project).subscribe();
			});
		this.sharedGetDataHandler.projects
			.filter(project => project.observer.includes(id))
			.forEach(project => {
				project.observer.splice(project.observer.indexOf(id), 1);
				this.projectsApiService.update(project).subscribe();
			});
		this.sharedGetDataHandler.projects
			.filter(project => project.participant.includes(id))
			.forEach(project => {
				project.participant.splice(project.participant.indexOf(id), 1);
				this.projectsApiService.update(project).subscribe();
			});
	}
}
