import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Project }        from '../../../../shared/classes/project';
import { Company }        from '../../../../shared/classes/company';
import { Contact }        from '../../../../shared/classes/contact';
import { ProjectsApiService } from '../../projects-api.service';
import { ProjectsDataHandler } from '../../projects-datahandler.service';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})

export class ProjectDetailComponent implements OnInit{
	companies: Company[] = [];
	accountables: string[] = [];
	observers: string[] = [];
	owners: string[] = [];
	participants: string[] = [];
	isLoading: number = 0;

	constructor(
		private projectsApiService: ProjectsApiService,
		private projectsDataHandler: ProjectsDataHandler,
		private sharedService: SharedService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => this.projectsDataHandler.getProject(Number(params.get('id'))));
		this.sharedService.getCompanies();
		this.sharedService.getContacts();
	}

	getProject(): void{
		if(this.projectsDataHandler.project.company.length > 0)
        {
          this.getCompanies(this.projectsDataHandler.project);
        }
        else{
        	this.isLoading += 1;
        }
        if(this.projectsDataHandler.project.accountable.length > 0)
        {
        	this.getContacts(this.projectsDataHandler.project, 0)
        		.subscribe(contact => {
        			this.accountables = contact.map(x=>x.full_name)
        			this.isLoading += 1;
        			console.log(this.accountables);
        		});
        }
        else{
        	this.isLoading += 1;
        }
        if(this.projectsDataHandler.project.observer.length > 0)
        {
        	this.getContacts(this.projectsDataHandler.project, 1)
        		.subscribe(contact => {
        			this.observers = contact.map(x=>x.full_name)
        			this.isLoading += 1;
        		});
        }
        else{
        	this.isLoading += 1;
        }
        if(this.projectsDataHandler.project.owner.length > 0)
        {
        	this.getContacts(this.projectsDataHandler.project, 2)
        		.subscribe(contact => {
        			this.owners = contact.map(x=>x.full_name)
        			this.isLoading += 1;
        		});
        }
        else{
        	this.isLoading += 1;
        }
        if(this.projectsDataHandler.project.participant.length > 0)
        {
        	this.getContacts(this.projectsDataHandler.project, 3)
        		.subscribe(contact => {
        			this.participants = contact.map(x=>x.full_name)
        			this.isLoading += 1;
        		});
        }
        else{
        	this.isLoading += 1;
        }
	}

	getCompanies(project: Project): void{
		this.sharedService
			.getCompaniesForProjectDetail(project)
			.subscribe(companies => {this.companies = companies, this.isLoading += 1});
	}

	getContacts(project: Project, which: number): Observable<Contact[]>{
		return this.sharedService
			.getContactsForProjectDetail(project, which);
	}

	goBack(): void {
		this.location.back();
	}

	gotoEdit(): void{
		this.router.navigate(['/project/edit', this.projectsDataHandler.project.id]);
	}

	openDeleteDialog(): void{
		let dialogRef = this.sharedService.openDeleteDialog();
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(dialogRef.componentInstance.delete)
			{
				this.delete(this.projectsDataHandler.project);
			}
		});
	}

	delete(project: Project): void {
		if(project.company.length > 0)
			this.sharedService.deleteProjectFromCompany(project).subscribe();
		if(project.accountable.length > 0)
			this.sharedService.deleteProjectFromContact(project, 0).subscribe();
		if(project.owner.length > 0)
			this.sharedService.deleteProjectFromContact(project, 1).subscribe();
		if(project.observer.length > 0)
			this.sharedService.deleteProjectFromContact(project, 2).subscribe();
		if(project.participant.length > 0)
			this.sharedService.deleteProjectFromContact(project, 3).subscribe();
		this.projectsApiService.delete(project).subscribe();
		this.location.back();
	}
}