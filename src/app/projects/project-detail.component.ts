import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Project }        from '../classes/project';
import { Company }        from '../classes/company';
import { Contact }        from '../classes/contact';
import { ProjectsService } from './projects.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [ '../styles/detail.component.css' ]
})

export class ProjectDetailComponent implements OnInit{
	@Input() project: Project;
	companies: Company[] = [];
	accountables: string[] = [];
	observers: string[] = [];
	owners: string[] = [];
	participants: string[] = [];
	isLoading: number = 0;

	constructor(
		private projectsService: ProjectsService,
		private sharedService: SharedService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
	) {}

	ngOnInit(): void {
		this.sharedService.getCompanies();
		this.sharedService.getContacts();
		this.getProject();
	}

	getProject(): void{
		this.route.paramMap
			.switchMap((params: ParamMap) => this.projectsService.getProject(+params.get('id')))
			.subscribe(project => {
				this.project = project
				if(project.company.length > 0)
		        {
		          this.getCompanies(project);
		        }
		        else{
		        	this.isLoading += 1;
		        }
		        if(project.accountable.length > 0)
		        {
		        	this.getContacts(project, 0)
		        		.subscribe(contact => {
		        			this.accountables = contact.map(x=>x.full_name)
		        			this.isLoading += 1;
		        			console.log(this.accountables);
		        		});
		        }
		        else{
		        	this.isLoading += 1;
		        }
		        if(project.observer.length > 0)
		        {
		        	this.getContacts(project, 1)
		        		.subscribe(contact => {
		        			this.observers = contact.map(x=>x.full_name)
		        			this.isLoading += 1;
		        		});
		        }
		        else{
		        	this.isLoading += 1;
		        }
		        if(project.owner.length > 0)
		        {
		        	this.getContacts(project, 2)
		        		.subscribe(contact => {
		        			this.owners = contact.map(x=>x.full_name)
		        			this.isLoading += 1;
		        		});
		        }
		        else{
		        	this.isLoading += 1;
		        }
		        if(project.participant.length > 0)
		        {
		        	this.getContacts(project, 3)
		        		.subscribe(contact => {
		        			this.participants = contact.map(x=>x.full_name)
		        			this.isLoading += 1;
		        		});
		        }
		        else{
		        	this.isLoading += 1;
		        }
			});
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
		this.router.navigate(['/project/edit', this.project.id]);
	}

	openDeleteDialog(): void{
		let dialogRef = this.sharedService.openDeleteDialog();
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(dialogRef.componentInstance.delete)
			{
				this.delete(this.project);
			}
		});
	}

	delete(project: Project): void {
		if(project.company.length > 0)
			this.sharedService.deleteProjectFromCompany(project).subscribe();
		this.projectsService.delete(project).subscribe();
		this.location.back();
	}
}