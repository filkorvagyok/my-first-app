import { Injectable } from '@angular/core';
import { Company } from '../../companies/company';
import { Country } from '../../companies/models/country';
import { Industry } from '../../companies/models/industry';
import { Employeesnum } from '../../companies/models/employeesnum';
import { Yearlyincome } from '../../companies/models/yearlyincome';
import { CompaniesApiService } from './companies-api.service';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service'

@Injectable()
export class CompaniesDataHandler{

	constructor(
    private companiesApiService: CompaniesApiService,
    private sharedGetDataHandler: SharedGetDataHandler
    ){}
  companies: Company[];
  countries: Country[];
  industries: Industry[];
  employeesnums: Employeesnum[];
  yearlyincomes: Yearlyincome[];
  company: Company;
  isLoading: boolean = true; //Ez a lista nézetben fontos, amikor csak a cégek információira van szükségünk.
  isLoadingData: boolean = true; //Ekkor meg kell várnunk még kilistázzuk a céghez tartozó projekteket és névjegyeket is.
  isLoadingForEdit: number = 0;

  /*A CompaniesApiService-ben meghívjuk a getCompanies metódust, ami egy observable cég tömböt ad vissza,
  amire feliratkozva kinyerhetjük a cégek adatait.*/
  getCompanies(): void{
    this.companiesApiService.getItems()
      .subscribe(companies => {this.companies = companies; this.isLoading = false;});
  }

  /*A CompaniesApiService-ben meghívjuk a getCompany metódust, ami egy observable céget ad vissza,
  amire feliratkozva kinyerhetjük a cég adatait. Majd ha találunk projektet vagy névjegyet a cég
  adatai között, akkor a sharedGetDataHandler segítségével ezek adatait is kinyerjük.*/
  getCompany(company: Company | number, detail: boolean): void{
    this.companiesApiService.getItem(company)
      .subscribe(company => {
        this.company = company;
        if(detail)
        {
          if(company.project.length > 0)
          {
            this.sharedGetDataHandler.getProjectsForCompanyDetail(company);
          }
          else{
            this.sharedGetDataHandler.projects = [];
            this.sharedGetDataHandler.isLoading += 1;
          }
          if(company.contact.length > 0)
          {
            this.sharedGetDataHandler.getContactsForCompanyDetail(company);
          }
          else{
            this.sharedGetDataHandler.contacts = [];
            this.sharedGetDataHandler.isLoading += 1;
          }
          this.isLoadingData = this.sharedGetDataHandler.isLoading >= 2 ? false : true;
        }
      });
  }


  //Alapállapotba helyezzük a céget.
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
    this.companiesApiService.add(company)
      .subscribe(company => this.companies.push(company));
  }

  //Lásd getCompanies, csak itt országokra
  getCountries(): void{
    this.companiesApiService.getCountries()
      .subscribe(countries => {
        this.countries = countries;
        this.isLoadingForEdit += 1;
      });
  }


  //Lásd getCompanies, csak itt iparokra
  getIndustries(): void{
    this.companiesApiService.getIndustries()
      .subscribe(industries => {
        this.industries = industries;
        this.isLoadingForEdit += 1;
      });
  }


  //Lásd getCompanies, csak itt dolgozók számára
  getEmployeesnums(): void{
    this.companiesApiService.getEmployeesnums()
      .subscribe(employeesnums => {
        this.employeesnums = employeesnums;
        this.isLoadingForEdit += 1;
      });
  }


  //Lásd getCompanies, csak itt éves bevételre
  getYearlyincomes(): void{
    this.companiesApiService.getYearlyincomes()
      .subscribe(yearlyincomes => {
        this.yearlyincomes = yearlyincomes;
        this.isLoadingForEdit += 1;
      });
  }
}