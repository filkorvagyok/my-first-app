import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../../../shared/classes/company';
import { Project } from '../../../../shared/classes/project';
import { CompaniesApiService } from '../../companies-api.service';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
	selector: 'my-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})

export class CompaniesComponent implements OnInit{
	constructor(
		private companiesApiService: CompaniesApiService,
		private companiesDataHandler: CompaniesDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		private dialog: MatDialog
	){}

	checked: boolean = false;
	disabled: boolean = true;

	ngOnInit(): void{
		this.companiesDataHandler.isLoading = true;
		this.sharedGetDataHandler.getProjects();
    	this.sharedGetDataHandler.getContacts();
		this.companiesDataHandler.getCompanies();
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


	clickOnDeleteProductButton(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
			if(result===true)
			{
				let array=this.companiesDataHandler.companies;
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

	delete(company: Company): void {
		this.companiesDataHandler.companies = this.companiesDataHandler.companies.filter(h => h !== company);
		this.sharedDeleteDataHandler.deleteCompanyFromProject(company);
		this.sharedDeleteDataHandler.deleteCompanyFromContact(company);
    	this.companiesApiService.delete(company).subscribe();
	}

  	gotoDetail(company: Company): void{
  		this.router.navigate(['/company/shown', company.id]);
  	}

  	gotoEdit(): void{
  		let selectedCompany = this.companiesDataHandler.companies.filter(company => company.selected === true)[0];
  		this.router.navigate(['/company/edit', selectedCompany.id]);
  	}

  	gotoNew(): void{
  		this.router.navigate(["/company/new"]);
  	}

  	createNewProject(): void{
  		let companiesArray: number[] = [];
  		this.companiesDataHandler.companies.forEach( company =>{
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
  		this.companiesDataHandler.companies.forEach( company =>{
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
		let company = new Company();
		company = this.companiesDataHandler.setDefaultCompany(company);
  		company.name = name.trim();
    	if (!name) { return; }
    	this.companiesDataHandler.addCompany(company);
  	}

}

