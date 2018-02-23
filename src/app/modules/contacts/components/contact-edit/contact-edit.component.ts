import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators }   from '@angular/forms';
import { Location } from '@angular/common';
import { Contact } from '../../../../contacts/contact';
import { ContactsApiService } from '../../contacts-api.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedAddDataHandler } from '../../../../shared/services/shared-adddatahandler.service';
import { BaseEditComponent } from '../../../../shared/services/base/base-edit.component';

const TEL_REGEXP = /^\s*(?:\+?\d{1,3})?[- (]*\d{3}(?:[- )]*\d{3})?[- ]*\d{4}(?: *[x/#]\d+)?\s*$/;
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: [ '../../../../shared/styles/edit.component.css' ]
})
export class ContactEditComponent extends BaseEditComponent implements OnInit{
	constructor(
		private contactsApiService: ContactsApiService,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedAddDataHandler: SharedAddDataHandler,
		protected location: Location,
		private fb: FormBuilder
	) {
		super(location);
	}

	@Input() contact: Contact;
	@Input() edit: boolean;
	@Input() rank: number;
	contactForm: FormGroup;

	//Form validitás beállítása
	initform(): void{
		this.contactForm = this.fb.group({
			'contactCompany': [],
			'contactFullName': [null, Validators.required],
			'contactForename': [],
			'contactNickname': [],
			'contactSurename': [],
			'contactMiddlename': [],
			'contactPrimComChan': [],
			'contactRank': [],
			'contactGreeting': [],
			'contactPhone': [null, Validators.pattern(TEL_REGEXP)],
			'contactEmail': [null, Validators.pattern(EMAIL_REGEXP)],
		});
	}

	ngOnInit(): void{
		this.sharedGetDataHandler.getCompanies();
		this.sharedGetDataHandler.getProjects();
		this.initform();
	}

  	save(): void{
		this.addContactTo(this.contact);
		this.contactsApiService.update(this.contact)
        	.subscribe(() => this.navigateBack())
	}

	add(contact: Contact): void{
		this.contactsApiService.add(contact)
			.subscribe(() => {
				this.addContactTo(contact);
				this.navigateBack();
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
		if(contact.project.length > 0)
		{
			this.sharedAddDataHandler.addContactToProject(contact, this.rank);
		}
	}

	//Submit lenyomásakor hívódik meg
	onSubmit(contact: Contact){
		if(this.contactForm.valid)  //Ha a validitás megfelelő
			this.edit? this.save() : this.add(contact);  //Ha az edit true, akkor a save hívódik meg, különben az add
		else
		{
			$(document.getElementById('maindiv')).animate({ scrollTop: 0 }, 1000); //Felgörger az oldal tetejére
			this.validateAllFormFields(this.contactForm);
		}
	}
}