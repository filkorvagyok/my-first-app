import { Injectable } from '@angular/core';
import { Contact } from '../../shared/classes/contact';
import { ContactsApiService } from './contacts-api.service';

@Injectable()
export class ContactsDataHandler{

	constructor(private contactsApiService: ContactsApiService){}
  contacts: Contact[];
  contact: Contact;
  isLoading: boolean = true;
  isLoadingForDetail: boolean = true;

  getContacts(): void{
    this.contactsApiService.getContacts()
      .subscribe(contacts => {this.contacts = contacts; this.isLoading = false;});
  }

  getContact(contact: Contact | number): void{
    this.contactsApiService.getContact(contact)
      .subscribe(contact => {this.contact = contact; this.isLoadingForDetail = false;});
  }

  setDefaultContact(contact: Contact): Contact{
    contact.accountable = [];
    contact.company = [];
    contact.email = "";
    contact.forename = "";
    contact.full_name = "";
    contact.greeting = "";
    contact.middle_name = "";
    contact.nickname = "";
    contact.observer = [];
    contact.owner = [];
    contact.participant = [];
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