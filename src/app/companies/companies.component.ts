import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../classes/company';
import { Project } from '../classes/project';
import { CompaniesService } from './companies.service';
import { SharedService } from '../shared.service';


@Component({
	selector: 'my-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['../styles/display.component.css']
})

export class CompaniesComponent implements OnInit{
	constructor(
		private companiesService: CompaniesService,
		private sharedService: SharedService,
		private router: Router
	){}

	checked: boolean = false;
	companies: Company[];
	disabled: boolean = true;
	isLoading: boolean = true;

	getCompanies(): void{
		this.companiesService
        .getCompanies()
        .subscribe(companies => {this.companies = companies, this.isLoading=false});
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
		let dialogRef = this.sharedService.openDeleteDialog();
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
				this.checked = false;
			}
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
		this.sharedService.deleteCompanyFromProject(company).subscribe();
    	this.companiesService.delete(company).subscribe();
	}

	ngOnInit(): void{
		this.getCompanies();
		this.sharedService.getProjects();
	}

  	gotoDetail(company: Company): void{
  		this.router.navigate(['/company/shown', company.id]);
  	}

  	gotoEdit(): void{
  		let selectedCompany = this.companies.filter(company => company.selected === true)[0];
  		this.router.navigate(['/company/edit', selectedCompany.id]);
  	}

  	gotoNew(): void{
  		this.router.navigate(["/company/new"]);
  	}

  	createNewProject(): void{
  		let companiesArray: number[] = [];
  		this.companies.forEach( company =>{
  			if(company.selected)
  			{
  				companiesArray.push(company.id);
  			}
  		});
  		this.gotoNewProject(companiesArray);
  	}

  	gotoNewProject(array: number[]): void{
  		this.router.navigate(['/project/new/', array]);
  	}

  	createNewContact(): void {
  		let companiesArray: number[] = [];
  		this.companies.forEach( company =>{
  			if(company.selected)
  			{
  				companiesArray.push(company.id);
  			}
  		});
  		this.gotoNewContact(companiesArray);
  	}

  	gotoNewContact(array: number[]): void{
  		this.router.navigate(['/people/new/', array]);
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

