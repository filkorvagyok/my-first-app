import { Contact } from './../../shared/classes/contact';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SharedDeleteDataHandler } from './../../shared/services/shared-deletedatahandler.service';
import { SharedGetDataHandler } from './../../shared/services/shared-getdatahandler.service';
import { ContactService } from './../contact.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../shared/services/base/base.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent extends BaseComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private contactService: ContactService,
    private sharedGetDataHandler: SharedGetDataHandler,
    private sharedDeleteDataHandler: SharedDeleteDataHandler,
    private router: Router,
		protected dialog: MatDialog
  ) {
    super(dialog);
    this.subscription = this.contactService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
		);
  }

  ngOnInit() {
  }

  delete(contact: Contact | number): void {
		const id = typeof contact === 'number' ? contact : contact.id;
		this.contactService.delete(id);
  }
  
  navigateToEdit(): void{
    this.router.navigate(['/people/edit', this.checkedArray[0]]);
  }

  navigateToNewItem(): void{
    this.router.navigate(["/people/new"]);
  }

  navigateToNewCompany(): void{
    this.router.navigate(['/company/new/', {array: this.checkedArray, num: 2}]);
  }

  navigateToNewProject(rank: number): void{
    this.router.navigate(['/project/new/', {array: this.checkedArray, num: 2, rank: rank}]);
  }

  addInstant(full_name: string, phone: string, email: string): void{
    let contact = new Contact();
    contact.full_name = full_name.trim();
    contact.phone = phone.trim();
    contact.email = email.trim();
    if (!full_name) { return; }
    contact.id = this.contactService.getItems()[this.contactService.getItems().length - 1].id + 1;
    this.contactService.add(contact);
  }

  ngOnDestroy(){
		this.subscription.unsubscribe();
	}

}
