import { Contact } from './../../shared/classes/contact';
import { SharedGetDataHandler } from './../../shared/services/shared-getdatahandler.service';
import { ContactService } from './../contact.service';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BaseEditComponent } from '../../shared/services/base/base-edit.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SharedAddDataHandler } from '../../shared/services/shared-adddatahandler.service';

const TEL_REGEX = /^\s*(?:\+?\d{1,3})?[- (]*\d{3}(?:[- )]*\d{3})?[- ]*\d{4}(?: *[x/#]\d+)?\s*$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent extends BaseEditComponent implements OnInit, AfterViewChecked {
  contactForm: FormGroup;
  contact: Contact;
  rank: number;
	edit = false;

  constructor(
    private route: ActivatedRoute,
		private contactService: ContactService,
		private fb: FormBuilder,
		protected location: Location,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedAddDataHandler: SharedAddDataHandler,
		private changeDetector: ChangeDetectorRef
  ) {
    super(location);
  }

  ngOnInit() {
    this.sharedGetDataHandler.getProjects();
		this.sharedGetDataHandler.getContacts();
		this.initform();
		if(this.contactService.getItems() && !this.contact){
			this.setEditContact();
		}
	}

	ngAfterViewChecked(){
		if(!this.contact){
			this.setEditContact();
		}
		this.changeDetector.detectChanges();
  }

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
			'contactPhone': [null, Validators.pattern(TEL_REGEX)],
			'contactEmail': [null, Validators.pattern(EMAIL_REGEX)],
		});
	}
  
  setEditContact(): void{
    if(this.route.snapshot.routeConfig.path == "people/new")
		{
			//Ha az url "people/new"-val egyenlő, akkor teljesül
			this.setNew();
		}
		/*TODO: mivel így nem csak "people/new/:id" esetén hajtja ezt végre,
		ezért ki kell javítani*/
		else
		{
			this.setEdit();
		}
  }

  /*Létrehozunk egy üres contact példányt és alaphelyzetbe állítjuk, ha van tömb az url-ben, akkor
	megnézzük a num értékét is és ha egyenlő 0-val, akkor a tömbben lévő id-kat belerakjuk a company mezőbe,
	ha pedig 1-el egyelnő, akkor pedig a project mezőbe rakjuk az értékeket.*/
	setNew(): void{
		this.contact = new Contact;
		this.rank = Number(this.route.snapshot.params['rank']);
		switch (Number(this.route.snapshot.params['num'])) {
			case 0:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.contact.company.push(Number(x)));
				break;
			case 1:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.contact.project.push(Number(x)));
				break;
			default:
				break;
		}
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő névjegy adatokat.
	setEdit(): void{
		this.contact = this.contactService.getItem(+this.route.snapshot.params['id'])
		this.edit = true;
  }

	add(contact: Contact): void{
		this.contactService.add(contact)
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
		this.navigateBack();
  }
  
  save(): void {
    this.contactService.update(this.contact)
    if(this.contact.company.length > 0)
			this.sharedAddDataHandler.addContactToCompany(this.contact);
		//TODO: megvalósítani a contact projekthez adását.
		/*if(contact.project.length > 0 || project.owner.length > 0 ||
			project.observer.length > 0 || project.participant.length > 0)
			this.sharedAddDataHandler.addProjectToContact(project);*/
		if(this.contact.project.length > 0)
		{
			this.sharedAddDataHandler.addContactToProject(this.contact, this.rank);
		}
		this.navigateBack();
	}

	/*Ha a contact company mezőjében letároltunk 1 vagy több cég id-ját,
	akkor ez a metódus a sharedAddDataHandler segítségével rögzíti a megfelelő
	cég contact mezőjében ennek a névjegynek az id-ját. Hasonlóan működik, ha
	a contact project mezőjében lárolunk legalább 1 projekt id-t, csak ott a projekt
	megfelő mezőjébe szúrjuk be a contact id-ját.*/

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
