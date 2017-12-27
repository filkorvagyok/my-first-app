import { Injectable } from '@angular/core';
import { Company } from '../classes/company';
import { Project } from '../classes/project';
import { Contact } from '../classes/contact';
import { CompaniesApiService } from '../../modules/companies/companies-api.service';
import { ProjectsApiService } from '../../modules/projects/projects-api.service';
import { ContactsApiService } from '../../modules/contacts/contacts-api.service';
import { SharedGetDataHandler } from './shared-getdatahandler.service';

@Injectable()

export class SharedAddDataHandler{
	constructor(
		private companiesApiService: CompaniesApiService,
		private projectsApiService: ProjectsApiService,
		private contactsApiService: ContactsApiService,
		private sharedGetDataHandler: SharedGetDataHandler
	){}

  /*Hozzáadjuk a projekt id-ját a megfelelő company project mezőjéhez,
  ha a projekt company mezőjében találunk adatot.
  De mindezek előtt megvizsgáljuk, hogy szerepel-e a projekt id-je
  olyan cég adatai között, melynek id-ja nem szerepel a paraméterben kapott
  projekt company mezőjében. Ha van ilyen, akkor onnan kitöröljük a projekt id-t.*/
  addProjectToCompany(project: Project): void{
    let companyToBeModified = this.sharedGetDataHandler.companies
      .filter(x => x.project.includes(project.id))
      .filter(company => !project.company.includes(company.id));
    companyToBeModified.forEach(company => {
      company.project.splice(company.project.indexOf(project.id), 1)
      this.companiesApiService.updateCompany(company).subscribe();
    });
    project.company
      .forEach(comp => {
        let actualCompany = this.sharedGetDataHandler.companies.find(x => x.id == comp);
        if(!actualCompany.project.includes(project.id))
          actualCompany.project.push(project.id)
        this.companiesApiService.updateCompany(actualCompany).subscribe();
    });
  }

  /*Hozzáadjuk a projekt id-ját a megfelelő contact project mezőjéhez,
  ha a projekt accountable, owner, observer vagy participant mezőjében
  találunk adatot.
  De mindezek előtt megvizsgáljuk, hogy szerepel-e a projekt id-je
  olyan névjegy adatai között, melynek id-ja nem szerepel a paraméterben kapott
  projekt accountable, owner, observer vagy participant mezőjében. Ha van ilyen,
  akkor onnan kitöröljük a projekt id-t.*/
  addProjectToContact(project: Project): void{
    let accountableToBeModified = this.sharedGetDataHandler.contacts
      .filter(x => x.project.includes(project.id))
      .filter(contact => !project.accountable.includes(contact.id));
    accountableToBeModified.forEach(contact => {
      contact.project.splice(contact.project.indexOf(project.id), 1)
      this.contactsApiService.updateContact(contact).subscribe();
    });
    let ownerToBeModified = this.sharedGetDataHandler.contacts
      .filter(x => x.project.includes(project.id))
      .filter(contact => !project.owner.includes(contact.id));
    accountableToBeModified.forEach(contact => {
      contact.project.splice(contact.project.indexOf(project.id), 1)
      this.contactsApiService.updateContact(contact).subscribe();
    });
    let observerBeModified = this.sharedGetDataHandler.contacts
      .filter(x => x.project.includes(project.id))
      .filter(contact => !project.observer.includes(contact.id));
    accountableToBeModified.forEach(contact => {
      contact.project.splice(contact.project.indexOf(project.id), 1)
      this.contactsApiService.updateContact(contact).subscribe();
    });
    let participantToBeModified = this.sharedGetDataHandler.contacts
      .filter(x => x.project.includes(project.id))
      .filter(contact => !project.participant.includes(contact.id));
    accountableToBeModified.forEach(contact => {
      contact.project.splice(contact.project.indexOf(project.id), 1)
      this.contactsApiService.updateContact(contact).subscribe();
    });
    project.accountable
      .forEach(contact => {
        let actualContact = this.sharedGetDataHandler.contacts.find(x => x.id == contact);
        if(!actualContact.project.includes(project.id))
          actualContact.project.push(project.id);
        this.contactsApiService.updateContact(actualContact).subscribe();
      });
    project.owner
      .forEach(contact => {
        let actualContact = this.sharedGetDataHandler.contacts.find(x => x.id == contact);
        if(!actualContact.project.includes(project.id))
          actualContact.project.push(project.id);
        this.contactsApiService.updateContact(actualContact).subscribe();
      });
    project.observer
      .forEach(contact => {
        let actualContact = this.sharedGetDataHandler.contacts.find(x => x.id == contact);
        if(!actualContact.project.includes(project.id))
          actualContact.project.push(project.id);
        this.contactsApiService.updateContact(actualContact).subscribe();
      });
    project.participant
      .forEach(contact => {
        let actualContact = this.sharedGetDataHandler.contacts.find(x => x.id == contact);
        if(!actualContact.project.includes(project.id))
          actualContact.project.push(project.id);
        this.contactsApiService.updateContact(actualContact).subscribe();
      });
  }

  /*Hozzáadjuk a névjegy id-ját a megfelelő company contact mezőjéhez,
  ha a névjegy company mezőjében találunk adatot.
  De mindezek előtt megvizsgáljuk, hogy szerepel-e a névjegy id-je
  olyan cég adatai között, melynek id-ja nem szerepel a paraméterben kapott
  névjegy contact mezőjében. Ha van ilyen, akkor onnan kitöröljük a névjegy id-t.*/
  addContactToCompany(contact: Contact): void{
    let companyToBeModified = this.sharedGetDataHandler.companies
      .filter(x => x.contact.includes(contact.id))
      .filter(company => !contact.company.includes(company.id));
    companyToBeModified.forEach(company => {
      company.contact.splice(company.contact.indexOf(contact.id), 1)
      this.companiesApiService.updateCompany(company).subscribe();
    });
    contact.company
      .forEach(comp => {
        let actualCompany = this.sharedGetDataHandler.companies.find(x => x.id == comp);
        if(!actualCompany.contact.includes(contact.id))
          actualCompany.contact.push(contact.id)
        this.companiesApiService.updateCompany(actualCompany).subscribe();
    });
  }

  addCompanyToProjects(projects: number[], companyID: number): void{
    let currentProjects = this.sharedGetDataHandler.projects.filter(project => {
      projects.includes(project.id)
    });
    currentProjects.forEach(project => {
      project.company.push(companyID);
      this.projectsApiService.updateProject(project).subscribe();
    });
  }
}