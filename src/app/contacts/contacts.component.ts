import { Component, OnInit } from '@angular/core';
import { Contact } from '../classes/contact';
import { ContactsService } from './contacts.service';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material';
import { DeleteDialog } from '../delete-dialog';
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
		private router: Router,
		public dialog: MatDialog
	){}

	checked: boolean = false;
	contacts: Contact[];
	days: number;
	disabled: boolean = true;
	isLoading: boolean = true;


	ngOnInit(): void{
		this.getConctast();
	}

	getConctast(): void{
		this.contactsService
        .getConctast()
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
		let dialogRef = this.dialog.open(DeleteDialog);
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
	      	}
	      	this.checked = false;
	    });
	}

	delete(contact: Contact): void {
		this.contacts = this.contacts.filter(h => h !== contact);
    	this.contactsService.delete(contact).subscribe();
	}

	gotoEdit(): void{
  		let selectedContact = this.contacts.filter(contact => contact.selected === true)[0];
  		this.router.navigate(['/people/edit', selectedContact.id]);
  	}

  	/*addInstant(name: string, phone: string, email: string): void{
  		name = name.trim();
    	if (!name) { return; }
    	this.contactsService.addContact({ name } as Contact)
      		.subscribe(contact => {
        this.contacts.push(contact);
      });
  	}*/
}