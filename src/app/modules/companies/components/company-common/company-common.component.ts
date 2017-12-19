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
		private route: ActivatedRoute,
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

	//Létrehozunk egy üres company példányt és alaphelyzetbe állítjuk
	setNewCompany(): void{
		this.companiesDataHandler.company = new Company;
		this.companiesDataHandler.company = this.companiesDataHandler.setDefaultCompany(this.companiesDataHandler.company);
		this.edit = false;	//Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő cégadatokat.
	setEditCompany(): void{
		this.route.paramMap.subscribe(params => this.companiesDataHandler.getCompany(Number(params.get('id')), false));
		this.billing = false;
		this.mail = false;
	}
}
