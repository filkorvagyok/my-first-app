import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../classes/contact';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class ContactsService{

	private contactsUrl = 'api/contacts';
	constructor(
    	private http: HttpClient,
    ){}

    getConctast (): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
      .pipe(
        tap(contacts => (`fetched contacts`)),
        catchError(this.handleError('getConctast', []))
      );
	}

	getContact(contact: Contact | number): Observable<Contact> {
		const id = typeof contact === 'number' ? contact : contact.id;
		const url = `${this.contactsUrl}/${id}`;
		return this.http.get<Contact>(url).pipe(
			tap(_ => (`fetched contact id=${id}`)),
			catchError(this.handleError<Contact>(`getContact id=${id}`))
		);
	}

	delete(contact: Contact | number): Observable<Contact> {
		const id = typeof contact === 'number' ? contact : contact.id;
		const url = `${this.contactsUrl}/${id}`;

		return this.http.delete<Contact>(url, httpOptions).pipe(
			tap(_ => (`deleted contact id=${id}`)),
			catchError(this.handleError<Contact>('delete'))
		);
	}

	addContact(contact: Contact): Observable<Contact>{
		return this.http.post<Contact>(this.contactsUrl, contact, httpOptions).pipe(
			catchError(this.handleError<Contact>('addContact'))
		);
	}

	updateCompany (contact: Contact): Observable<any> {
		return this.http.put(this.contactsUrl, contact, httpOptions).pipe(
			tap(_ => (`updated contact id=${contact.id}`)),
			catchError(this.handleError<any>('updateCompany'))
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