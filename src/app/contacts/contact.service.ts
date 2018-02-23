import { Task } from '../tasks/task';
import { Project } from '../projects/project';
import { Company } from '../companies/company';
import { Subject } from 'rxjs/Subject';
import { Contact } from './contact';
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
        contact.id = this.contacts[this.contacts.length - 1].id + 1;
        this.contacts.push(contact);
    }

    update (contact: Contact): void{
        this.contacts.find(oldContact => oldContact.id === contact.id)[0] = contact;
    }

    getCertainItems(item: Company | Project | Task, rank?: number): Contact[]{
        let contacts: Contact[] = [];
        if(item instanceof Project){
            switch (rank){
                case 0:{
                    if(item.accountable.length > 0){
                        item.accountable.forEach(contactID => {
                            contacts.push(this.contacts.find(contact => contact.id === contactID));
                        });
                        return contacts;
                    }
                }
                case 1:{
                    if(item.observer.length > 0){
                        item.observer.forEach(contactID => {
                            contacts.push(this.contacts.find(contact => contact.id === contactID));
                        });
                        return contacts;
                    }
                }
                case 2:{
                    if(item.owner.length > 0){
                        item.owner.forEach(contactID => {
                            contacts.push(this.contacts.find(contact => contact.id === contactID));
                        });
                        return contacts;
                    }
                }
                case 3:{
                    if(item.participant.length > 0){
                        item.participant.forEach(contactID => {
                            contacts.push(this.contacts.find(contact => contact.id === contactID));
                        });
                        return contacts;
                    }
                }
                default:
                    break;
            }

        }
        else if(item.contact.length > 0){
            item.contact.forEach(contactID => {
                contacts.push(this.contacts.find(contact => contact.id === contactID));
            });
        }
        return contacts;
    }

    modifyItemInContact(item: Company | Project | Task): void{
        if(item instanceof Company){
            let contactToBeModified = this.contacts
                .filter(x => x.company.includes(item.id))
                .filter(contact => !item.contact.includes(contact.id));
            contactToBeModified.forEach(contact => {
                contact.company.splice(contact.company.indexOf(item.id), 1);
            });
            if(item.contact.length > 0){
                item.contact.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.company.includes(item.id)){
                        actualContact.company.push(item.id);
                        this.update(actualContact);
                    }
                });
            }
        } else if(item instanceof Project) {
            let contactToBeModified = this.contacts
                .filter(x => x.project.includes(item.id))
                .filter(contact => (!item.accountable.includes(contact.id) &&
                !item.observer.includes(contact.id) && !item.owner.includes(contact.id) &&
                item.participant.includes(contact.id)));
            contactToBeModified.forEach(contact => {
                contact.project.splice(contact.project.indexOf(item.id), 1);
            });
            if(item.accountable.length > 0){
                item.accountable.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.project.includes(item.id)){
                        actualContact.project.push(item.id);
                        this.update(actualContact);
                    }
                });
            } else if(item.observer.length > 0){
                item.observer.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.project.includes(item.id)){
                        actualContact.project.push(item.id);
                        this.update(actualContact);
                    }
                });
            } else if(item.owner.length > 0){
                item.owner.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.project.includes(item.id)){
                        actualContact.project.push(item.id);
                        this.update(actualContact);
                    }
                });
            } else if(item.participant.length > 0){
                item.participant.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.project.includes(item.id)){
                        actualContact.project.push(item.id);
                        this.update(actualContact);
                    }
                });
            }
        } else if(item instanceof Task) {
            let contactToBeModified = this.contacts
                .filter(x => x.task.includes(item.id))
                .filter(contact => !item.contact.includes(contact.id));
            contactToBeModified.forEach(contact => {
                contact.task.splice(contact.task.indexOf(item.id), 1);
            });
            if(item.contact.length > 0){
                item.contact.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.task.includes(item.id)){
                        actualContact.task.push(item.id);
                        this.update(actualContact);
                    }
                })
            }
        }
    }

    deleteItemFormContact(item: Company | Project | Task): void{
        if(item instanceof Company){
            this.contacts.filter(contacts => contacts.company.includes(item.id))
            .forEach(contact => {
                contact.company.splice(contact.company.indexOf(item.id), 1);
                this.update(contact);
            });
        } else if(item instanceof Project) {
            this.contacts.filter(contacts => contacts.project.includes(item.id))
            .forEach(contact => {
                contact.project.splice(contact.project.indexOf(item.id), 1);
                this.update(contact);
            });
        } else if(item instanceof Task) {
            this.contacts.filter(contacts => contacts.task.includes(item.id))
            .forEach(contact => {
                contact.task.splice(contact.task.indexOf(item.id), 1);
                this.update(contact);
            });
        }
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