import { Injectable } from '@angular/core';
import { Company } from './classes/company';
import { Project } from './classes/project';
import { Contact } from './classes/contact';
import { CompaniesService } from './companies/companies.service';
import { ProjectsService } from './projects/projects.service';
import { ContactsService } from './contacts/contacts.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import { DeleteDialog } from './delete-dialog';
import {MatDialog, MatDialogRef} from '@angular/material';

@Injectable()

export class SharedService{

	constructor(
		private companiesService: CompaniesService,
		private projectsService: ProjectsService,
		private contactsService: ContactsService,
		public dialog: MatDialog
		){}

	private projects: Project[];
	private companies: Company[];
	private contacts: Contact[];

	returnCompanies(): Observable<Company[]>{
		return this.companiesService.getCompanies();
	}

	returnContacts(): Observable<Contact[]>{
		return this.contactsService.getContacts();
	}

	getProjects(): void{
		this.projectsService.getProjects()
			.subscribe(projects => this.projects = projects);
	}

	getCompanies(): void{
		this.companiesService.getCompanies()
			.subscribe(companies => this.companies = companies);
	}

	getContacts(): void{
		this.contactsService.getContacts()
			.subscribe(contacts => this.contacts = contacts);
	}

	getProjectsForCompanyDetail(company: Company): Observable<Project[]>{
		const getProjects: Array<Observable<Project>> = [];
        company.project
        	.forEach(company_project => {
        	this.projects
        		.filter(project => project.id == company_project)
        		.forEach(project => getProjects.push(this.projectsService.getProject(project)))
        	});
        return Observable.forkJoin(getProjects);
	}

	getContactsForCompanyDetail(company: Company): Observable<Contact[]>{
		const getContacts: Array<Observable<Contact>> = [];
        company.contact
        	.forEach(company_contact => {
        	this.contacts
        		.filter(contact => contact.id == company_contact)
        		.forEach(contact => getContacts.push(this.contactsService.getContact(contact)))
        	});
        return Observable.forkJoin(getContacts);
	}

	getCompaniesForProjectDetail(project: Project): Observable<Company[]>{
		const getCompanies: Array<Observable<Company>> = [];
        project.company
        	.forEach(project_company => {
        	this.companies
        		.filter(company => company.id == project_company)
        		.forEach(company => getCompanies.push(this.companiesService.getCompany(company)))
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
		        		.forEach(contact => getContacts.push(this.contactsService.getContact(contact)))
		        	});
				break;
			case 1:
				project.observer
		        	.forEach(project_observer => {
		        	this.contacts
		        		.filter(contact => contact.id == project_observer)
		        		.forEach(contact => getContacts.push(this.contactsService.getContact(contact)))
		        	});
				break;
			case 2:
				project.owner
		        	.forEach(project_owner => {
		        	this.contacts
		        		.filter(contact => contact.id == project_owner)
		        		.forEach(contact => getContacts.push(this.contactsService.getContact(contact)))
		        	});
				break;
			case 3:
				project.participant
		        	.forEach(project_participant => {
		        	this.contacts
		        		.filter(contact => contact.id == project_participant)
		        		.forEach(contact => getContacts.push(this.contactsService.getContact(contact)))
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
		        		.forEach(project => getProjects.push(this.projectsService.getProject(project)))
		        	});
				break;
			case 1:
				contact.observer
		        	.forEach(contact_observer => {
		        	this.projects
		        		.filter(project => project.id == contact_observer)
		        		.forEach(project => getProjects.push(this.projectsService.getProject(project)))
		        	});
				break;
			case 2:
				contact.owner
		        	.forEach(contact_owner => {
		        	this.projects
		        		.filter(project => project.id == contact_owner)
		        		.forEach(project => getProjects.push(this.projectsService.getProject(project)))
		        	});
				break;
			case 3:
				contact.participant
		        	.forEach(contact_participant => {
		        	this.projects
		        		.filter(project => project.id == contact_participant)
		        		.forEach(project => getProjects.push(this.projectsService.getProject(project)))
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
        		.forEach(company => getCompanies.push(this.companiesService.getCompany(company)))
        	});
        return Observable.forkJoin(getCompanies);
	}

	deleteProjectFromCompany(project: Project): Observable<Company[]>{
		console.log("Projekt információ gyűjtés folyamatban...");
		const deletingProjects: Array<Observable<Company>> = [];
				this.companies
					.filter(company => company.project.includes(project.id))
					.forEach(company => deletingProjects.push(this.deletePFC(project, company)))
		return Observable.forkJoin(deletingProjects);
	}

	deletePFC(project: Project, company: Company): Observable<Company>{
		let index = company.project.indexOf(project.id);
		company.project.splice(index,1);
		return this.companiesService.updateCompany(company);
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
		return this.companiesService.updateCompany(company);
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
		return this.projectsService.updateProject(project);
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
		return this.contactsService.updateContact(contact);
	}

	openDeleteDialog(): MatDialogRef<DeleteDialog>{
		let dialogRef = this.dialog.open(DeleteDialog);
		return dialogRef;
	}

	addProjectToCompany(i: number, project: Project, companies: Company[]): void{
		let company = companies.find(x=>x.id==i);
		if(!(company.project.indexOf(project.id) > -1))
  			company.project.push(project.id);
  		this.companiesService.updateCompany(company).subscribe();
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
  		this.contactsService.updateContact(contacts.find(x=>x.id==i)).subscribe();
  	}

  	addContactToCompany(i: number, contact: Contact, companies: Company[]): void{
  		let company = companies.find(x=>x.id==i);
  		if(!(company.contact.indexOf(contact.id) > -1))
  			company.contact.push(contact.id);
  		this.companiesService.updateCompany(company).subscribe();
  	}
}