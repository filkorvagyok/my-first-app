import { ContactService } from './../contact.service';
import { Contact } from './../../shared/classes/contact';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SharedDeleteDataHandler } from '../../shared/services/shared-deletedatahandler.service';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service';
import { Location } from '@angular/common';
import { BaseDetailComponent } from '../../shared/services/base/base-detail.component';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent extends BaseDetailComponent implements OnInit, AfterViewInit,
AfterViewChecked {
  contact: Contact;

  constructor(
    private sharedGetDataHandler: SharedGetDataHandler,
    private sharedDeleteDataHandler: SharedDeleteDataHandler,
    private route: ActivatedRoute,
    protected location: Location,
    private router: Router,
    protected dialog: MatDialog,
    private contactService: ContactService,
    private changeDetector: ChangeDetectorRef
  ) {
    super(location, dialog)
  }

  ngOnInit(): void {
    this.sharedGetDataHandler.getCompanies();
    this.sharedGetDataHandler.getProjects();
    if(this.contactService.getItems() && !this.contact){
			this.contact = this.contactService.getItem(+this.route.snapshot.params['id'])
		}
  }

  ngAfterViewInit(){
		this.changeDetector.detectChanges();
	}

	ngAfterViewChecked(){
		if(!this.contact){
			this.contact = this.contactService.getItem(+this.route.snapshot.params['id'])
		}
  }
  
  navigateToEdit(): void{
    this.router.navigate(['/people/edit', this.contact.id]);
  }

  /*Ha van(nak) hozzátartozó projekt(ek) vagy névjegy(ek), akkor először
  onnan kitöröljük a céget a SharedDeleteDataHandler segítségével, majd
  a companiesApiService.delete metódusát hajtjuk végre*/
  delete(contact: Contact): void {
    this.sharedDeleteDataHandler.deleteContactFromCompany(contact);
		this.sharedDeleteDataHandler.deleteContactFromProject(contact);
      this.contactService.delete(contact);
      this.router.navigate(['people/list']);
  }

  /*Átadjuk a céget az új projekt létrehozásához, így
  automatikusan belekerül a projekt company mezőjébe.*/
  createNewProject(rank: number): void{
    let contactsArray: number[] = [];
    contactsArray.push(this.contact.id);
    this.navigateToNewProject(contactsArray, rank);
  }

  navigateToNewProject(array: number[], rank: number): void{
    this.router.navigate(['/project/new/', {array:array, num:2, rank:rank}]);
  }

  //Lásd.: createNewProject, csak itt projekt helyett névjegyre alkalmazzuk
  createNewCompany(): void {
    let contactsArray: number[] = [];
    contactsArray.push(this.contact.id);
    this.navigateToNewCompany(contactsArray);
  }

  navigateToNewCompany(array: number[]): void{
    this.router.navigate(['/company/new/', {array:array, num:2}]);
  }

}
