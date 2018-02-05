import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Yearlyincome } from './../../shared/classes/yearlyincome';
import { Employeesnum } from './../../shared/classes/employeesnum';
import { Industry } from './../../shared/classes/industry';
import { Country } from './../../shared/classes/country';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from './../../shared/classes/company';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class CompanyService{
    private companies: Company[];
    private countries: Country[];
    private industries: Industry[];
    private employeesNums: Employeesnum[];
    private yearlyIncomes: Yearlyincome[];
    isLoading = true;
    checkedArray = new Subject<number[]>();

    private companiesUrl = 'api/companies';
    private countriesUrl = 'api/countries';
    private industriesUrl = 'api/industries';
    private employeesnumsUrl = 'api/employeesnums';
    private yearlyincomesUrl = 'api/yearlyincomes';

    constructor(private http: HttpClient){
        this.getStartingdatas();
    }

    getStartingdatas(): void{
        this.http.get<Company[]>(this.companiesUrl)
            .pipe(
                tap(companies => (`fetched companies`)),
                catchError(this.handleError('getCompanies', []))
            )
            .subscribe(
                (companies: Company[]) => {
                    this.companies = companies;
                    this.http.get<Country[]>(this.countriesUrl)
                        .pipe(
                            tap(countries => (`fetched countries`)),
                            catchError(this.handleError('getCountries', []))
                        )
                        .subscribe(
                            (countries: Country[]) => {
                                this.countries = countries;
                                this.http.get<Industry[]>(this.industriesUrl)
                                .pipe(
                                    tap(industries => (`fetched industries`)),
                                    catchError(this.handleError('getIndustries', []))
                                )
                                .subscribe(
                                    (industries: Industry[])=> {
                                        this.industries = industries;
                                        this.http.get<Employeesnum[]>(this.employeesnumsUrl)
                                        .pipe(
                                            tap(employeesnums => (`fetched employeesnums`)),
                                            catchError(this.handleError('getEmployeesnums', []))
                                        )
                                        .subscribe(
                                            (employeesnums: Employeesnum[]) => {
                                                this.employeesNums = employeesnums;
                                                this.http.get<Yearlyincome[]>(this.yearlyincomesUrl)
                                                .pipe(
                                                    tap(yearlyincomes => (`fetched yearlyincomes`)),
                                                    catchError(this.handleError('getYearlyincomes', []))
                                                )
                                                .subscribe(
                                                    (yearlyIncomes: Yearlyincome[]) => {
                                                        this.yearlyIncomes = yearlyIncomes;
                                                        this.isLoading = false;
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                        )
            });
    }

    getItems (): Company[] {
        return this.companies;
    }

    getItem(company: Company | number): Company{
        const id = typeof company === 'number' ? company : company.id;
        if(this.companies)
            return this.companies.find((company: Company) => company.id === id);
        else{
            const url = `${this.companiesUrl}/${id}`;
            this.http.get<Company>(url).pipe(
            tap(_ => (`fetched company id=${id}`)),
            catchError(this.handleError<Company>(`getCompany id=${id}`))
            )
            .subscribe(
                (company: Company) => {
                    this.isLoading = false;
                    return company;
                }
            )
        }
    }

    getCountries(): Country[] {
        if(this.countries)
            return this.countries;
        else
            this.getStartingdatas();
    }

    getIndustries(): Industry[] {
        return this.industries;
    }

    getEmployeesNums(): Employeesnum[]{
        return this.employeesNums;
    }

    getYearlyIncomes(): Yearlyincome[]{
        return this.yearlyIncomes;
    }

    delete(company: Company | number): void {
        const id = typeof company === 'number' ? company : company.id;
        /*const url = `${this.companiesUrl}/${id}`;
    
        this.http.delete<Company>(url, httpOptions).pipe(
          tap(_ => (`deleted company id=${id}`)),
          catchError(this.handleError<Company>('delete'))
        )
        .subscribe(
            () => { */
                this.companies.splice(this.companies.indexOf(
                    this.companies.find(deletedCompany => deletedCompany.id === id)), 1
                );
            /* }
        ); */
    }

    add(company: Company): void{
        /* this.http.post<Company>(this.companiesUrl, company, httpOptions).pipe(
        catchError(this.handleError<Company>('addCompany'))
        )
        .subscribe(
            (addedCompany: Company) => { */
                this.companies.push(company);
            /* }
        ); */
    }

    /*A paraméterben kapott cég alapján azonosítja a módosítani kívánt
    céget és küld egy kérést a http.put segítségével az apinak.*/
    update (company: Company): void{
        /* this.http.put(this.companiesUrl, company, httpOptions).pipe(
            tap(_ => (`updated company id=${company.id}`)),
            catchError(this.handleError<any>('updateCompany'))
        )
        .subscribe(
            (updatedCompany: Company) => { */
                this.companies.find(oldCompany => oldCompany.id === company.id)[0] = company;
           /*  }
        ); */
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