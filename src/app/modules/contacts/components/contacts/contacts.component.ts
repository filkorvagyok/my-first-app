import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../../shared/classes/contact';
import { Company } from '../../../../shared/classes/company';
import { ContactsApiService } from '../../contacts-api.service';
import { ContactsDataHandler } from '../../contacts-datahandler.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
	selector: 'my-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})
export class ContactsComponent implements OnInit{

	constructor(
		private contactsApiService: ContactsApiService,
		private contactsDataHandler: ContactsDataHandler,
		private sharedService: SharedService,
		private router: Router
	){}

	checked: boolean = false;
	days: number;
	disabled: boolean = true;


	ngOnInit(): void{
		this.sharedService.getCompanies();
		this.sharedService.getProjects();
		this.contactsDataHandler.getContacts();
	}

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

	openDeleteDialog(): void{
		let dialogRef = this.sharedService.openDeleteDialog();
	    dialogRef.afterClosed().subscribe(result => {
	    	console.log('The dialog was closed');
	      	if(dialogRef.componentInstance.delete)
	      	{
	      		let array=this.contactsDataHandler.contacts;
	      		for (var i = 0; i < array.length; i++) {
	      			if(array[i].selected)
	      			{
	      				//FONTOS: ÁT LETT ALAKÍTVA A CONTACT CLASS, EMIATT VÁLOZOTT A TÖRLÉS FUKCIÓ IS
	      				 //this.delete(array[i]);
	      			}
	      		}
	      		this.checked = false;
	      	}
	    });
	}

	//FONTOS: ÁT LETT ALAKÍTVA A CONTACT CLASS, EMIATT VÁLOZOTT A TÖRLÉS FUKCIÓ IS (lásd fentebb)
	/*delete(contact: Contact): void {
		this.contactsDataHandler.contacts = this.contactsDataHandler.contacts.filter(h => h !== contact);
		if(contact.company.length > 0)
			this.sharedService.deleteContactFromCompany(contact).subscribe();
		if(contact.accountable.length > 0)
			this.sharedService.deleteContactFromProject(contact, 0).subscribe();
		if(contact.owner.length > 0)
			this.sharedService.deleteContactFromProject(contact, 1).subscribe();
		if(contact.observer.length > 0)
			this.sharedService.deleteContactFromProject(contact, 2).subscribe();
		if(contact.participant.length > 0)
			this.sharedService.deleteContactFromProject(contact, 3).subscribe();
    	this.contactsApiService.delete(contact).subscribe();
	}*/

	gotoEdit(): void{
  		let selectedContact = this.contactsDataHandler.contacts.filter(contact => contact.selected === true)[0];
  		this.router.navigate(['/people/edit', selectedContact.id]);
  	}

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