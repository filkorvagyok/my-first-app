import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Contact } from '../../../../shared/classes/contact';
import { ContactsApiService } from '../../contacts-api.service';
import { ContactsDataHandler } from '../../contacts-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';

import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})
export class ContactDetailComponent implements OnInit{

	constructor(
	    private contactsApiService: ContactsApiService,
	    private contactsDataHandler: ContactsDataHandler,
	    private sharedGetDataHandler: SharedGetDataHandler,
	    private sharedDeleteDataHandler: SharedDeleteDataHandler,
	    private route: ActivatedRoute,
	    private location: Location,
	    private router: Router,
	    private dialog: MatDialog
	) {}

	ngOnInit(): void{
		this.contactsDataHandler.isLoadingData = true;
		this.sharedGetDataHandler.projectsForContact = [];
	    this.sharedGetDataHandler.getCompanies();
	    this.sharedGetDataHandler.getProjects();
		this.route.paramMap.subscribe(params => this.contactsDataHandler.getContact(Number(params.get('id')), true));
	}

	goBack(): void {
		this.location.back();
	}

	gotoEdit(): void{
		this.router.navigate(['/people/edit', this.contactsDataHandler.contact.id]);
	}

	clickOnDeleteProductButton(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(result === true)
			{
				this.delete(this.contactsDataHandler.contact);
			}
		});
	}

	delete(contact: Contact): void{
		this.sharedDeleteDataHandler.deleteContactFromCompany(contact);
		this.sharedDeleteDataHandler.deleteContactFromProject(contact);
		this.contactsApiService.delete(contact).subscribe();
		this.router.navigate(['people/list']);
	}

	//FONTOS: ÁT LETT ALAKÍTVA A CONTACT CLASS, EMIATT VÁLOZOTT A TÖRLÉS FUKCIÓ IS (lásd fentebb)
	/*delete(contact: Contact): void {
		if(contact.company.length > 0)
			this.sharedService.deleteContactFromCompany(contact).subscribe();
		if(contact.accountable.length > 0)
			this.sharedService.deleteContactFromProject(contact, 0).subscribe();
		if(contact.owner.length > 0)
			this.sharedService.deleteContactFromProject(contact, 1).subscribe();
		if(contact.observer.length > 0)
			this.sharedService.deleteContactFromProject(contact, 2).subscribe();
		if(contact.participant.length > 0)
			this.sharedService.deleteContactFromProject(contact, 3).subscribe();
		this.contactsApiService.delete(contact).subscribe();
		this.location.back();
	}*/
}