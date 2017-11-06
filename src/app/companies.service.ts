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


// FOLYTATNI!!! MEMORY WEB API
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Company } from './company';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const cudOptions = { headers: new Headers({ 'Content-Type': 'application/json' })};

@Injectable()

export class CompaniesService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private companiesUrl = 'api/companies';

	constructor(private http: Http){}



	getCompanies (): Observable<Company[]> {
		return this.http.get(this.companiesUrl)
			.map(res => res.json())
			.catch(this.handleError);
	}

  getCompany(company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companiesUrl}/${id}`;
    return this.http.get(url)
      .map((r: Response) => r.json() as Company)
      .catch(this.handleError);
  }

  delete(company: Company | number): Promise<void> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companiesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


	deleteCompany (company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companiesUrl}/${id}`;

    return this.http.delete(url, cudOptions)
      .map(()=>null)
      .catch(this.handleError);
  }


	private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    // and reformat for user consumption
    console.error(error); // log to console instead
    return Observable.throw(error);
  }
}