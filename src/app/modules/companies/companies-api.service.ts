import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../../companies/company';
import { Country } from '../../companies/models/country';
import { Industry } from '../../companies/models/industry';
import { Employeesnum } from '../../companies/models/employeesnum';
import { Yearlyincome } from '../../companies/models/yearlyincome';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BaseApiService } from '../../shared/services/base/base-api.service'
import { Subject } from 'rxjs/Subject';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class CompaniesApiService extends BaseApiService implements OnInit{

	private companiesUrl = 'api/companies';
  private countriesUrl = 'api/countries';
  private industriesUrl = 'api/industries';
  private employeesnumsUrl = 'api/employeesnums';
  private yearlyincomesUrl = 'api/yearlyincomes';

  isLoading = true;
  private companies: Company[];
  checkedArray = new Subject<number[]>();

	constructor(private http: HttpClient)
  {
    super();
    this.http.get<Company[]>(this.companiesUrl)
      .pipe(
        tap(companies => (`fetched companies`)),
        catchError(this.handleError('getCompanies', []))
      )
      .subscribe(
        (companies: Company[]) => {this.companies = companies;
          this.isLoading = false;
        });
  }

  ngOnInit(){
    
  }

  /*Visszaad egy Observable-t a company tömbről, melyet
  a webapi-ból nyert ki. Később ha ezt a metódust meghívják
  és feliratkoznak rá, ki tudják nyerni az adatokat belőle.*/
	getItems (): Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl)
      .pipe(
        tap(companies => (`fetched companies`)),
        catchError(this.handleError('getCompanies', []))
      );
  }
  
  getCompanies(){
    return this.companies;
  }

  //Lásd: getCompanies, csak itt országok tömbre végeztük el
  getCountries (): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl)
      .pipe(
        tap(countries => (`fetched countries`)),
        catchError(this.handleError('getCountries', []))
      );
  }

  //Lásd: getCompanies, csak itt ipar tömbre végeztük el
  getIndustries (): Observable<Industry[]> {
    return this.http.get<Industry[]>(this.industriesUrl)
      .pipe(
        tap(industries => (`fetched industries`)),
        catchError(this.handleError('getIndustries', []))
      );
  }

  //Lásd: getCompanies, csak itt a dolgozók száma tömbre végeztük el
  getEmployeesnums(): Observable<Employeesnum[]> {
    return this.http.get<Employeesnum[]>(this.employeesnumsUrl)
      .pipe(
        tap(employeesnums => (`fetched employeesnums`)),
        catchError(this.handleError('getEmployeesnums', []))
      );
  }

  //Lásd: getCompanies, csak itt az éves bevétel tömbre végeztük el
  getYearlyincomes(): Observable<Yearlyincome[]> {
    return this.http.get<Yearlyincome[]>(this.yearlyincomesUrl)
      .pipe(
        tap(yearlyincomes => (`fetched yearlyincomes`)),
        catchError(this.handleError('getYearlyincomes', []))
      );
  }

  /*Lásd: getCompanies, csak itt egy darab cégre végeztük el,
  melyet a paraméterben megkapott cég, vagy id alapján azonosítunk*/
  getItem(company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companiesUrl}/${id}`;
    return this.http.get<Company>(url).pipe(
      tap(_ => (`fetched company id=${id}`)),
      catchError(this.handleError<Company>(`getCompany id=${id}`))
    );
  }

  /*A paraméterben kapott cég vagy id alapján azonosítja a törölni
  kivánt céget és küld egy kérést a http.delete segítségével az apinak.*/
  delete(company: Company | number): Observable<any> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companiesUrl}/${id}`;

    return this.http.delete<Company>(url, httpOptions).pipe(
      tap(_ => (`deleted company id=${id}`)),
      catchError(this.handleError<Company>('delete'))
    );
  }

  /*A paraméterben kapott cég alapján azonosítja a hozzáadni kívánt
  céget és küld egy kérést a http.post segítségével az apinak.*/
  add(company: Company): Observable<Company>{
    return this.http.post<Company>(this.companiesUrl, company, httpOptions).pipe(
        catchError(this.handleError<Company>('addCompany'))
      );
  }

  /*A paraméterben kapott cég alapján azonosítja a módosítani kívánt
  céget és küld egy kérést a http.put segítségével az apinak.*/
  update (company: Company): Observable<any> {
    return this.http.put(this.companiesUrl, company, httpOptions).pipe(
      tap(_ => (`updated company id=${company.id}`)),
      catchError(this.handleError<any>('updateCompany'))
    );
  }

  

  //Hibakezelő
	handleError<T> (operation = 'operation', result?: T) {
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