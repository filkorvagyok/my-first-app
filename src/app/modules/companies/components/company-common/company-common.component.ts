import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../../shared/classes/company';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedAddDataHandler } from '../../../../shared/services/shared-adddatahandler.service';

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
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedAddDataHandler: SharedAddDataHandler
	) {}

	ngOnInit(): void {
		this.sharedGetDataHandler.getProjects();
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
		let arr = this.route.snapshot.paramMap.keys;
		console.log(arr);
		this.companiesDataHandler.company = new Company;
		this.companiesDataHandler.company = this.companiesDataHandler.setDefaultCompany(this.companiesDataHandler.company);
		this.edit = false;	//Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
		let numArr: number[] = [];
		arr.forEach(x => numArr.push(Number(x)));
		this.sharedAddDataHandler.addCompanyToProjects(numArr, this.companiesDataHandler.company.id);
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő cégadatokat.
	setEditCompany(): void{
		this.route.paramMap.subscribe(params => this.companiesDataHandler.getCompany(Number(params.get('id')), false));
		this.billing = false;
		this.mail = false;
	}
}
