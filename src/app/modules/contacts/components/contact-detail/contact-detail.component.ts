import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Contact } from '../../../../contacts/contact';
import { ContactsApiService } from '../../contacts-api.service';
import { ContactsDataHandler } from '../../contacts-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BaseDetailComponent } from '../../../../shared/services/base/base-detail.component';

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})
export class ContactDetailComponent extends BaseDetailComponent implements OnInit{

	constructor(
	    private contactsApiService: ContactsApiService,
	    private contactsDataHandler: ContactsDataHandler,
	    private sharedGetDataHandler: SharedGetDataHandler,
	    private sharedDeleteDataHandler: SharedDeleteDataHandler,
	    private route: ActivatedRoute,
	    protected location: Location,
	    private router: Router,
	    protected dialog: MatDialog
	  ) {
	    super(location, dialog)
	  }

	ngOnInit(): void{
		this.contactsDataHandler.isLoadingData = true;
		this.sharedGetDataHandler.projectsForContact = [];
	    this.sharedGetDataHandler.getCompanies();
	    this.sharedGetDataHandler.getProjects();
		this.route.paramMap.subscribe(params => this.contactsDataHandler.getContact(Number(params.get('id')), true));
	}

	gotoEdit(): void{
		this.router.navigate(['/people/edit', this.contactsDataHandler.contact.id]);
	}

	/*Ha van(nak) hozzátartozó cég(ek) vagy projekt(ek), akkor először
	  onnan kitöröljük a névjegyet a SharedDeleteDataHandler segítségével, majd
	  a contactsApiService.delete metódusát hajtjuk végre*/
	delete(contact: Contact): void{
		this.sharedDeleteDataHandler.deleteContactFromCompany(contact);
		this.sharedDeleteDataHandler.deleteContactFromProject(contact);
		this.contactsApiService.delete(contact).subscribe();
		this.router.navigate(['people/list']);
	}

	/*Átadjuk a névjegyet az új projekt létrehozásához.*/
    createNewProject(rank: number): void{
      let contactsArray: number[] = [];
      contactsArray.push(this.contactsDataHandler.contact.id);
      this.gotoNewProject(contactsArray, rank);
    }

    gotoNewProject(array: number[], rank: number): void{
      this.router.navigate(['/project/new/', {array:array, num:2, rank:rank}]);
    }

    //Lásd.: createNewProject, csak itt projekt helyett cégre alkalmazzuk
    createNewCompany(): void {
      let contactsArray: number[] = [];
      contactsArray.push(this.contactsDataHandler.contact.id);
      this.gotoNewCompany(contactsArray);
    }

    gotoNewCompany(array: number[]): void{
      this.router.navigate(['/company/new/', {array:array, num:2}]);
    }
}