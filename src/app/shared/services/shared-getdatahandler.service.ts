import { Injectable } from '@angular/core';
import { Company } from '../classes/company';
import { Project } from '../classes/project';
import { Contact } from '../classes/contact';
import { CompaniesApiService } from '../../modules/companies/companies-api.service';
import { ProjectsApiService } from '../../modules/projects/projects-api.service';
import { ContactsApiService } from '../../modules/contacts/contacts-api.service';

class ProjectForContact{
	project: Project;
	ranks: string[] = [];
}

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
	accountables: Contact[];
	owners: Contact[];
	observers: Contact[];
	participants: Contact[];
	projectsForContact: ProjectForContact[] = [];
	isLoading: number = 0;

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
		let projectsforcomp: Project[] = [];
        company.project.forEach(company_project => {
        	projectsforcomp.push(this.projects.find(project => project.id == company_project));
        });
        this.projects = projectsforcomp;
        this.isLoading += 1;
	}

	getContactsForCompanyDetail(company: Company): void{
		let contactsforcomp: Contact[] = [];
		company.contact.forEach(company_contact => {
			contactsforcomp.push(this.contacts.find(contact => contact.id == company_contact));
		});
		this.contacts = contactsforcomp;
		this.isLoading += 1;
	}

	getCompaniesForProjectDetail(project: Project): void{
		let comforproj: Company[] = [];
		project.company.forEach(project_company =>{
			comforproj.push(this.companies.find(company => company.id == project_company));
		});
		this.companies = comforproj;
		this.isLoading += 1
	}

	getContactsForProjectDetail(project: Project): void{
		let acc: Contact[] = [];
		let ow: Contact[] = [];
		let ob: Contact[] = [];
		let par: Contact[] = [];
		project.accountable.forEach(project_acc => {
			acc.push(this.contacts.find(contact => contact.id == project_acc));
		});
		project.owner.forEach(project_ow => {
			ow.push(this.contacts.find(contact => contact.id == project_ow));
		});
		project.observer.forEach(project_ob => {
			ob.push(this.contacts.find(contact => contact.id == project_ob));
		});
		project.participant.forEach(project_par => {
			par.push(this.contacts.find(contact => contact.id == project_par));
		});
		this.accountables = acc;
		this.owners = ow;
		this.observers = ob;
		this.participants = par;
		this. isLoading += 1;
	}

	getCompaniesForContactDetail(contact: Contact): void{
		let comforcon: Company[] = [];
		contact.company.forEach(contact_company =>{
			comforcon.push(this.companies.find(company => company.id == contact_company));
		});
		this.companies = comforcon;
		this.isLoading += 1;
	}

	getProjectsForContactDetail(contact: Contact): void{
		let proforcon: Project[] = [];
		contact.project.forEach(contact_project =>{
			console.log(contact_project);
			proforcon.push(this.projects.find(project => project.id == contact_project));
		});
		console.log(proforcon);
		let ranks: string [] = [];
		proforcon.forEach(project =>{
			if(project.accountable.length > 0)
			if(project.accountable.includes(contact.id))
				ranks.push('felelős');
			if(project.owner && project.owner.includes(contact.id))
				ranks.push('tulajdonos');
			if(project.observer && project.observer.includes(contact.id))
				ranks.push('megfigyelő');
			if(project.participant && project.participant.includes(contact.id))
				ranks.push('résztvevő');
			this.projectsForContact.push({project, ranks});
			ranks = [];
		});
		console.log('Project:',this.projectsForContact[0].project, 'Ranks:',this.projectsForContact[0].ranks);
		this.isLoading += 1;
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
