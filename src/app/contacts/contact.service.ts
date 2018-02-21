import { Subject } from 'rxjs/Subject';
import { Contact } from './../shared/classes/contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ContactService{
    contacts: Contact[];
    isLoading: boolean = true;
    checkedArray = new Subject<number[]>();
    private contactsUrl = 'api/contacts';

    constructor(private http: HttpClient){
        this.http.get<Contact[]>(this.contactsUrl)
          .pipe(
            tap(contacts => (`fetched contacts`)),
            catchError(this.handleError('getConctast', []))
          )
          .subscribe((contacts: Contact[]) => {
            this.contacts = contacts;
            this.isLoading = false;
          });
    }

    getItems(): Contact[] {
		return this.contacts;
    }

    getItem(contact: Contact | number): Contact{
        const id = typeof contact === 'number' ? contact : contact.id;
        if(this.contacts){
            return this.contacts.find((contact: Contact) => contact.id === id);
        }
        else{
            const url = `${this.contactsUrl}/${id}`;
            this.http.get<Contact>(url).pipe(
                tap(_ => (`fetched contact id=${id}`)),
                catchError(this.handleError<Contact>(`getContact id=${id}`))
            )
            .subscribe((contact: Contact) => {
                this.isLoading = false;
                return contact;
            });
        }
    }
    
    delete(contact: Contact | number): void{
        const id = typeof contact === 'number' ? contact : contact.id;
        this.contacts.splice(this.contacts.indexOf(
            this.contacts.find(deletedContact => deletedContact.id === id)), 1
        );
    }

    add(contact: Contact): void{
        this.contacts.push(contact);
    }

    update (contact: Contact): void{
        this.contacts.find(oldContact => oldContact.id === contact.id)[0] = contact;
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