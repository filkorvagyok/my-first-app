import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../../../../shared/classes/contact';
import { Company }        from '../../../../shared/classes/company';
import { Project }        from '../../../../shared/classes/project';

import { ContactsService } from '../../contacts.service';
import { SharedService } from '../../../../shared/services/shared.service';


@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})
export class ContactDetailComponent implements OnInit{
	@Input() contact: Contact;
	companies: Company[] = [];
	isLoading: number = 0;
	accountables: string[] = [];
	observers: string[] = [];
	owners: string[] = [];
	participants: string[] = [];

	constructor(
	    private contactsService: ContactsService,
	    private sharedService: SharedService,
	    private route: ActivatedRoute,
	    private location: Location,
	    private router: Router
	) {}

	ngOnInit(): void{
		this.sharedService.getCompanies();
		this.sharedService.getProjects();
		this.getContact();
	}

	getContact(): void{
		this.route.paramMap
		.switchMap((params: ParamMap) => this.contactsService.getContact(+params.get('id')))
		.subscribe(contact => {
			this.contact = contact;
			console.log(contact);
			if(contact.company.length > 0)
		        {
		          this.getCompanies(contact)
		        }
		    else{
		        	this.isLoading += 1;
		        }
		        if(contact.accountable.length > 0)
		        {
		        	this.getProjects(contact, 0)
		        		.subscribe(project => {
		        			this.accountables = project.map(x=>x.name)
		        			this.isLoading += 1;
		        		});
		        }
		        else{
		        	this.isLoading += 1;
		        }
		        if(contact.observer.length > 0)
		        {
		        	this.getProjects(contact, 1)
		        		.subscribe(project => {
		        			this.observers = project.map(x=>x.name)
		        			this.isLoading += 1;
		        		});
		        }
		        else{
		        	this.isLoading += 1;
		        }
		        if(contact.owner.length > 0)
		        {
		        	this.getProjects(contact, 2)
		        		.subscribe(project => {
		        			this.owners = project.map(x=>x.name)
		        			this.isLoading += 1;
		        		});
		        }
		        else{
		        	this.isLoading += 1;
		        }
		        if(contact.participant.length > 0)
		        {
		        	this.getProjects(contact, 3)
		        		.subscribe(project => {
		        			this.participants = project.map(x=>x.name)
		        			this.isLoading += 1;
		        		});
		        }
		        else{
		        	this.isLoading += 1;
		        }
		        
		});
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
			.getCompaniesForContactDetail(this.contact)
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
		this.contactsService.delete(contact).subscribe();
		this.location.back();
	}
}