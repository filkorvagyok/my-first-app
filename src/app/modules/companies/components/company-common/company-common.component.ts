import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../../shared/classes/company';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { BaseCommonComponent } from '../../../../shared/services/base/base-common.component';

@Component({
  selector: 'company-common',
  templateUrl: './company-common.component.html'
})

export class CompanyCommonComponent extends BaseCommonComponent{
	billing = true;
	mail = true;

	constructor(
		private companiesDataHandler: CompaniesDataHandler,
		private route: ActivatedRoute
	) {
		super();
	}

	ngOnInit(): void {
		this.getDatasForCompanyEdit();
		if(this.route.snapshot.routeConfig.path == "company/new")
		{
			//Ha az url "company/new"-val egyenlő, akkor teljesül
			this.setNew();
		}
		/*TODO: mivel így nem csak "company/new/:id" esetén hajtja ezt végre,
		ezért ki kell javítani*/
		else
		{
			this.setEdit();
			this.companiesDataHandler.yearlyincomes
		}
	}

	/*Létrehozunk egy üres project példányt és alaphelyzetbe állítjuk, ha van tömb az url-ben, akkor
	megnézzük a num értékét is és ha egyenlő 1-el, akkor a tömbben lévő id-kat belerakjuk a project mezőbe,
	ha pedig 2-vel egyelnő, akkor pedig a contact mezőbe rakjuk az értékeket.*/
	setNew(): void{
		this.companiesDataHandler.company = new Company;
		this.companiesDataHandler.company = this.companiesDataHandler.setDefaultCompany(this.companiesDataHandler.company);
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
	setEdit(): void{
		this.route.paramMap.subscribe(params => this.companiesDataHandler.getCompany(Number(params.get('id')), false));
		this.edit = true;	//Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
		this.billing = false;
		this.mail = false;
	}

	/*Kilistázzuk mind az országokat, iparokat, munkások számát és
	az éves bevételeket a szerkesztéshez vagy új cég hozzáadásához*/
	getDatasForCompanyEdit(): void{
		this.companiesDataHandler.getCountries();
		this.companiesDataHandler.getIndustries();
		this.companiesDataHandler.getEmployeesnums();
		this.companiesDataHandler.getYearlyincomes();
	}
}
