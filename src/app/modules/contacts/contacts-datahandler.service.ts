import { Injectable } from '@angular/core';
import { Contact } from '../../shared/classes/contact';
import { ContactsApiService } from './contacts-api.service';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service'

@Injectable()
export class ContactsDataHandler{

	constructor(
    private contactsApiService: ContactsApiService,
    private sharedGetDataHandler: SharedGetDataHandler
    ){}
  contacts: Contact[];
  contact: Contact;
  isLoading: boolean = true;
  isLoadingData: boolean = true;

  getContacts(): void{
    this.contactsApiService.getContacts()
      .subscribe(contacts => {this.contacts = contacts; this.isLoading = false;});
  }

  getContact(contact: Contact | number, detail: boolean): void{
    this.contactsApiService.getContact(contact)
      .subscribe(contact => {
        this.contact = contact;
        if(detail)
        {
          if(contact.company.length > 0)
          {
            this.sharedGetDataHandler.getCompaniesForContactDetail(contact);
          }
          else{
            this.sharedGetDataHandler.companies = [];
            this.sharedGetDataHandler.isLoading += 1;
          }
          if(contact.project.length > 0)
          {
            this.sharedGetDataHandler.getProjectsForContactDetail(contact);
          }
          else{
            this.sharedGetDataHandler.projects = [];
            this.sharedGetDataHandler.isLoading += 1;
          }
          this.isLoadingData = this.sharedGetDataHandler.isLoading >= 2 ? false : true;
        }
      });
  }

  setDefaultContact(contact: Contact): Contact{
    /*let project: Proj;
    project.id = null;
    project.rank = [];*/
    contact.company = [];
    contact.email = "";
    contact.forename = "";
    contact.full_name = "";
    contact.greeting = "";
    contact.middle_name = "";
    contact.nickname = "";
    contact.project = [];
    contact.phone = "";
    contact.primary_communication_chanel = "";
    contact.rank = "";
    contact.selected = false;
    contact.surname = "";
    return contact;
  }

  addContact(contact: Contact): void{
    this.contactsApiService.addContact(contact)
      .subscribe(contact => this.contacts.push(contact));
  }
}