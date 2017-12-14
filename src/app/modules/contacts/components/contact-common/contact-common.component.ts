import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '../../../../shared/classes/contact';
import { ContactsDataHandler } from '../../contacts-datahandler.service';

@Component({
  selector: 'contact-common',
  templateUrl: './contact-common.component.html'
})

export class ContactCommonComponent implements OnInit{
	edit = false;

	constructor(
		private contactsDataHandler: ContactsDataHandler,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		if(this.route.snapshot.routeConfig.path == "people/new")
		{
			this.setNewContact();
		}
		else
		{
			this.setEditContact();
		}
	}

	setNewContact(): void{
		let arr = this.route.snapshot.paramMap.keys;
		this.contactsDataHandler.contact = new Contact;
		this.contactsDataHandler.contact = this.contactsDataHandler.setDefaultContact(this.contactsDataHandler.contact);
		arr.forEach(array => this.contactsDataHandler.contact.company.push(Number(this.route.snapshot.paramMap.get(array))));
	}

	setEditContact(): void{
		this.edit = true;
		this.route.paramMap.subscribe(params => this.contactsDataHandler.getContact(Number(params.get('id'))));
	}
}