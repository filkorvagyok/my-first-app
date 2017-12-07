import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Company } from '../classes/company';
import { CompaniesService } from './companies.service';

@Component({
  selector: 'company-common',
  templateUrl: './company-common.component.html'
})

export class CompanyCommonComponent{
	@Input() company: Company;
	billing = true;
	mail = true;
	edit = true;

	constructor(
		private companiesService: CompaniesService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		if(this.route.snapshot.routeConfig.path == "company/new")
		{
		  this.company = new Company;
		  this.company = this.companiesService.setDefaultCompany(this.company);
		  this.edit = false;
		}
		else
		{
		  this.route.paramMap
		    .switchMap((params: ParamMap) => this.companiesService.getCompany(+params.get('id')))
		    .subscribe(company => this.company = company);
		  this.billing = false;
		  this.mail = false;
		}
	}
}
