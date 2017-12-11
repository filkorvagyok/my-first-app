import { Component, OnInit } from '@angular/core';
import { Contact } from '../classes/contact';
import { Company } from '../classes/company';
import { ContactsService } from './contacts.service';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
	selector: 'my-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['../styles/display.component.css']
})
export class ContactsComponent implements OnInit{

	constructor(
		private contactsService: ContactsService,
		private sharedService: SharedService,
		private router: Router
	){}

	checked: boolean = false;
	contacts: Contact[];
	days: number;
	disabled: boolean = true;
	isLoading: boolean = true;


	ngOnInit(): void{
		this.getConctast();
		this.sharedService.getCompanies();
		this.sharedService.getProjects();
	}

	getConctast(): void{
		this.contactsService
        .getContacts()
        .subscribe(contacts => {this.contacts = contacts, this.isLoading = false});
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
	      		let array=this.contacts;
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

	delete(contact: Contact): void {
		this.contacts = this.contacts.filter(h => h !== contact);
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
    	this.contactsService.delete(contact).subscribe();
	}

	gotoEdit(): void{
  		let selectedContact = this.contacts.filter(contact => contact.selected === true)[0];
  		this.router.navigate(['/people/edit', selectedContact.id]);
  	}

  	addInstant(full_name: string, phone: string, email: string): void{
  		let contact = new Contact();
  		contact = this.contactsService.setDefaultContact(contact);
  		contact.full_name = full_name.trim();
  		contact.phone = phone.trim();
  		contact.email = email.trim();
    	if (!full_name) { return; }
    	this.contactsService.addContact(contact)
      		.subscribe(contact => {
        this.contacts.push(contact);
      });
  	}

}