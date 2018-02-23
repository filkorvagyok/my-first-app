import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../../contacts/contact';
import { ContactsApiService } from '../../contacts-api.service';
import { ContactsDataHandler } from '../../contacts-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { BaseComponent } from '../../../../shared/services/base/base.component'

@Component({
	selector: 'my-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})
export class ContactsComponent extends BaseComponent implements OnInit{

	constructor(
		private contactsApiService: ContactsApiService,
		private contactsDataHandler: ContactsDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		protected dialog: MatDialog
	){
		super(dialog);
	}


	ngOnInit(): void{
		this.contactsDataHandler.isLoading = true;
		this.sharedGetDataHandler.getCompanies();
		this.sharedGetDataHandler.getProjects();
		this.contactsDataHandler.getContacts();
	}

  gotoDetail(contact: Contact): void{
  	this.router.navigate(['/people/shown', contact.id]);
  }

  gotoNew(): void{
    this.router.navigate(["/people/new"]);
  }


	/*Tölés esetén a névjeggyel összekapcsolt cég(ek) és projekt(ek) közül is ki kell törölnünk az adott névjegyet,
	tehát ezzel kezdünk és csak ezután hívjuk meg a companiesApiService delete metódusát*/
	delete(contact: Contact): void{
		this.contactsDataHandler.contacts = this.contactsDataHandler.contacts.filter(cont => cont != contact);
		this.sharedDeleteDataHandler.deleteContactFromCompany(contact);
		this.sharedDeleteDataHandler.deleteContactFromProject(contact);
		this.contactsApiService.delete(contact).subscribe();
	}

	gotoEdit(): void{
  		let selectedContact = this.contactsDataHandler.contacts.filter(contact => contact.selected === true)[0];
  		this.router.navigate(['/people/edit', selectedContact.id]);
  	}


  	/*A lista nézetben egy teljes név mező kötelető kitöltésével tudunk
  	létrehozni új névjegyet. Megadható továbbá a telefonszám és e-mail-cím
  	is. A névjegy további mezőit alaphelyzetbe állítjuk.*/
  	//TODO: megvalósítani a focust!
  	addInstant(full_name: string, phone: string, email: string): void{
  		let contact = new Contact();
  		contact = this.contactsDataHandler.setDefaultContact(contact);
  		contact.full_name = full_name.trim();
  		contact.phone = phone.trim();
  		contact.email = email.trim();
    	if (!full_name) { return; }
    	this.contactsDataHandler.addContact(contact);
  	}

  	/*Átadjuk a kiválasztott névjegyeket az új cég létrehozásához, és
	miután létrehoztuk a céget, a kiválogatott névjegyek company mezőjébe
	bele is helyezzük őket.*/
  	createNewCompany(): void{
  		let contactsArray: number[] = [];
  		this.contactsDataHandler.contacts.forEach( contact =>{
  			if(contact.selected)
  			{
  				contactsArray.push(contact.id);
  			}
  		});
  		this.gotoNewCompany(contactsArray);
  	}

  	gotoNewCompany(array: number[]): void{
  		this.router.navigate(['/company/new/', {array:array, num:2}]);
  	}

  	/*Átadjuk a kiválasztott névjegyeket az új projekt létrehozásához, és
	miután létrehoztuk a projektet, a kiválogatott névjegyek project mezőjébe
	bele is helyezzük őket.*/
  	createNewProject(rank: number): void{
  		let contactsArray: number[] = [];
  		this.contactsDataHandler.contacts.forEach( contact =>{
  			if(contact.selected)
  			{
  				contactsArray.push(contact.id);
  			}
  		});
  		this.gotoNewProject(contactsArray, rank);
  	}

  	gotoNewProject(array: number[], rank: number): void{
  		this.router.navigate(['/project/new/', {array:array, num:2, rank:rank}]);
  	}
}