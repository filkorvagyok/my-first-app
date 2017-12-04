import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Contact } from '../classes/contact';
import { Company }        from '../classes/company';
import { ContactsService } from './contacts.service';
import { SharedService } from '../shared.service';


@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: [ '../styles/detail.component.css' ]
})
export class ContactDetailComponent implements OnInit{
	@Input() contact: Contact;
	companies: Company[] = [];
	isLoading: boolean = true;

	constructor(
	    private contactsService: ContactsService,
	    private sharedService: SharedService,
	    private route: ActivatedRoute,
	    private location: Location,
	    private router: Router
	) {}

	ngOnInit(): void{
		this.sharedService.getCompanies();
		this.getContact();
	}

	getContact(): void{
		this.route.paramMap
		.switchMap((params: ParamMap) => this.contactsService.getContact(+params.get('id')))
		.subscribe(contact => {
			this.contact = contact;
			if(contact.company.length > 0)
		        {
		          this.getCompanies(contact)
		        }
		    else
		    	this.isLoading = false;
		});
	}

	getCompanies(contact: Contact): void{
		this.sharedService
			.getCompaniesForContactDetail(this.contact)
			.subscribe(companies => {this.companies = companies; this.isLoading = false;});
	}

	goBack(): void {
		this.location.back();
	}

	gotoEdit(): void{
		this.router.navigate(['/people/edit', this.contact.id]);
	}

	openDeleteDialog(): void{
		let dialogRef = this.sharedService.openDeleteDialog();
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(dialogRef.componentInstance.delete)
			{
				this.delete(this.contact);
			}
		});
	}

	delete(contact: Contact): void {
		this.contactsService.delete(contact).subscribe();
		this.location.back();
	}
}