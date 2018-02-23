import { Injectable } from '@angular/core';
import { Company } from '../../companies/company';
import { Project } from '../../projects/project';
import { Contact } from '../../contacts/contact';
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
      this.companiesApiService.update(company).subscribe();
    });
    project.company
      .forEach(comp => {
        let actualCompany = this.sharedGetDataHandler.companies.find(x => x.id == comp);
        if(!actualCompany.project.includes(project.id))
          actualCompany.project.push(project.id)
        this.companiesApiService.update(actualCompany).subscribe();
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
      this.contactsApiService.update(contact).subscribe();
    });
    let ownerToBeModified = this.sharedGetDataHandler.contacts
      .filter(x => x.project.includes(project.id))
      .filter(contact => !project.owner.includes(contact.id));
    accountableToBeModified.forEach(contact => {
      contact.project.splice(contact.project.indexOf(project.id), 1)
      this.contactsApiService.update(contact).subscribe();
    });
    let observerBeModified = this.sharedGetDataHandler.contacts
      .filter(x => x.project.includes(project.id))
      .filter(contact => !project.observer.includes(contact.id));
    accountableToBeModified.forEach(contact => {
      contact.project.splice(contact.project.indexOf(project.id), 1)
      this.contactsApiService.update(contact).subscribe();
    });
    let participantToBeModified = this.sharedGetDataHandler.contacts
      .filter(x => x.project.includes(project.id))
      .filter(contact => !project.participant.includes(contact.id));
    accountableToBeModified.forEach(contact => {
      contact.project.splice(contact.project.indexOf(project.id), 1)
      this.contactsApiService.update(contact).subscribe();
    });
    project.accountable
      .forEach(contact => {
        let actualContact = this.sharedGetDataHandler.contacts.find(x => x.id == contact);
        if(!actualContact.project.includes(project.id))
          actualContact.project.push(project.id);
        this.contactsApiService.update(actualContact).subscribe();
      });
    project.owner
      .forEach(contact => {
        let actualContact = this.sharedGetDataHandler.contacts.find(x => x.id == contact);
        if(!actualContact.project.includes(project.id))
          actualContact.project.push(project.id);
        this.contactsApiService.update(actualContact).subscribe();
      });
    project.observer
      .forEach(contact => {
        let actualContact = this.sharedGetDataHandler.contacts.find(x => x.id == contact);
        if(!actualContact.project.includes(project.id))
          actualContact.project.push(project.id);
        this.contactsApiService.update(actualContact).subscribe();
      });
    project.participant
      .forEach(contact => {
        let actualContact = this.sharedGetDataHandler.contacts.find(x => x.id == contact);
        if(!actualContact.project.includes(project.id))
          actualContact.project.push(project.id);
        this.contactsApiService.update(actualContact).subscribe();
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
      this.companiesApiService.update(company).subscribe();
    });
    contact.company
      .forEach(comp => {
        let actualCompany = this.sharedGetDataHandler.companies.find(x => x.id == comp);
        if(!actualCompany.contact.includes(contact.id))
          actualCompany.contact.push(contact.id)
        this.companiesApiService.update(actualCompany).subscribe();
    });
  }

  /*Hozzáadjuk a cég id-ját a megfelelő project company mezőjéhez,
  ha a company project mezőjében találunk adatot.
  De mindezek előtt megvizsgáljuk, hogy szerepel-e a cég id-je
  olyan projekt adatai között, melynek id-ja nem szerepel a paraméterben kapott
  cég project mezőjében. Ha van ilyen, akkor onnan kitöröljük a cég id-t.*/
  addCompanyToProject(company: Company): void{
    let projectToBeModified = this.sharedGetDataHandler.projects
      .filter(x => x.company.includes(company.id))
      .filter(project => !company.project.includes(project.id));
    projectToBeModified.forEach(project => {
      project.company.splice(project.company.indexOf(company.id), 1)
      this.projectsApiService.update(project).subscribe();
    });
    company.project
      .forEach(proj => {
        let actualProject = this.sharedGetDataHandler.projects.find(x => x.id == proj);
        if(!actualProject.company.includes(company.id))
          actualProject.company.push(company.id)
        this.projectsApiService.update(actualProject).subscribe();
    });
  }

  /*Hozzáadjuk a cég id-ját a megfelelő contact company mezőjéhez,
  ha a company contact mezőjében találunk adatot.
  De mindezek előtt megvizsgáljuk, hogy szerepel-e a cég id-je
  olyan névjegy adatai között, melynek id-ja nem szerepel a paraméterben kapott
  cég contact mezőjében. Ha van ilyen, akkor onnan kitöröljük a cég id-t.*/
  addCompanyToContact(company: Company): void{
    let contactToBeModified = this.sharedGetDataHandler.contacts
      .filter(x => x.company.includes(company.id))
      .filter(contact => !company.contact.includes(contact.id));
    contactToBeModified.forEach(contact => {
      contact.company.splice(contact.company.indexOf(company.id), 1)
      this.contactsApiService.update(contact).subscribe();
    });
    company.contact
      .forEach(cont => {
        let actualContact = this.sharedGetDataHandler.contacts.find(x => x.id == cont);
        if(!actualContact.company.includes(company.id))
          actualContact.company.push(company.id)
        this.contactsApiService.update(actualContact).subscribe();
    });
  }

  /*Hozzáadjuk a contact id-ját a megfelelő projektek mezőjéhez,
  ha a contact company mezőjében találunk adatot.
  Mivel a névjegyek szerkesztésénél nem lehet módosítani a hozzátartozó projekteket,
  ezért nem is kell megvizsgálnunk, hogy már szerepelt-e az adott névjegy id-ja
  valamely projekt contact mezőjében.*/
  addContactToProject(contact: Contact, rank: number): void{
    switch (rank) {
      case 0:
        contact.project.forEach(proj => {
          let actualProject = this.sharedGetDataHandler.projects.find(x => x.id == proj);
          actualProject.accountable.push(contact.id);
          this.projectsApiService.update(actualProject).subscribe();
        });
        break;
      case 1:
        contact.project.forEach(proj => {
          let actualProject = this.sharedGetDataHandler.projects.find(x => x.id == proj);
          actualProject.owner.push(contact.id);
          this.projectsApiService.update(actualProject).subscribe();
        });
        break;
      case 2:
        contact.project.forEach(proj => {
          let actualProject = this.sharedGetDataHandler.projects.find(x => x.id == proj);
          actualProject.observer.push(contact.id);
          this.projectsApiService.update(actualProject).subscribe();
        });
        break;
      case 3:
        contact.project.forEach(proj => {
          let actualProject = this.sharedGetDataHandler.projects.find(x => x.id == proj);
          actualProject.participant.push(contact.id);
          this.projectsApiService.update(actualProject).subscribe();
        });
        break;
      default:
        break;
    }
  }
}