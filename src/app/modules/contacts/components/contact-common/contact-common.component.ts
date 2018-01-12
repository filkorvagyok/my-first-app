import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../../../shared/classes/contact';
import { ContactsDataHandler } from '../../contacts-datahandler.service';
import { SharedAddDataHandler } from '../../../../shared/services/shared-adddatahandler.service';
import { BaseCommonComponent } from '../../../../shared/services/base/base-common.component';

@Component({
  selector: 'contact-common',
  templateUrl: './contact-common.component.html'
})

export class ContactCommonComponent extends BaseCommonComponent implements OnInit{
	rank: number = -1; //Ebbe a változóba lesz tárolva, hogy milyen pozícióban van a projekben a felhasználó.

	constructor(
		private contactsDataHandler: ContactsDataHandler,
		private sharedAddDataHandler: SharedAddDataHandler,
		private route: ActivatedRoute
	) {
		super();
	}

	ngOnInit(): void {
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
		this.contactsDataHandler.contact = new Contact;
		this.contactsDataHandler.contact = this.contactsDataHandler.setDefaultContact(this.contactsDataHandler.contact);
		this.rank = Number(this.route.snapshot.params['rank']);
		switch (Number(this.route.snapshot.params['num'])) {
			case 0:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.contactsDataHandler.contact.company.push(Number(x)));
				break;
			case 1:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.contactsDataHandler.contact.project.push(Number(x)));
				break;
			default:
				break;
		}
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő névjegy adatokat.
	setEdit(): void{
		this.edit = true;
		this.route.paramMap.subscribe(params => this.contactsDataHandler.getContact(Number(params.get('id')), false));
	}
}