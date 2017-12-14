import { Injectable } from '@angular/core';
import { Company } from '../../shared/classes/company';
import { Country } from '../../shared/classes/country';
import { Industry } from '../../shared/classes/industry';
import { Employeesnum } from '../../shared/classes/employeesnum';
import { Yearlyincome } from '../../shared/classes/yearlyincome';
import { CompaniesApiService } from './companies-api.service';

@Injectable()
export class CompaniesDataHandler{

	constructor(private companiesApiService: CompaniesApiService){}
  companies: Company[];
  countries: Country[];
  industries: Industry[];
  employeesnums: Employeesnum[];
  yearlyincomes: Yearlyincome[];
  company: Company;
  isLoading: boolean = true;
  isLoadingData: boolean = true;

  getCompanies(): void{
    this.companiesApiService.getCompanies()
      .subscribe(companies => {this.companies = companies; this.isLoading = false;});
  }

  getCompany(company: Company | number): void{
    this.companiesApiService.getCompany(company)
      .subscribe(company => {this.company = company; this.isLoadingData = false;});
  }

  setDefaultCompany(company: Company): Company{
    company.bi_address = "";
    company.bi_country = "";
    company.bi_name = "";
    company.bi_settlement = "";
    company.bi_zipcode = null;
    company.contact = [];
    company.country_code = "";
    company.email = "";
    company.employeesnum_id = null;
    company.facebook = "";
    company.founded = null;
    company.hq_address = "";
    company.hq_country = "";
    company.hq_settlement = "";
    company.hq_zipcode = null;
    company.industry_id = null;
    company.logo = "";
    company.mail_address = "";
    company.mail_country = "";
    company.mail_name = "";
    company.mail_settlement = "";
    company.mail_zipcode = null;
    company.name = "";
    company.phone = "";
    company.project = [];
    company.selected = false;
    company.taxnumber = null;
    company.website = "";
    company.yearlyincome_id = null;
    return company;
  }

  addCompany(company: Company): void{
    this.companiesApiService.addCompany(company)
      .subscribe(company => this.companies.push(company));
  }

  getCountries(): void{
    this.companiesApiService.getCountries()
      .subscribe(countries => {
        this.countries = countries;
      });
  }

  getIndustries(): void{
    this.companiesApiService.getIndustries()
      .subscribe(industries => {
        this.industries = industries;
      });
  }

  getEmployeesnums(): void{
    this.companiesApiService.getEmployeesnums()
      .subscribe(employeesnums => {
        this.employeesnums = employeesnums;
      });
  }

  getYearlyincomes(): void{
    this.companiesApiService.getYearlyincomes()
      .subscribe(yearlyincomes => {
        this.yearlyincomes = yearlyincomes;
      });
  }
}