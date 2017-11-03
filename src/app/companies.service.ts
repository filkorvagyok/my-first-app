import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Company } from './company';
import { COMPANIES } from './companies';

@Injectable()

export class CompaniesService {

  getCompanies(): Promise<Company[]> {
    return Promise.resolve(COMPANIES);
  }
}


// FOLYTATNI!!! MEMORY WEB API
/*import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Company } from './company';


@Injectable()

export class CompaniesService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private companiesUrl = 'api/companies';

	constructor(private http: Http){}

	getCompanies(): Promise<Company[]> {
		return this.http.get(this.companiesUrl)
			.toPromise()
			.then(response => response.json().data as Company[])
			.catch(this.handleError);
	}

	getCompany(id: number): Promise<Company[]>{
		const url = `${this.companiesUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json().data as Company)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}*/