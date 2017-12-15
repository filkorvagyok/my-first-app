import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
		private location: Location
	) {}

	ngOnInit(): void {
		if(this.route.snapshot.routeConfig.path == "company/new")
		{
			this.setNewCompany();
		}
		else
		{
			this.setEditCompany();
		}
	}

	setNewCompany(): void{
		this.companiesDataHandler.company = new Company;
		this.companiesDataHandler.company = this.companiesDataHandler.setDefaultCompany(this.companiesDataHandler.company);
		this.edit = false;
	}

	setEditCompany(): void{
		this.route.paramMap.subscribe(params => this.companiesDataHandler.getCompany(Number(params.get('id')), false));
		this.billing = false;
		this.mail = false;
	}
}
