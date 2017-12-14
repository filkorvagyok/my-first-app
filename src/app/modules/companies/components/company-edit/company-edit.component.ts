import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';

import { Company }        from '../../../../shared/classes/company';
import { CompaniesApiService } from '../../companies-api.service';
import { CompaniesDataHandler } from '../../companies-datahandler.service';

@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: [ '../../../../shared/styles/edit.component.css' ]
})
export class CompanyEditComponent implements OnInit {
  @Input() company: Company;
  @Input() billing: boolean;
  @Input() mail: boolean;
  @Input() edit: boolean;

  constructor(
    private companiesApiService: CompaniesApiService,
    private companiesDataHandler: CompaniesDataHandler,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDatasForCompanyEdit();
  }

  getDatasForCompanyEdit(): void{
    this.companiesDataHandler.getCountries();
    this.companiesDataHandler.getIndustries();
    this.companiesDataHandler.getEmployeesnums();
    this.companiesDataHandler.getYearlyincomes();
  }

  onChangeHqcountry(newValue, asd){
    this.company.hq_country = this.companiesDataHandler.countries.filter(x=>x.code==newValue)[0].country;
    return newValue;
  }

  onChange(newValue){
    return newValue;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
      this.companiesApiService.updateCompany(this.company)
        .subscribe(() => this.goBack());
  }

  add(company: Company): void{
    console.log(company)
    this.companiesDataHandler.addCompany(company);
    this.goBack();
  }

  billing_datas(company: Company): void{
    this.company.bi_address = company.hq_address;
    this.company.bi_country = company.hq_country;
    this.company.bi_name = company.name;
    this.company.bi_settlement = company.hq_settlement;
    this.company.bi_zipcode = company.hq_zipcode;
  }

  mail_datas(company: Company): void{
    this.company.mail_address = company.hq_address;
    this.company.mail_country = company.hq_country;
    this.company.mail_name = company.name;
    this.company.mail_settlement = company.hq_settlement;
    this.company.mail_zipcode = company.hq_zipcode;
  }
}