import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Contact } from '../../../../shared/classes/contact';
import { ContactsApiService } from '../../contacts-api.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedAddDataHandler } from '../../../../shared/services/shared-adddatahandler.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: [ '../../../../shared/styles/edit.component.css' ]
})
export class ContactEditComponent implements OnInit{
	constructor(
		private contactsApiService: ContactsApiService,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedAddDataHandler: SharedAddDataHandler,
		private location: Location,
	) {}

	@Input() contact: Contact;
	@Input() edit: boolean;

	ngOnInit(): void{
		this.sharedGetDataHandler.getCompanies();
		this.sharedGetDataHandler.getProjects();
	}

	goBack(): void {
		this.location.back();
	}

  	save(): void{
		this.addContactTo(this.contact);
		this.contactsApiService.updateContact(this.contact)
        	.subscribe(() => this.goBack())
	}

	add(contact: Contact): void{
		this.contactsApiService.addContact(contact)
			.subscribe(() => {
				this.addContactTo(contact);
				this.goBack();
			});
	}

	/*Ha a contact company mezőjében letároltunk 1 vagy több cég id-ját,
	akkor ez a metódus a sharedAddDataHandler segítségével rögzíti a megfelelő
	cég contact mezőjében ennek a névjegynek az id-ját. Hasonlóan működik, ha
	a contact project mezőjében lárolunk legalább 1 projekt id-t, csak ott a projekt
	megfelő mezőjébe szúrjuk be a contact id-ját.*/
	addContactTo(contact: Contact)
	{
		if(contact.company.length > 0)
			this.sharedAddDataHandler.addContactToCompany(contact);
		//TODO: megvalósítani a contact projekthez adását.
		/*if(contact.project.length > 0 || project.owner.length > 0 ||
			project.observer.length > 0 || project.participant.length > 0)
			this.sharedAddDataHandler.addProjectToContact(project);*/
	}
}