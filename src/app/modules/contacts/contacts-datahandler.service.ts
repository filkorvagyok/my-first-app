import { Injectable } from '@angular/core';
import { Contact } from '../../contacts/contact';
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
  isLoading: boolean = true; //Ez a lista nézetben fontos, amikor csak a névjegy információira van szükségünk.
  isLoadingData: boolean = true; //Ekkor meg kell várnunk még kilistázzuk a névjegyhez tartozó cégeket és projekteket is.

  /*A ContactsApiService-ben meghívjuk a getContacts metódust, ami egy observable névjegy tömböt ad vissza,
  amire feliratkozva kinyerhetjük a névjegyek adatait.*/
  getContacts(): void{
    this.contactsApiService.getItems()
      .subscribe(contacts => {this.contacts = contacts; this.isLoading = false;});
  }

  /*A ContactsApiService-ben meghívjuk a getContact metódust, ami egy observable névjegyet ad vissza,
  amire feliratkozva kinyerhetjük a névjegy adatait. Majd ha találunk céget vagy projektet a névjegy
  adatai között, akkor a sharedGetDataHandler segítségével ezek adatait is kinyerjük.*/
  getContact(contact: Contact | number, detail: boolean): void{
    this.contactsApiService.getItem(contact)
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

  //Alapállapotba helyezzük a névjegyet.
  setDefaultContact(contact: Contact): Contact{
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
    this.contactsApiService.add(contact)
      .subscribe(contact => this.contacts.push(contact));
  }
}