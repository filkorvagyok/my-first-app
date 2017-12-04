import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Contact } from '../classes/contact';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'contact-common',
  templateUrl: './contact-common.component.html'
})

export class ContactCommonComponent implements OnInit{
	@Input() contact: Contact;
	edit = false;

	constructor(
		private contactsService: ContactsService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		let path = this.route.snapshot.routeConfig.path;
		let arr = this.route.snapshot.paramMap.keys;
		this.contact = new Contact;
		this.contact.company = [];
		if(path == "people/new")
		{ 
			for (var i = 0; i < arr.length; i++) {
				this.contact.company.push(Number(this.route.snapshot.paramMap.get(arr[i])));
			}
		}
		else
		{
			this.edit = true;
			this.route.paramMap
		    	.switchMap((params: ParamMap) => this.contactsService.getContact(+params.get('id')))
		    	.subscribe(contact => this.contact = contact);
		}
	}
}