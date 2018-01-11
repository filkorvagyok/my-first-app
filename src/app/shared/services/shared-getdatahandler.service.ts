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

	/*Itt is elvégezzük a getProjects, getCompanies, getContacts a 
	saját api-jaik segítségével, mivel vannak olyan komoponensek, ahol
	több helyről kell beszereznünk adatot és a saját apijuk ezt nem
	tudja biztosítani.*/
	getProjects(): void{
		this.projectsApiService.getItems()
			.subscribe(projects => this.projects = projects);
	}

	getCompanies(): void{
		this.companiesApiService.getItems()
			.subscribe(companies => this.companies = companies);
	}

	getContacts(): void{
		this.contactsApiService.getItems()
			.subscribe(contacts => this.contacts = contacts);
	}


	/*Kilistázzuk azokat a projekteket, melyek az adott cég részleteiben
	majd megjelennek, így nem kell ott ellenőrizgetnünk, hogy az adott projekt
	vajon a céghez tartozik vagy sem.*/
	getProjectsForCompanyDetail(company: Company): void{
		let projectsforcomp: Project[] = [];
        company.project.forEach(company_project => {
        	projectsforcomp.push(this.projects.find(project => project.id == company_project));
        });
        this.projects = projectsforcomp;
        this.isLoading += 1;
	}

	//Lásd: getProjectsForCompanyDetail, csak itt a névjegyeket listázzuk ki a cég részleteihez
	getContactsForCompanyDetail(company: Company): void{
		let contactsforcomp: Contact[] = [];
		company.contact.forEach(company_contact => {
			contactsforcomp.push(this.contacts.find(contact => contact.id == company_contact));
		});
		this.contacts = contactsforcomp;
		this.isLoading += 1;
	}


	//Lásd: getProjectsForCompanyDetail, csak itt a cégeket listázzuk ki a projekt részleteihez
	getCompaniesForProjectDetail(project: Project): void{
		let comforproj: Company[] = [];
		project.company.forEach(project_company =>{
			comforproj.push(this.companies.find(company => company.id == project_company));
		});
		this.companies = comforproj;
		this.isLoading += 1
	}


	//Lásd: getProjectsForCompanyDetail, csak itt a névjegyeket listázzuk ki a projekt részleteihez
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


	//Lásd: getProjectsForCompanyDetail, csak itt a cégeket listázzuk ki a névjegy részleteihez
	getCompaniesForContactDetail(contact: Contact): void{
		let comforcon: Company[] = [];
		contact.company.forEach(contact_company =>{
			comforcon.push(this.companies.find(company => company.id == contact_company));
		});
		this.companies = comforcon;
		this.isLoading += 1;
	}


	//Lásd: getProjectsForCompanyDetail, csak itt a projekteket listázzuk ki a névjegy részleteihez
	getProjectsForContactDetail(contact: Contact): void{
		let proforcon: Project[] = [];
		contact.project.forEach(contact_project =>{
			proforcon.push(this.projects.find(project => project.id == contact_project));
		});
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
		this.isLoading += 1;
	}
}
