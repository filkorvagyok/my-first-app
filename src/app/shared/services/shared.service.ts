import { Injectable } from '@angular/core';
import { Company } from '../classes/company';
import { Project } from '../classes/project';
import { Contact } from '../classes/contact';
import { CompaniesApiService } from '../../modules/companies/companies-api.service';
import { ProjectsApiService } from '../../modules/projects/projects-api.service';
import { ContactsApiService } from '../../modules/contacts/contacts-api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import { DeleteDialog } from '../../modules/delete-dialog/components/delete-dialog';
import {MatDialog, MatDialogRef} from '@angular/material';

@Injectable()

export class SharedService{

	constructor(
		private companiesApiService: CompaniesApiService,
		private projectsApiService: ProjectsApiService,
		private contactsApiService: ContactsApiService,
		public dialog: MatDialog
		){}

	private projects: Project[];
	private companies: Company[];
	private contacts: Contact[];

	returnCompanies(): Observable<Company[]>{
		return this.companiesApiService.getCompanies();
	}

	returnContacts(): Observable<Contact[]>{
		return this.contactsApiService.getContacts();
	}

	getProjects(): void{
		this.projectsApiService.getProjects()
			.subscribe(projects => this.projects = projects);
	}

	getCompanies(): void{
		this.companiesApiService.getCompanies()
			.subscribe(companies => this.companies = companies);
	}

	getContacts(): void{
		this.contactsApiService.getContacts()
			.subscribe(contacts => this.contacts = contacts);
	}

	getProjectsForCompanyDetail(company: Company): Observable<Project[]>{
		const getProjects: Array<Observable<Project>> = [];
        company.project
        	.forEach(company_project => {
        	this.projects
        		.filter(project => project.id == company_project)
        		.forEach(project => getProjects.push(this.projectsApiService.getProject(project)))
        	});
        return Observable.forkJoin(getProjects);
	}

	getContactsForCompanyDetail(company: Company): Observable<Contact[]>{
		const getContacts: Array<Observable<Contact>> = [];
        company.contact
        	.forEach(company_contact => {
        	this.contacts
        		.filter(contact => contact.id == company_contact)
        		.forEach(contact => getContacts.push(this.contactsApiService.getContact(contact)))
        	});
        return Observable.forkJoin(getContacts);
	}

	getCompaniesForProjectDetail(project: Project): Observable<Company[]>{
		const getCompanies: Array<Observable<Company>> = [];
        project.company
        	.forEach(project_company => {
        	this.companies
        		.filter(company => company.id == project_company)
        		.forEach(company => getCompanies.push(this.companiesApiService.getCompany(company)))
        	});
        return Observable.forkJoin(getCompanies);
	}

	getContactsForProjectDetail(project: Project, which: number): Observable<Contact[]>{
		const getContacts: Array<Observable<Contact>> = [];
		switch (which) {
			case 0:
				project.accountable
		        	.forEach(project_accountable => {
		        	this.contacts
		        		.filter(contact => contact.id == project_accountable)
		        		.forEach(contact => getContacts.push(this.contactsApiService.getContact(contact)))
		        	});
				break;
			case 1:
				project.observer
		        	.forEach(project_observer => {
		        	this.contacts
		        		.filter(contact => contact.id == project_observer)
		        		.forEach(contact => getContacts.push(this.contactsApiService.getContact(contact)))
		        	});
				break;
			case 2:
				project.owner
		        	.forEach(project_owner => {
		        	this.contacts
		        		.filter(contact => contact.id == project_owner)
		        		.forEach(contact => getContacts.push(this.contactsApiService.getContact(contact)))
		        	});
				break;
			case 3:
				project.participant
		        	.forEach(project_participant => {
		        	this.contacts
		        		.filter(contact => contact.id == project_participant)
		        		.forEach(contact => getContacts.push(this.contactsApiService.getContact(contact)))
		        	});
				break;
			default:
				break;
		}
        return Observable.forkJoin(getContacts);
	}

	getProjectsForContactDetail(contact: Contact, which: number): Observable<Project[]>{
		const getProjects: Array<Observable<Project>> = [];
		switch (which) {
			case 0:
				contact.accountable
		        	.forEach(contact_accountable => {
		        	this.projects
		        		.filter(project => project.id == contact_accountable)
		        		.forEach(project => getProjects.push(this.projectsApiService.getProject(project)))
		        	});
				break;
			case 1:
				contact.observer
		        	.forEach(contact_observer => {
		        	this.projects
		        		.filter(project => project.id == contact_observer)
		        		.forEach(project => getProjects.push(this.projectsApiService.getProject(project)))
		        	});
				break;
			case 2:
				contact.owner
		        	.forEach(contact_owner => {
		        	this.projects
		        		.filter(project => project.id == contact_owner)
		        		.forEach(project => getProjects.push(this.projectsApiService.getProject(project)))
		        	});
				break;
			case 3:
				contact.participant
		        	.forEach(contact_participant => {
		        	this.projects
		        		.filter(project => project.id == contact_participant)
		        		.forEach(project => getProjects.push(this.projectsApiService.getProject(project)))
		        	});
				break;
			default:
				break;
		}
        return Observable.forkJoin(getProjects);
	}

	getCompaniesForContactDetail(contact: Contact): Observable<Company[]>{
		const getCompanies: Array<Observable<Company>> = [];
        contact.company
        	.forEach(contact_company => {
        	this.companies
        		.filter(company => company.id == contact_company)
        		.forEach(company => getCompanies.push(this.companiesApiService.getCompany(company)))
        	});
        return Observable.forkJoin(getCompanies);
	}

	deleteProjectFromCompany(project: Project): Observable<Company[]>{
		const deletingProjects: Array<Observable<Company>> = [];
		this.companies
			.filter(company => company.project.includes(project.id))
			.forEach(company => deletingProjects.push(this.deletePFC(project, company)))
		return Observable.forkJoin(deletingProjects);
	}

	deletePFC(project: Project, company: Company): Observable<Company>{
		let index = company.project.indexOf(project.id);
		company.project.splice(index,1);
		return this.companiesApiService.updateCompany(company);
	}

	deleteProjectFromContact(project: Project, which: number): Observable<Contact[]>{
		const deletingProjects: Array<Observable<Contact>> = [];
		switch (which) {
			case 0:
				this.contacts
					.filter(contact => contact.accountable.includes(project.id))
					.forEach(contact => deletingProjects.push(this.deletePFCon(project, contact, 0)))
				break;
			case 1:
				this.contacts
					.filter(contact => contact.owner.includes(project.id))
					.forEach(contact => deletingProjects.push(this.deletePFCon(project, contact, 1)))
				break;
			case 2:
				this.contacts
					.filter(contact => contact.observer.includes(project.id))
					.forEach(contact => deletingProjects.push(this.deletePFCon(project, contact, 2)))
				break;
			case 3:
				this.contacts
					.filter(contact => contact.participant.includes(project.id))
					.forEach(contact => deletingProjects.push(this.deletePFCon(project, contact, 3)))
				break;
			default:
				break;
		}
		return Observable.forkJoin(deletingProjects);
	}

	deletePFCon(project: Project, contact: Contact, which: number): Observable<Contact>{
		let index: number;
		switch (which) {
			case 0:
				index = contact.accountable.indexOf(project.id);
				contact.accountable.splice(index,1);
				break;
			case 1:
				index = contact.owner.indexOf(project.id);
				contact.owner.splice(index,1);
				break;
			case 2:
				index = contact.observer.indexOf(project.id);
				contact.observer.splice(index,1);
				break;
			case 3:
				index = contact.participant.indexOf(project.id);
				contact.participant.splice(index,1);
				break;
			default:
				break;
		}
		
		return this.contactsApiService.updateContact(contact);
	}

	deleteContactFromCompany(contact: Contact): Observable<Company[]>{
		const deletingContacts: Array<Observable<Company>> = [];
				this.companies
					.filter(company => company.contact.includes(contact.id))
					.forEach(company => deletingContacts.push(this.deleteConFCom(contact, company)))
		return Observable.forkJoin(deletingContacts);
	}

	deleteConFCom(contact: Contact, company: Company): Observable<Company>{
		let index = company.contact.indexOf(contact.id);
		company.contact.splice(index,1);
		return this.companiesApiService.updateCompany(company);
	}

	deleteContactFromProject(contact: Contact, which: number): Observable<Project[]>{
		const deletingContacts: Array<Observable<Project>> = [];
		switch (which) {
			case 0:
				this.projects
					.filter(project => project.accountable.includes(contact.id))
					.forEach(project => deletingContacts.push(this.deleteConFP(contact, project, 0)))
				break;
			case 1:
				this.projects
					.filter(project => project.owner.includes(contact.id))
					.forEach(project => deletingContacts.push(this.deleteConFP(contact, project, 1)))
				break;
			case 2:
				this.projects
					.filter(project => project.observer.includes(contact.id))
					.forEach(project => deletingContacts.push(this.deleteConFP(contact, project, 2)))
				break;
			case 3:
				this.projects
					.filter(project => project.participant.includes(contact.id))
					.forEach(project => deletingContacts.push(this.deleteConFP(contact, project, 3)))
				break;
			default:
				break;
		}
		return Observable.forkJoin(deletingContacts);
	}

	deleteConFP(contact: Contact, project: Project, which: number): Observable<Project>{
		let index: number;
		switch (which) {
			case 0:
				index = project.accountable.indexOf(contact.id);
				project.accountable.splice(index,1);
				break;
			case 1:
				index = project.owner.indexOf(contact.id);
				project.owner.splice(index,1);
				break;
			case 2:
				index = project.observer.indexOf(contact.id);
				project.observer.splice(index,1);
				break;
			case 3:
				index = project.participant.indexOf(contact.id);
				project.participant.splice(index,1);
				break;
			default:
				break;
		}
		
		return this.projectsApiService.updateProject(project);
	}

	deleteCompanyFromProject(company: Company): Observable<Project[]>{
		const deletingCompanies: Array<Observable<Project>> = [];
		this.projects
			.filter(project => project.company.includes(company.id))
			.forEach(project => deletingCompanies.push(this.deleteCFP(company, project)));
		return Observable.forkJoin(deletingCompanies);
	}

	deleteCFP(company: Company, project: Project): Observable<Project>{
		let index = project.company.indexOf(company.id);
		project.company.splice(index,1);
		return this.projectsApiService.updateProject(project);
	}

	deleteCompanyFromContact(company: Company): Observable<Contact[]>{
		const deletingCompanies: Array<Observable<Contact>> = [];
		this.contacts
			.filter(contact => contact.company.includes(company.id))
			.forEach(contact => deletingCompanies.push(this.deleteComFCon(company, contact)));
		return Observable.forkJoin(deletingCompanies);
	}

	deleteComFCon(company: Company, contact: Contact): Observable<Contact>{
		let index = contact.company.indexOf(company.id);
		contact.company.splice(index,1);
		return this.contactsApiService.updateContact(contact);
	}

	openDeleteDialog(): MatDialogRef<DeleteDialog>{
		let dialogRef = this.dialog.open(DeleteDialog);
		return dialogRef;
	}

	addProjectToCompany(i: number, project: Project, companies: Company[]): void{
		let company = companies.find(x=>x.id==i);
		if(!(company.project.indexOf(project.id) > -1))
  			company.project.push(project.id);
  		this.companiesApiService.updateCompany(company).subscribe();
  	}

  	addProjectToContact(i: number, project: Project, contacts: Contact[], which: number): void{
  		let contact = contacts.find(x=>x.id==i);
  		console.log(contact);
  		switch (which) {
  			case 0:
  				console.log(which);
  				if(!(contact.accountable.indexOf(project.id) > -1))
  					contact.accountable.push(project.id)
  				break;
  			case 1:
  				console.log(which);
	  			if(!(contact.observer.indexOf(project.id) > -1))
	  				contact.observer.push(project.id)
	  			break;
			case 2:
				console.log(which);
				if(!(contact.owner.indexOf(project.id) > -1))
	  				contact.owner.push(project.id)
	  			break;
			case 3:
				console.log(which);
				if(!(contact.participant.indexOf(project.id) > -1))
	  				contact.participant.push(project.id)
	  			break;
  			default:
  				break;
  		}
  		this.contactsApiService.updateContact(contacts.find(x=>x.id==i)).subscribe();
  	}

  	addContactToCompany(i: number, contact: Contact, companies: Company[]): void{
  		let company = companies.find(x=>x.id==i);
  		if(!(company.contact.indexOf(contact.id) > -1))
  			company.contact.push(contact.id);
  		this.companiesApiService.updateCompany(company).subscribe();
  	}
}