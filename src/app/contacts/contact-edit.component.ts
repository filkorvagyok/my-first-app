import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Contact } from '../classes/contact';
import { Company } from '../classes/company';
import { ContactsService } from './contacts.service';
import { SharedService } from '../shared.service';


@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: [ '../styles/edit.component.css' ]
})
export class ContactEditComponent implements OnInit{
	constructor(
		private contactsService: ContactsService,
		private sharedService: SharedService,
		private location: Location
	) {}

	@Input() contact: Contact;
	@Input() edit: boolean;
	@Input() selectedCompanies: number[];
	companies: Company[];

	ngOnInit(): void{
		this.sharedService.returnCompanies()
			.subscribe(companies => this.companies = companies);
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		for(let i = 0; i < this.selectedCompanies.length; i++)
		{
			this.contact.company[i] = this.companies.find(x => x.id == this.selectedCompanies[i]);
		}
		this.contactsService.updateContact(this.contact)
			.subscribe(() => this.goBack());
	}

	/*save(): void {
		this.contactsService.updateContact(this.contact)
			.subscribe(() => this.goBack());
	}*/

	add(contact: Contact): void{
		for(let i = 0; i < this.selectedCompanies.length; i++)
		{
			this.contact.company[i] = this.companies.find(x => x.id == this.selectedCompanies[i]);
		}
    	this.contactsService.addContact(contact)
			.subscribe(() => this.goBack());
  	}
}