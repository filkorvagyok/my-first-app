/*import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Company } from './company';
import { COMPANIES } from './companies';

@Injectable()

export class CompaniesService {

  getCompanies(): Promise<Company[]> {
    return Promise.resolve(COMPANIES);
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../classes/company';
import { Project } from '../classes/project';
import { Country } from '../classes/country';
import { Industry } from '../classes/industry';
import { Employeesnum } from '../classes/employeesnum';
import { Yearlyincome } from '../classes/yearlyincome';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class CompaniesService{

	private companiesUrl = 'api/companies';
  private countriesUrl = 'api/countries';
  private industriesUrl = 'api/industries';
  private employeesnumsUrl = 'api/employeesnums';
  private yearlyincomesUrl = 'api/yearlyincomes';

	constructor(
    private http: HttpClient,
    ){}


  /*getCompanies(): Observable<Company[]>{
    return this.http.get("http://atwork.djw.hu/filkortamas/json/companies.json")
      .map((res:Response) => res.json());
  }*/

	getCompanies (): Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl)
      .pipe(
        tap(companies => (`fetched companies`)),
        catchError(this.handleError('getCompanies', []))
      );
	}

  getCountries (): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl)
      .pipe(
        tap(countries => (`fetched countries`)),
        catchError(this.handleError('getCountries', []))
      );
  }

  getIndustries (): Observable<Industry[]> {
    return this.http.get<Industry[]>(this.industriesUrl)
      .pipe(
        tap(industries => (`fetched industries`)),
        catchError(this.handleError('getIndustries', []))
      );
  }

  getEmployeesnums(): Observable<Employeesnum[]> {
    return this.http.get<Employeesnum[]>(this.employeesnumsUrl)
      .pipe(
        tap(employeesnums => (`fetched employeesnums`)),
        catchError(this.handleError('getEmployeesnums', []))
      );
  }

  getYearlyincomes(): Observable<Yearlyincome[]> {
    return this.http.get<Yearlyincome[]>(this.yearlyincomesUrl)
      .pipe(
        tap(yearlyincomes => (`fetched yearlyincomes`)),
        catchError(this.handleError('getYearlyincomes', []))
      );
  }

  getCompany(company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companiesUrl}/${id}`;
    return this.http.get<Company>(url).pipe(
      tap(_ => (`fetched company id=${id}`)),
      catchError(this.handleError<Company>(`getCompany id=${id}`))
    );
  }

  delete(company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companiesUrl}/${id}`;

    return this.http.delete<Company>(url, httpOptions).pipe(
      tap(_ => (`deleted company id=${id}`)),
      catchError(this.handleError<Company>('delete'))
    );
  }

  addCompany(company: Company): Observable<Company>{
    return this.http.post<Company>(this.companiesUrl, company, httpOptions).pipe(
        catchError(this.handleError<Company>('addHero'))
      );
  }


	/*deleteCompany (company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companiesUrl}/${id}`;

    return this.http.delete(url, httpOptions)
      .map(()=>null)
      .catch(this.handleError);
  }*/

  updateCompany (company: Company): Observable<any> {
    return this.http.put(this.companiesUrl, company, httpOptions).pipe(
      tap(_ => (`updated company id=${company.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  


	private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
     (`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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

}