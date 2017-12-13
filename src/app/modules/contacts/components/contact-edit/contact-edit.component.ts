import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Contact } from '../../../../shared/classes/contact';
import { Company } from '../../../../shared/classes/company';
import { ContactsService } from '../../contacts.service';
import { SharedService } from '../../../../shared/services/shared.service';


@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: [ '../../../../shared/styles/edit.component.css' ]
})
export class ContactEditComponent implements OnInit{
	constructor(
		private contactsService: ContactsService,
		private sharedService: SharedService,
		private location: Location
	) {}

	@Input() contact: Contact;
	@Input() edit: boolean;
	companies: Company[];

	ngOnInit(): void{
		this.sharedService.returnCompanies()
			.subscribe(companies => this.companies = companies);
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		let array = this.contact.company;
		for (var i = 0; i < array.length; i++)
        			this.addContactToCompany(array[i]);
		this.contactsService.updateContact(this.contact)
			.subscribe(() => this.goBack());
	}

	/*save(): void {
		this.contactsService.updateContact(this.contact)
			.subscribe(() => this.goBack());
	}*/

	add(contact: Contact): void{
		let array = this.contact.company;
    	this.contactsService.addContact(contact)
			.subscribe(() => {
				for (var i = 0; i < array.length; i++)
        			this.addContactToCompany(array[i]);
				this.goBack()
			});
  	}

  	addContactToCompany(i: number): void{
  		this.sharedService.addContactToCompany(i, this.contact, this.companies);
  	}
}