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
    this.route.paramMap
      .switchMap((params: ParamMap) => this.companiesService.getCompany(+params.get('id')))
      .subscribe(company => this.company = company);
    this.getCountries();
    this.getIndustries();
    this.getEmployeesnums();
    this.getYearlyincomes();
    console.log(this.route);
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
}