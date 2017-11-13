import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Company }        from './company';
import { Country } from './country';
import { Industry } from './industry';
import { Employeesnum } from './employeesnum';
import { Yearlyincome } from './yearlyincome';
import { CompaniesService } from './companies.service';

@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: [ './company-edit.component.css' ]
})
export class CompanyEditComponent implements OnInit {
  @Input() company: Company;
  @Input() billing: boolean;
  @Input() mail: boolean;
  @Input() edit: boolean;
  companies: Company[];
  countries: Country[] = [];
  industries: Industry[] = [];
  employeesnums: Employeesnum[] = [];
  yearlyincomes: Yearlyincome[] = [];

  constructor(
    private companiesService: CompaniesService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.getCountries();
    this.getIndustries();
    this.getEmployeesnums();
    this.getYearlyincomes();
  }

  getCompanies(): void{
    this.companiesService
        .getCompanies()
        .subscribe(companies => this.companies = companies);
  }

  getCountries(): void{
    this.companiesService
        .getCountries()
        .subscribe(countries => this.countries = countries);
  }

  getIndustries(): void{
    this.companiesService
        .getIndustries()
        .subscribe(industries => this.industries = industries);
  }

  getEmployeesnums(): void{
    this.companiesService
        .getEmployeesnums()
        .subscribe(employeesnums => this.employeesnums = employeesnums);
  }

  getYearlyincomes(): void{
    this.companiesService
        .getYearlyincomes()
        .subscribe(yearlyincomes => this.yearlyincomes = yearlyincomes);
  }

  onChangeHqcountry(newValue, asd){
    this.company.hq_country = this.countries.filter(x=>x.code==newValue)[0].country
    console.log(newValue, this.countries.filter(x=>x.code==newValue)[0].country, asd);
    return newValue;
  }

  onChange(newValue){
    return newValue;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
      this.companiesService.updateHero(this.company)
        .subscribe(() => this.goBack());
  }

  add(company: Company): void{
    this.companiesService.addCompany(company)
      .subscribe(company => {
        this.companies.push(company);
      });
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