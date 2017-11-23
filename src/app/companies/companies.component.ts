import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../company';
import { Project } from '../project';
import { CompaniesService } from './companies.service';
import { ProjectsService } from '../projects/projects.service';
import { MatDialog } from '@angular/material';
import { DeleteDialog } from '../delete-dialog';


@Component({
	selector: 'my-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit{
	constructor(
		private projectsService: ProjectsService,
		private companiesService: CompaniesService,
		private router: Router,
		public dialog: MatDialog
	){}

	checked: boolean = false;
	companies: Company[];
	projects: Project[];
	selectedCompany: Company;
	disabled: boolean = true;
	isLoading: boolean = true;

	getCompanies(): void{
		this.companiesService
        .getCompanies()
        .subscribe(companies => {this.companies = companies, this.isLoading=false});
	}

	getProjects(): void{
		this.projectsService
        .getProjects()
        .subscribe(projects => this.projects = projects);
	}

	showChbox(): void{
		var show = 0;
		this.disabled = false;
		$('input[type=checkbox]').each(function() {
			if ($(this).is(':checked')) {
				++show;
			}
		});
		if ( show > 0 ) {
			this.checked = true;
			if (show > 1) {
				this.disabled = true;
			}
		} else {
			this.checked = false;
		}
	}

	openDeleteDialog(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
	    dialogRef.afterClosed().subscribe(result => {
	    	console.log('The dialog was closed');
	      	if(dialogRef.componentInstance.delete)
	      	{
	      		let array=this.companies;
	      		for (var i = 0; i < array.length; i++) {
	      			if(array[i].selected)
	      			{
	      				 this.delete(array[i]);
	      			}
	      		}
	      	}
	      	this.checked = false;
	    });
	    
	}

	/*delete(): Company[] {
		for (var i = 0;  i < this.companies.length; i++) {
			if(this.companies[i].selected)
			{
				//this.companies.splice(i, 1);
				//console.log(this.companies[i]);
				this.companies = this.companies.filter(h => h !== this.companies[i]);
			}
		}
		return this.companies
	}*/

	delete(company: Company): void {
		this.companies = this.companies.filter(h => h !== company);
		let project = this.projects.find(x => x.company.includes(company.id));
		console.log(project.company, company.id);
    	if(project)
    	{
    		project.company.slice(company.id, 1);
    	}
    	this.companiesService.delete(company).subscribe();
	}

	ngOnInit(): void{
		this.getCompanies();
		this.getProjects();
	}

  	gotoDetail(company: Company): void{
  		this.router.navigate(['/company/shown', company.id]);
  	}

  	gotoEdit(): void{
  		this.selectedCompany = this.companies.filter(companie => companie.selected === true)[0];
  		this.router.navigate(['/company/edit', this.selectedCompany.id]);
  	}

  	gotoNew(): void{
  		this.router.navigate(["/company/new"]);
  	}

  	createNewProject(): void{
  		let projectArray: number[] = [];
  		let array=this.companies;
  		for (var i = 0; i < array.length; i++) {
  			if(array[i].selected)
  			{
  				 projectArray.push(array[i].id);
  			}
  		}
  		this.gotoNewProject(projectArray);
  	}

  	gotoNewProject(array: number[]): void{
  		this.router.navigate(['/project/new/', array]);
  	}

  	addInstant(name: string): void{
  		name = name.trim();
    	if (!name) { return; }
    	this.companiesService.addCompany({ name } as Company)
      		.subscribe(company => {
        this.companies.push(company);
      });
  	}

}

