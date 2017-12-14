import { Injectable } from '@angular/core';
import { Company } from '../classes/company';
import { Project } from '../classes/project';
import { Contact } from '../classes/contact';
import { CompaniesApiService } from '../../modules/companies/companies-api.service';
import { ProjectsApiService } from '../../modules/projects/projects-api.service';
import { ContactsApiService } from '../../modules/contacts/contacts-api.service';

@Injectable()

export class SharedGetDataHandler{
	constructor(
		private companiesApiService: CompaniesApiService,
		private projectsApiService: ProjectsApiService,
		private contactsApiService: ContactsApiService,
	){}
	projects: Project[];
	companies: Company[];
	contacts: Contact[];

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

	/*getProjectsForCompanyDetail(company: Company): Observable<Project[]>{
		const getProjects: Array<Observable<Project>> = [];
        company.project
        	.forEach(company_project => {
        	this.projects
        		.filter(project => project.id == company_project)
        		.forEach(project => getProjects.push(this.projectsApiService.getProject(project)))
        	});
        return Observable.forkJoin(getProjects);
	}*/
	getProjectsForCompanyDetail(company: Company): void{
        company.project.forEach(company_project => {
        	this.projects = this.projects.filter(project => project.id == company_project)
        	console.log(this.projects.filter(project => project.id == company_project))});
	}

	/*getContactsForCompanyDetail(company: Company): Observable<Contact[]>{
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
	}*/
}
