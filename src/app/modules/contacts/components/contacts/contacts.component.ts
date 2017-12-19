import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../../shared/classes/contact';
import { ContactsApiService } from '../../contacts-api.service';
import { ContactsDataHandler } from '../../contacts-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { Router } from '@angular/router';
import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
	selector: 'my-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})
export class ContactsComponent implements OnInit{

	constructor(
		private contactsApiService: ContactsApiService,
		private contactsDataHandler: ContactsDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		private dialog: MatDialog
	){}

	checked: boolean = false;
	disabled: boolean = true;


	ngOnInit(): void{
		this.contactsDataHandler.isLoading = true;
		this.sharedGetDataHandler.getCompanies();
		this.sharedGetDataHandler.getProjects();
		this.contactsDataHandler.getContacts();
	}


	/*Megvizsgáljuk a checkbox-okat és ha 1 vagy több 'checked'
	állapotban van, akkor megjelenítjük a fabbutton-t, különben nem.*/
	showChbox(): void{
		var show = 0;
		this.disabled = false;
		$('input[type=checkbox]').each(function() {
			if ($(this).is(':checked')) {
				++show;
			}
		});
		if ( show > 0 ) {
			this.checked = true;
			if (show > 1) {
				this.disabled = true;
			}
		} else {
			this.checked = false;
		}
	}

	gotoDetail(contact: Contact): void{
  		this.router.navigate(['/people/shown', contact.id]);
  	}

  	gotoNew(): void{
		this.router.navigate(["/people/new"]);
	}


	/*A kiválasztott lista elem selected mezője automatikusan
	true-ra változik. Ez alapján a törléshez kiválogatjuk azon
	listaelemeket, melyek select-je true és ha a megjelenő DeleDialog-on
	megerősítjük a törlést, akkor meghívjuk az adott névjegyre a törlés
	metódust egyenként.*/
	clickOnDeleteProductButton(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
	    dialogRef.afterClosed().subscribe(result => {
	    	console.log('The dialog was closed');
	      	if(result === true)
	      	{
	      		let array=this.contactsDataHandler.contacts;
	      		for (var i = 0; i < array.length; i++) {
	      			if(array[i].selected)
	      			{
	      				 this.delete(array[i]);
	      			}
	      		}
	      		this.checked = false;
	      	}
	    });
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

}