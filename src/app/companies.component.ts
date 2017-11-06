import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from './company';
import { CompaniesService } from './companies.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
	selector: 'my-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit{
	constructor(private companiesService: CompaniesService,
		private router: Router, public dialog: MatDialog){}

	checked: boolean = false;
	companies: Company[] = [];
	selectedCompany: Company;
	selectedCompanies: Company[] = [];


	disabled = false;


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
	      		this.delete();
	      	}
	    });
	    
	}

	/*delete(): void {
		var array: Company[] = this.selectedCompanies;
		for (var i = 0; i < array.length; i++) {
			this.companiesService
				.delete(array[i].id)
				.then(() => {
					this.companies = this.companies.filter(h => h !== array[i]);
				});
		}
	}*/

	delete(): void {
		this.companiesService
			.delete(this.selectedCompany.id)
			.then(() => {
				this.companies = this.companies.filter(h => h !== this.selectedCompany);
			});
	}

	ngOnInit(): void{
		this.getCompanies();
	}

	onSelect(company: Company): void {
    	//this.selectedCompanies.push(company);
    	this.selectedCompany = company;
  	}

  	gotoDetail(company: Company): void{
  		this.selectedCompany = company;
  		this.router.navigate(['/company/shown', this.selectedCompany.id]);
  	}

  	gotoEdit(): void{
  		this.router.navigate(['/company/edit', this.selectedCompany.id]);
  	}

}


@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog{

  constructor(private companiesService: CompaniesService,
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public delete: boolean = false;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
  	this.delete = true;
    this.dialogRef.close();
  }

}