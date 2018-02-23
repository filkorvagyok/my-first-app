import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../../contacts/contact';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BaseApiService } from '../../shared/services/base/base-api.service'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class ContactsApiService extends BaseApiService{

	private contactsUrl = 'api/contacts';
	constructor(private http: HttpClient)
	{
		super();
	}

	/*Visszaad egy Observable-t a névjegy tömbről, melyet
	  a webapi-ból nyert ki. Később ha ezt a metódust meghívják
	  és feliratkoznak rá, ki tudják nyerni az adatokat belőle.*/
    getItems (): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
      .pipe(
        tap(contacts => (`fetched contacts`)),
        catchError(this.handleError('getConctast', []))
      );
	}

	/*Lásd: getContacts, csak itt egy darab névjegyre végeztük el,
  	melyet a paraméterben megkapott névjegy, vagy id alapján azonosítunk*/
	getItem(contact: Contact | number): Observable<Contact> {
		const id = typeof contact === 'number' ? contact : contact.id;
		const url = `${this.contactsUrl}/${id}`;
		return this.http.get<Contact>(url).pipe(
			tap(_ => (`fetched contact id=${id}`)),
			catchError(this.handleError<Contact>(`getContact id=${id}`))
		);
	}

	/*A paraméterben kapott névjegy vagy id alapján azonosítja a törölni
  	kivánt névjegyet és küld egy kérést a http.delete segítségével az apinak.*/
	delete(contact: Contact | number): Observable<Contact> {
		const id = typeof contact === 'number' ? contact : contact.id;
		const url = `${this.contactsUrl}/${id}`;

		return this.http.delete<Contact>(url, httpOptions).pipe(
			tap(_ => (`deleted contact id=${id}`)),
			catchError(this.handleError<Contact>('delete'))
		);
	}

	/*A paraméterben kapott névjegy alapján azonosítja a hozzáadni kívánt
  	névjegyet és küld egy kérést a http.post segítségével az apinak.*/
	add(contact: Contact): Observable<Contact>{
		return this.http.post<Contact>(this.contactsUrl, contact, httpOptions).pipe(
			catchError(this.handleError<Contact>('addContact'))
		);
	}

	/*A paraméterben kapott névjegy alapján azonosítja a módosítani kívánt
  	névjegyet és küld egy kérést a http.put segítségével az apinak.*/
	update (contact: Contact): Observable<any> {
		return this.http.put(this.contactsUrl, contact, httpOptions).pipe(
			tap(_ => (`updated contact id=${contact.id}`)),
			catchError(this.handleError<any>('updateContact'))
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