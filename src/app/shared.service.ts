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

	getProjects(): void{
		this.projectsService.getProjects()
			.subscribe(projects => {this.projects = projects; console.log('sharedService getprojects:', projects);});
	}

	getCompanies(): void{
		this.companiesService.getCompanies()
			.subscribe(companies => this.companies = companies);
	}

	getContacts(): void{
		this.contactsService.getContacts()
			.subscribe(contacts => this.contacts = contacts);
	}

	returnCompanies(): Observable<Company[]>{
		return this.companiesService.getCompanies();
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
					.forEach(company => deletingContacts.push(this.deleteCFC(contact, company)))
		return Observable.forkJoin(deletingContacts);
	}

	deleteCFC(contact: Contact, company: Company): Observable<Company>{
		let index = company.contact.indexOf(contact.id);
		company.contact.splice(index,1);
		return this.companiesService.updateCompany(company);
	}

	deleteCompanyFromProject(company: Company): Observable<Project[]>{
		const deletingCompanies: Array<Observable<Project>> = [];
		console.log('deleteCompanyFromProject:', this.projects);
				this.projects
					.filter(project => project.company.includes(company.id))
					.forEach(project => deletingCompanies.push(this.deleteCFP(company, project)))
		return Observable.forkJoin(deletingCompanies);
	}

	deleteCFP(company: Company, project: Project): Observable<Project>{
		console.log(company.name);
		let index = project.company.indexOf(company.id);
		project.company.splice(index,1);
		console.log(project.company);
		return this.projectsService.updateProject(project);
	}

	openDeleteDialog(): MatDialogRef<DeleteDialog>{
		let dialogRef = this.dialog.open(DeleteDialog);
		return dialogRef;
	}

	addProjectToCompany(i: number, project: Project, companies: Company[]): void{
  		companies.find(x=>x.id==i).project.push(project.id);
  		this.companiesService.updateCompany(companies.find(x=>x.id==i)).subscribe();
  	}

  	addContactToCompany(i: number, contact: Contact, companies: Company[]): void{
  		companies.find(x=>x.id==i).contact.push(contact.id);
  		this.companiesService.updateCompany(companies.find(x=>x.id==i)).subscribe();
  	}
}