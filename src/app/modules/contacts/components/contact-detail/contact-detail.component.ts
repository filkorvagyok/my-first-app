import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../../../../shared/classes/contact';
import { Company }        from '../../../../shared/classes/company';
import { Project }        from '../../../../shared/classes/project';

import { ContactsApiService } from '../../contacts-api.service';
import { ContactsDataHandler } from '../../contacts-datahandler.service';
import { SharedService } from '../../../../shared/services/shared.service';


@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})
export class ContactDetailComponent implements OnInit{
	companies: Company[] = [];
	isLoading: number = 0;
	accountables: string[] = [];
	observers: string[] = [];
	owners: string[] = [];
	participants: string[] = [];

	constructor(
	    private contactsApiService: ContactsApiService,
	    private contactsDataHandler: ContactsDataHandler,
	    private sharedService: SharedService,
	    private route: ActivatedRoute,
	    private location: Location,
	    private router: Router
	) {}

	ngOnInit(): void{
		this.route.paramMap.subscribe(params => this.contactsDataHandler.getContact(Number(params.get('id'))));
		this.sharedService.getCompanies();
		this.sharedService.getProjects();
	}

	getContact(): void{
		if(this.contactsDataHandler.contact.company.length > 0)
        {
			this.getCompanies(this.contactsDataHandler.contact)
        }
	    else{
	        	this.isLoading += 1;
		}
        if(this.contactsDataHandler.contact.accountable.length > 0)
        {
        	this.getProjects(this.contactsDataHandler.contact, 0)
        		.subscribe(project => {
        			this.accountables = project.map(x=>x.name)
        			this.isLoading += 1;
        			console.log(this.accountables);
        		});
        }
        else{
        	this.isLoading += 1;
        }
        if(this.contactsDataHandler.contact.observer.length > 0)
        {
        	this.getProjects(this.contactsDataHandler.contact, 1)
        		.subscribe(project => {
        			this.observers = project.map(x=>x.name)
        			this.isLoading += 1;
        		});
        }
        else{
        	this.isLoading += 1;
        }
        if(this.contactsDataHandler.contact.owner.length > 0)
        {
        	this.getProjects(this.contactsDataHandler.contact, 2)
        		.subscribe(project => {
        			this.owners = project.map(x=>x.name)
        			this.isLoading += 1;
        		});
        }
        else{
        	this.isLoading += 1;
        }
        if(this.contactsDataHandler.contact.participant.length > 0)
        {
        	this.getProjects(this.contactsDataHandler.contact, 3)
        		.subscribe(project => {
        			this.participants = project.map(x=>x.name)
        			this.isLoading += 1;
        		});
        }
        else{
        	this.isLoading += 1;
        }
		        
	}

	compare(accountables: string[], observers: string[], owner: string[], participant: string[]): string[]{
		let projects: string[] = [];
		let num = 0;
		for(let i=0; i < accountables.length; i++)
		{
			projects[i] = accountables[i] + "- Felelős";
			if(owner.includes(accountables[i]))
				projects[i] += ", Tulajdonos";
			if(observers.includes(accountables[i]))
				projects[i] += ", Megfigyelő";
			if(participant.includes(accountables[i]))
				projects[i] += ", Résztvevő";
			num ++;
		}
		for(let i=0; i < owner.length; i++)
		{
			num++;
			if(!accountables.includes(owner[i]))
			{
				projects[num] = owner[i] + "- Tulajdonos"
				if(observers.includes(owner[i]))
					projects[num] += ", Megfigyelő";
				if(participant.includes(owner[i]))
					projects[num] += ", Résztvevő";
			}

		}
		for(let i=0; i < observers.length; i++)
		{
			num++;
			if(!accountables.includes(observers[i]) && !owner.includes(observers[i]))
			{
				projects[num] = observers[i] + "- Megfigyelő";
				if(participant.includes(observers[i]))
					projects[num] += ", Résztvevő";
			}
		}
		for(let i=0; i < participant.length; i++)
		{
			num++;
			if(!accountables.includes(participant[i]) && !owner.includes(participant[i]) && !observers.includes(participant[i]))
			{
				projects[num] = observers[i] + "- Megfigyelő";
			}
		}
		return projects;
	}

	getCompanies(contact: Contact): void{
		this.sharedService
			.getCompaniesForContactDetail(this.contactsDataHandler.contact)
			.subscribe(companies => {this.companies = companies; this.isLoading += 1;});
	}

	getProjects(contact: Contact, which: number): Observable<Project[]>{
		return this.sharedService
			.getProjectsForContactDetail(contact, which);
	}

	goBack(): void {
		this.location.back();
	}

	gotoEdit(): void{
		this.router.navigate(['/people/edit', this.contactsDataHandler.contact.id]);
	}

	openDeleteDialog(): void{
		let dialogRef = this.sharedService.openDeleteDialog();
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(dialogRef.componentInstance.delete)
			{
				this.delete(this.contactsDataHandler.contact);
			}
		});
	}

	delete(contact: Contact): void {
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
	}
}