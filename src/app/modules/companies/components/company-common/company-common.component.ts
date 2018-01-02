import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../../shared/classes/company';
import { CompaniesDataHandler } from '../../companies-datahandler.service';

@Component({
  selector: 'company-common',
  templateUrl: './company-common.component.html'
})

export class CompanyCommonComponent{
	billing = true;
	mail = true;
	edit = true;

	constructor(
		private companiesDataHandler: CompaniesDataHandler,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		if(this.route.snapshot.routeConfig.path == "company/new")
		{
			//Ha az url "company/new"-val egyenlő, akkor teljesül
			this.setNewCompany();
		}
		/*TODO: mivel így nem csak "company/new/:id" esetén hajtja ezt végre,
		ezért ki kell javítani*/
		else
		{
			this.setEditCompany();
		}
	}

	/*Létrehozunk egy üres project példányt és alaphelyzetbe állítjuk, ha van tömb az url-ben, akkor
	megnézzük a num értékét is és ha egyenlő 1-el, akkor a tömbben lévő id-kat belerakjuk a project mezőbe,
	ha pedig 2-vel egyelnő, akkor pedig a contact mezőbe rakjuk az értékeket.*/
	setNewCompany(): void{
		this.companiesDataHandler.company = new Company;
		this.companiesDataHandler.company = this.companiesDataHandler.setDefaultCompany(this.companiesDataHandler.company);
		this.edit = false;	//Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
		switch (Number(this.route.snapshot.params['num'])) {
			case 1:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.companiesDataHandler.company.project.push(Number(x)));
				break;
			case 2:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.companiesDataHandler.company.contact.push(Number(x)));
				break;
			default:
				break;
		}
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő cégadatokat.
	setEditCompany(): void{
		this.route.paramMap.subscribe(params => this.companiesDataHandler.getCompany(Number(params.get('id')), false));
		this.billing = false;
		this.mail = false;
	}
}
