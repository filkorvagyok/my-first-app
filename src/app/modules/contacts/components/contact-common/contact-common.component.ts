import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../../../shared/classes/contact';
import { ContactsDataHandler } from '../../contacts-datahandler.service';

@Component({
  selector: 'contact-common',
  templateUrl: './contact-common.component.html'
})

export class ContactCommonComponent implements OnInit{
	edit = false; //Ezen mező alapján tudja a contact-edit.component, hogy szerkeszteni kell vagy új névjegyet létrehozni

	constructor(
		private contactsDataHandler: ContactsDataHandler,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		if(this.route.snapshot.routeConfig.path == "people/new")
		{
			//Ha az url "people/new"-val egyenlő, akkor teljesül
			this.setNewContact();
		}
		/*TODO: mivel így nem csak "people/new/:id" esetén hajtja ezt végre,
		ezért ki kell javítani*/
		else
		{
			this.setEditContact();
		}
	}

	/*Létrehozunk egy üres contact példányt és alaphelyzetbe állítjuk, ha van tömb az url-ben akkor
	a benne lévő id-kat belerakjuk a company mezőbe*/
	setNewContact(): void{
		let arr = this.route.snapshot.paramMap.keys;
		this.contactsDataHandler.contact = new Contact;
		this.contactsDataHandler.contact = this.contactsDataHandler.setDefaultContact(this.contactsDataHandler.contact);
		arr.forEach(array => this.contactsDataHandler.contact.company.push(Number(this.route.snapshot.paramMap.get(array))));
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő névjegy adatokat.
	setEditContact(): void{
		this.edit = true;
		this.route.paramMap.subscribe(params => this.contactsDataHandler.getContact(Number(params.get('id')), false));
	}
}