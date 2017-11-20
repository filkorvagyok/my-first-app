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
import { Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Company } from './company';
import { Country } from './country';
import { Industry } from './industry';
import { Employeesnum } from './employeesnum';
import { Yearlyincome } from './yearlyincome';
import { Project } from './project';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/RX';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class CompaniesService{

	private headers = new Headers({'Content-Type': 'application/json'});
	private companiesUrl = 'api/companies';
  private countriesUrl = 'api/countries';
  private industriesUrl = 'api/industries';
  private employeesnumsUrl = 'api/employeesnums';
  private yearlyincomesUrl = 'api/yearlyincomes';
  private projectsUrl = 'api/projects';

	constructor(private http: HttpClient){}


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

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        tap(projects => (`fetched projects`)),
        catchError(this.handleError('getProjects', []))
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

  getProject(project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => (`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  deleteCompany(company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companiesUrl}/${id}`;

    return this.http.delete<Company>(url, httpOptions).pipe(
      tap(_ => (`deleted company id=${id}`)),
      catchError(this.handleError<Company>('delete'))
    );
  }

  deleteProject(project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<Project>(url, httpOptions).pipe(
      tap(_ => (`deleted project id=${id}`)),
      catchError(this.handleError<Project>('delete'))
    );
  }

  addCompany(company: Company): Observable<Company>{
    return this.http.post<Company>(this.companiesUrl, company, httpOptions).pipe(
        catchError(this.handleError<Company>('addHero'))
      );
  }

  addProject(project: Project): Observable<Project>{
    return this.http.post<Project>(this.projectsUrl, project, httpOptions).pipe(
        catchError(this.handleError<Project>('addProject'))
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
      tap(_ => {(`updated company id=${company.id}`); console.log(company);}),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  updateProject (project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, httpOptions).pipe(
      tap(_ => (`updated project id=${project.id}`)),
      catchError(this.handleError<any>('updateProject'))
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

}