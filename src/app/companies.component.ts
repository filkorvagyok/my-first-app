import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from './company';
import { CompaniesService } from './companies.service';
import { MatDialog } from '@angular/material';
import { DeleteDialog } from './delete-dialog';



@Component({
	selector: 'my-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit{
	constructor(
		private companiesService: CompaniesService,
		private router: Router,
		public dialog: MatDialog
	){}

	checked: boolean = false;
	companies: Company[];
	selectedCompany: Company;
	disabled: boolean = true;

	getCompanies(): void{
		this.companiesService
        .getCompanies()
        .subscribe(companies => this.companies = companies);
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
    	this.companiesService.delete(company).subscribe();
	}

	ngOnInit(): void{
		this.getCompanies();
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

}

